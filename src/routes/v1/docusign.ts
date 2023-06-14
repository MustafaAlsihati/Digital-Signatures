import * as DocuSign from 'docusign-esign';
import { DocuSignConfig } from '../../types';
import { getId, toBuffer } from '../../helpers/utils';

export default async function onSendDocuSignEmail(config: DocuSignConfig) {
  // * Get Access Token and User Info:
  const { access_token, require_signer_authentication, consent_url } =
    await getAuthCode(config);
  // * Return Consent URL only if User Token is not valid:
  if (require_signer_authentication) {
    return { consent_url };
  }
  // * Get User Info:
  const userInfo = await getUserInfo(config, access_token);
  // * Send Envelope:
  const result = await sendEnvelope(config, userInfo, access_token);
  // = Return Result:
  return result;
}

const SCOPES = ['signature', 'impersonation'];
const EXPIRES_IN = 10 * 60;

const getAuthCode = async (config: DocuSignConfig) => {
  try {
    // * Init Client instance:
    const dsApi = new DocuSign.ApiClient();
    dsApi.setOAuthBasePath(config.oAuthBasePath!.replace('https://', ''));
    // * Get User Token:
    const result = await dsApi.requestJWTUserToken(
      config.clientId,
      config.userId,
      [...SCOPES],
      toBuffer(config.privateKey),
      EXPIRES_IN,
    );
    // = Result:
    return JSON.parse(result?.text ?? '{}');
  } catch {
    // * Return Consent URL if User Token is not valid:
    return {
      require_signer_authentication: true,
      consent_url: getConsent(config),
    };
  }
};

const getConsent = ({
  oAuthBasePath,
  clientId,
  redirectUri,
}: DocuSignConfig) => {
  const urlScopes = [...SCOPES].join('+');
  const consentUrl =
    `${oAuthBasePath}/oauth/auth?response_type=code&` +
    `scope=${urlScopes}&client_id=${clientId}&` +
    `redirect_uri=${redirectUri}`;
  return consentUrl;
};

const getUserInfo = async (config: DocuSignConfig, accessToken: string) => {
  // * Init Client instance:
  const dsApi = new DocuSign.ApiClient();
  dsApi.setOAuthBasePath(config.oAuthBasePath.replace('https://', ''));
  // * Get User Info:
  const userInfo: DocuSign.UserInfo = await dsApi.getUserInfo(accessToken);
  // = Result:
  return userInfo;
};

const sendEnvelope = async (
  config: DocuSignConfig,
  accountInfo: DocuSign.UserInfo,
  accessToken: string,
) => {
  const userInfo =
    'accounts' in accountInfo
      ? (accountInfo.accounts as any[]).find(
          account => account.isDefault === 'true',
        )
      : undefined;
  // * Init Client instance:
  const dsApi = new DocuSign.ApiClient();
  dsApi.setBasePath(`${userInfo?.baseUri}/restapi`);
  dsApi.addDefaultHeader('Authorization', 'Bearer ' + accessToken);
  // * Envelope Init:
  const envelopesApi = new DocuSign.EnvelopesApi(dsApi);
  // * Create Envelope:
  const envelope = makeEnvelope(config);
  // * Send Envelope:
  const results = await envelopesApi.createEnvelope(userInfo?.accountId, {
    envelopeDefinition: envelope,
  });
  // = Result:
  return results;
};

const makeEnvelope = (config: DocuSignConfig) => {
  // * Envilope Definition:
  let env = new (DocuSign as any).EnvelopeDefinition();
  env.emailSubject = config.emailSubject;

  // * Generate Routing Order Id:
  const routingOrder = getId();

  // * Add Documents:
  env.documents = config.htmls.map(html => {
    const documentId = getId();
    const base64Doc = Buffer.from(html).toString('base64');
    const document = new (DocuSign as any).Document.constructFromObject({
      documentBase64: base64Doc,
      name: config.emailSubject,
      fileExtension: 'html',
      documentId,
    });
    return document;
  });

  // * Add Signers:
  let signers: any[] = [];
  config.signers.forEach(signer => {
    const recipientId = getId();
    let _signer = (DocuSign as any).Signer.constructFromObject({
      email: signer.userEmail,
      name: signer.userName,
      recipientId,
      routingOrder,
    });

    // * Create Signature for each Signer:
    let signHereTabs: any[] = [];
    config.signatures.forEach(signature => {
      let _signature = (DocuSign as any).SignHere.constructFromObject({
        anchorString: signature.anchorString,
        anchorYOffset: '10',
        anchorUnits: 'pixels',
        anchorXOffset: '20',
      });
      signHereTabs.push(_signature);
    });

    // * Insert Tabs to Singer:
    _signer.tabs = (DocuSign as any).Tabs.constructFromObject({
      signHereTabs,
    });

    // = Add Signer to list:
    signers.push(_signer);
  });
  // * Add Recipients:
  env.recipients = (DocuSign as any).Recipients.constructFromObject({
    signers,
  });

  // * Change Status:
  env.status = 'sent';
  // = Result:
  return env;
};
