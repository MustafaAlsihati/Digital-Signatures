export interface Args {
  accessToken: string;
  basePath: string;
  accountId: string;
}

export interface DocuSignConfig {
  clientId: string;
  userId: string;
  htmls: string[];
  emailSubject: string;
  oAuthBasePath: string;
  redirectUri: string;
  privateKey: Buffer;
  signers: Signer[];
  signatures: Signature[];
}

export interface Signer {
  userEmail: string;
  userName: string;
}

export interface Signature {
  // e.g.: '**signature_1**'
  anchorString: string;
}
