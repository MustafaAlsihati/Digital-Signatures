declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOCUSIGN_CLIENT_ID: string;
      DOCUSIGN_USER_ID: string;
      OAUTHBASEPATH: string;
      REDIRECT_URI: string;
      PRIVATE_KEY_PATH: string;
      PORT?: string;
    }
  }
}

export {};
