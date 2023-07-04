declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOCUSIGN_CLIENT_ID: string;
      DOCUSIGN_USER_ID: string;
      OAUTHBASEPATH: string;
      CLIENT_SECRET: string;
      PORT?: string;
    }
  }
}

export {};
