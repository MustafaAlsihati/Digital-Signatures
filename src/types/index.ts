export interface Args {
  accessToken: string;
  basePath: string;
  accountId: string;
  envelopeArgs: EnvelopeArgs;
}

export interface EnvelopeArgs {
  status: string;
  signerEmail: string;
  signerName: string;
  emailSubject: string;
}
