export interface Env {
  production: boolean;
  env: 'dev' | 'prod';

  moralis: {
    /** Moralis Application ID */
    appId: string;
    /** Moralis Server url */
    serverUrl: string;
  };
}

export const defaultEnv: Env = {
  production: false,
  env: 'dev',
  moralis: {
    appId: '>> MORALIS APPLICATION ID <<',
    serverUrl: '<< MORALIS SERVER URL <<'
  }
};
