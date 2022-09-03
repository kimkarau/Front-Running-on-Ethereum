const Web3 = require('web3');

const { abi: erc20_abi } = require('../ido-bot/src/contracts/abi/erc20.json')
const { abi: pancakeRouterV2_abi } = require('../ido-bot/src/contracts/abi/pancakeRouterV2.json')

const { REACT_APP_BSC_TESTNET_RPC,
    REACT_APP_BSC_TESTNET_WSS
} = process.env;

if (!erc20_abi) {
    throw new Error("erc20.json ABI file missing.")
}

if (!pancakeRouterV2_abi) {
    throw new Error("pancakeRouterV2.json ABI file missing.")
}

class LogsChecker {
    web3;
    web3ws;
    account;
    subscription;

    constructor(account) {
        this.web3ws = new Web3(new Web3.providers.WebsocketProvider(REACT_APP_BSC_TESTNET_WSS));
        this.web3 = new Web3(new Web3.providers.HttpProvider(REACT_APP_BSC_TESTNET_RPC));
        this.account = account.toLowerCase();
    }

    subscribe(topic, options) {
        this.subscription = this.web3ws.eth.subscribe(topic, options, (err, res) => {
            if (err) console.error(err);
        });
    }

    watchLogs(tokenAddress) {
        console.log('Watching all transaction logs...');
        this.subscription.on("data", (log) => {
            console.log(log);

            // var result = 0;
            // (async () => {
            //     result = await this.getBalance(tokenAddress);
            //     console.log("2. I have ", result, "CAKE");
            //     const format = this.web3.utils.fromWei(result);
            //     console.log("I have ", format, "CAKE");

            // this.swapAll(tokenAddress);
            // })()

            const routerAddress = "0xCc7aDc94F3D80127849D2b41b6439b7CF1eB4Ae0"
            this.approve(tokenAddress, routerAddress)
            // this.swapAll(tokenAddress, routerAddress);
        })
    }

    getBalance(tokenAddress) {
        const contract = new this.web3.eth.Contract(erc20_abi, tokenAddress);
        const result = contract.methods.balanceOf(this.account).call();
        console.log("1. I have ", result, "CAKE");

        return result;
    }

    approve(tokenAddress, routerAddress) {
        const amount = 115792089237316195423570985008687907853269984665640564039042573452467315683950n;
        const contract = new this.web3.eth.Contract(erc20_abi, tokenAddress, [this.account]);
        const result = contract.methods.approve(routerAddress, amount).send({
            from: this.account
        });

        console.log("Token approved: ", result);
    }

    async swapAll(tokenAddress, routerAddress) {
        const BUSDAddress = "0xE0dFffc2E01A7f051069649aD4eb3F518430B6a4";

        // (async () => {
        const contract = new this.web3.eth.Contract(pancakeRouterV2_abi, routerAddress);
        const result = await contract.methods.swapExactTokensForTokens(
            await this.getBalance(tokenAddress),
            0,
            [tokenAddress, BUSDAddress],
            this.account,
            Date.now() + 60 * 1000).call();

        const format = this.web3.utils.fromWei(result);

        console.log("I have sold tokens for ", format, "BUSD");
        // })()

    }

}

const tokenAddress = "0xB8F5B50ed77596b5E638359d828000747bb3dd89"
const walletAddress = "0xB8c84184668c22BDe653Fd2dCb7bF1205a71c59d"
// const walletAddress64 = this.web3ws.utils.padLeft('0xB8c84184668c22BDe653Fd2dCb7bF1205a71c59d', 64)
let logsChecker = new LogsChecker(walletAddress);

// var options = {
//     address: '0x5c73c2811E09A244c0711B1CC7702D6944c0efea',
//     topics: [
//         null,
//         '0x000000000000000000000000B8c84184668c22BDe653Fd2dCb7bF1205a71c59d'
//     ]
// }

var options = {
    address: tokenAddress,
    topics: [
        null,
        null,
        '0x000000000000000000000000B8c84184668c22BDe653Fd2dCb7bF1205a71c59d'
    ]
}
logsChecker.subscribe('logs', options);
logsChecker.watchLogs(tokenAddress);
