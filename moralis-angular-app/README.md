# Moralis Angular App
## Features

1. **Login** with [Metamask](https://metamask.io/) / [WalletConnect](https://walletconnect.com/)
1. **Logout**

## Configuration

You need to set your **Moralis server properties** in the `env.ts` file.<br>

```
export const defaultEnv: Env = {
  ...
  moralis: {
    appId: 'MORALIS_APPLICATION_ID',
    serverUrl: 'MORALIS_SERVER_URL'
  }
};
```
_(Check [Moralis Documentation](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server) how to create a Moralis server here)_
## Scaffolding

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10 with the following command:
```
ng new moralis-angular-app --create-application --inline-style --inline-template --package-manager=npm --routing --strict --style=scss
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4222/`. The app will automatically reload if you change any of the source files.

## Production demo

Run `npm run demo` for a demo server. This will automatically open `http://dev.localhost:5222/` where the production version will be served.
