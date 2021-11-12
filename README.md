## eth-transaction-checker 🍩 
## (what is front Running on Ethereum is simple Step! and How to do that?)
Node.js programs for monitoring transactions to Ethereum addresses

#### 🍩 Web3.js Tutorial - Check all transactions to an Ethereum address in Node.js (in real-time) <br>
youtube link:https://www.youtube.com/watch?v=GSLEz-XxGY8

#### 🍩 More info at:
https://chainstack.com/exploring-the-methods-of-looking-into-ethereums-transaction-pool/ <br>
doc:https://web3js.readthedocs.io/en/v1.2.1/

##### 🍩 How to Decode Data(input of transaction)? https://lab.miguelmota.com/ethereum-input-data-decoder/example/ <br>
##### 🍩 npm of Decode Data(input of transaction)? https://github.com/cloud9020locki/ethereum-input-data-decoder <br>

### 🍩 How to inspect?
1. go to https://infura.io/ and create a new account <br>
2. create a new project for ethereum <br>
3. clone this repository on your desktop <br>
4. open with visual code then go to inspect.js and find "project_id" and "EOA account", then past project_id from infura and your EOA account to them. <br>
5. open cmd <br>
6. write "node inspect.js" <br>
7. this script collect all transaction on ropsten txpool <br>
8. see script below: <br>
```
{
  blockHash: '0x195449080bf9081652248e15e220d5060f0ea54ec9f0df760f1816c613bf84a1',
  blockNumber: 11411889,
  from: '0xa56E8844f381ecb2a95599EF22E2E66c4a6067C0',
  gas: 119793,
  gasPrice: '1621221803',
  hash: '0x394195e9a892a98a4fa897e0560910fc066086c98ac8c01d3057f545a349b25f',
  input: '0x38ed17390000000000000000000000000000000000000000000143e1c26db72caadf653f000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000a56e8844f381ecb2a95599ef22e2e66c4a6067c00000000000000000000000000000000000000000000000000000017d14272f8300000000000000000000000000000000000000000000000000000000000000020000000000000000000000000a96f0ef617575062d22d0e6361196ffbd51b3a60000000000000000000000005a31bfade25f9dd596bf8915d142e9a5673694bf',
  nonce: 272,
  r: '0x6e51fd6fa7a169c0b8b04fcb92539948ff7c9d19374c2cebb60587c2839b6987',
  s: '0x27c2c884fc47d9d64184dd3e28acfe2d9e85b523811c00a7f6f4e7c5636b97f2',
  to: '0x3753A62D7654b072Aa379866391e4a10000Dcc53',
  transactionIndex: 11,
  type: '0x0',
  v: '0x2a',
  value: '0'
}
```
9.that script was made by console.log(tx) from inspect.js that has a "input" field, "input" means data of transaction, and it has a "to". "to" is refer to smart contract address. <br>
#### tip: if input was "0x0" then "to" is refer to EOA. <br>
10.copy the "to" field then past it in: https://ropsten.etherscan.io/address/to#code (instead of "to", do not remove "#code" from uri) <br>
11.copy that uri on your chrome <br>
12.copy the contract ABI (application binary interface) <br>
13.goto https://lab.miguelmota.com/ethereum-input-data-decoder/example/ then past ABI and input that available on script. <br>
14.press decode <br>
15.you see this as follow: <br>
```
{
  "method": "swapExactTokensForTokens",
  "types": [
    "uint256",
    "uint256",
    "address[]",
    "address",
    "uint256"
  ],
  "inputs": [
    "143e1c26db72caadf653f",
    "1",
    [
      "0a96f0ef617575062d22d0e6361196ffbd51b3a6",
      "5a31bfade25f9dd596bf8915d142e9a5673694bf"
    ],
    "a56e8844f381ecb2a95599ef22e2e66c4a6067c0",
    "17d14272f83"
  ],
  "names": [
    "amountIn",
    "amountOutMin",
    "path",
    "to",
    "deadline"
  ]
}
```
🍕 congratulations (you inspect transaction on ropsten with your knowledge, this is usefull when you want to inspect core functionality of protocol!) <br>

