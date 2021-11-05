export interface Env {
  production: boolean;
  env: 'dev' | 'prod';

  moralis: {
    /** Moralis Application ID */
    appId: string;
    /** Moralis Server URL */
    serverUrl: string;
  };
}

export const defaultEnv: Env = {
  production: false,
  env: 'dev',
  moralis: {
    appId: 'MORALIS_APPLICATION_ID',
    serverUrl: 'MORALIS_SERVER_URL'
  }
};
