declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      USER_ID: string;
      API_ACCOUNT_ID: string;
      ACCOUNT_BASE_URI: string;
      OAUTH_BASE_PATH: string;
      CLIENT_SECRET: string;
      REDIRECT_URL: string;
      PUBLIC_KEY_PATH: string;
      PRIVATE_KEY_PATH: string;
    }
  }
}

export {};
