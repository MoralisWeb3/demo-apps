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
    appId: 'fsBimZnwW7dgeOvr8OCkaaenqFuCHyme2bniYVmN',
    serverUrl: 'https://ddckh0vxmjej.grandmoralis.com:2053/server',
  },
};
