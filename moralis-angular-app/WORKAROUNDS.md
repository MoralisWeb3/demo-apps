
# Workarounds

## web3.js issue [4070](https://github.com/ChainSafe/web3.js/issues/4070#issuecomment-843193781)

- Install the following packages<br>
`npm install crypto-browserify stream-browserify assert stream-http https-browserify os-browserify`
- Add the following `paths` to the `tsconfig,json`:
  ```
  {
    "compilerOptions": {
      "paths" : {
        "crypto": ["./node_modules/crypto-browserify"],
        "stream": ["./node_modules/stream-browserify"],
        "assert": ["./node_modules/assert"],
        "http": ["./node_modules/stream-http"],
        "https": ["./node_modules/https-browserify"],
        "os": ["./node_modules/os-browserify"],
      }
    }
  }
  ```
- Add this to `polyfill.ts`
  ```
  import { Buffer } from 'buffer';
  
  (window as any).global = window;
  import { Buffer } from 'buffer';
  global.Buffer = Buffer;
  global.process = {
      env: { DEBUG: undefined },
      version: '',
      nextTick: require('next-tick')
      } as any;
  ```
