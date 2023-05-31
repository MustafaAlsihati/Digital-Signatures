import * as DocuSign from 'docusign-esign';
import * as fs from 'fs';
import { getDocument } from './template';
import { getId } from './utils';
import { Args, EnvelopeArgs } from './types';

export default async function onSendDocuSignEmail() {
  // * Get Access Token and User Info:
  const { access_token, require_signer_authentication, consent_url } =
    await getAuthCode();
  // * Return Consent URL only if User Token is not valid:
  if (require_signer_authentication) {
    return { consent_url };
  }
  // * Get User Info:
  const userInfo = await getUserInfo(access_token);
  // * Send Envelope:
  const result = await sendEnvelope(userInfo, access_token);
  // = Return Result:
  return result;
}

const config = {
  clientId: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  userId: process.env.USER_ID as string,
  apiAccountId: process.env.API_ACCOUNT_ID as string,
  accountBaseUri: process.env.ACCOUNT_BASE_URI as string,
  oAuthBasePath: process.env.OAUTH_BASE_PATH as string,
  publicKeyPath: process.env.PUBLIC_KEY_PATH as string,
  privateKeyPath: process.env.PRIVATE_KEY_PATH as string,
  redirectUri: process.env.REDIRECT_URL as string,
  scopes: ['signature', 'impersonation'],
  expiresIn: 10 * 60,
};

const getConsent = () => {
  const urlScopes = [...config.scopes].join('+');
  const consentUrl =
    `${config.oAuthBasePath}/oauth/auth?response_type=code&` +
    `scope=${urlScopes}&client_id=${config.clientId}&` +
    `redirect_uri=${config.redirectUri}`;
  return consentUrl;
};

const getAuthCode = async () => {
  try {
    // * Init Client instance:
    const dsApi = new DocuSign.ApiClient();
    dsApi.setOAuthBasePath(config.oAuthBasePath.replace('https://', ''));
    // * Read Private RSA key file:
    const privateRsa = fs.readFileSync(`${__dirname}/${config.privateKeyPath}`);
    // * Get User Token:
    const result = await dsApi.requestJWTUserToken(
      config.clientId,
      config.userId,
      config.scopes,
      privateRsa,
      config.expiresIn,
    );
    // = Result:
    return JSON.parse(result?.text ?? '{}');
  } catch {
    // * Return Consent URL if User Token is not valid:
    return {
      require_signer_authentication: true,
      consent_url: getConsent(),
    };
  }
};

const getUserInfo = async (accessToken: string) => {
  // * Init Client instance:
  const dsApi = new DocuSign.ApiClient();
  dsApi.setOAuthBasePath(config.oAuthBasePath.replace('https://', ''));
  // * Get User Info:
  const userInfo: DocuSign.UserInfo = await dsApi.getUserInfo(accessToken);
  // = Result:
  return userInfo;
};

const sendEnvelope = async (
  accountInfo: DocuSign.UserInfo,
  accessToken: string,
) => {
  const userInfo =
    'accounts' in accountInfo
      ? (accountInfo.accounts as any[]).find(
          account => account.isDefault === 'true',
        )
      : undefined;
  const args: Args = {
    accessToken: accessToken,
    basePath: `${userInfo?.baseUri}/restapi`,
    accountId: userInfo?.accountId,
    envelopeArgs: {
      status: 'sent',
      signerEmail: accountInfo.email ?? userInfo?.email ?? '',
      signerName:
        'name' in accountInfo
          ? (accountInfo.name as string)
          : accountInfo.userName ?? userInfo?.name ?? userInfo?.userName ?? '',
      emailSubject: 'Please Sign This Document', // todo: change this...
    },
  };
  // * Init Client instance:
  const dsApi = new DocuSign.ApiClient();
  dsApi.setBasePath(args.basePath);
  dsApi.addDefaultHeader('Authorization', 'Bearer ' + args.accessToken);
  // * Envelope Init:
  const envelopesApi = new DocuSign.EnvelopesApi(dsApi);
  // * Create Envelope:
  const envelope = makeEnvelope(args.envelopeArgs);
  // todo: fix this...
  const results = await envelopesApi.createEnvelope(args.accountId, {
    envelopeDefinition: envelope,
  });
  // = Result:
  return results;
};

const makeEnvelope = (envArgs: EnvelopeArgs) => {
  // * Envilope Definition:
  let env = new (DocuSign as any).EnvelopeDefinition();
  env.emailSubject = envArgs.emailSubject;
  // * Generate ID:
  const id = getId();
  // * Add Document:
  const base64Doc = Buffer.from(getDocument(envArgs)).toString('base64');
  const document = new (DocuSign as any).Document.constructFromObject({
    documentBase64: base64Doc,
    name: envArgs.emailSubject,
    fileExtension: 'html',
    documentId: id,
  });
  env.documents = [document];
  // * Add Signer:
  let signer = (DocuSign as any).Signer.constructFromObject({
    email: envArgs.signerEmail,
    name: envArgs.signerName,
    recipientId: id,
    routingOrder: id,
  });
  // * Add Sign Here tab:
  let signHere1 = (DocuSign as any).SignHere.constructFromObject({
    anchorString: '**signature_1**',
    anchorYOffset: '10',
    anchorUnits: 'pixels',
    anchorXOffset: '20',
  });
  // * Insert Tabs to Singer:
  signer.tabs = (DocuSign as any).Tabs.constructFromObject({
    signHereTabs: [signHere1],
  });
  // * Add Recipients:
  env.recipients = (DocuSign as any).Recipients.constructFromObject({
    signers: [signer],
  });
  // * Change Status:
  env.status = envArgs.status;
  // = Result:
  return env;
};
