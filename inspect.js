const Web3 = require('web3');

class TransactionChecker {
    web3;
    web3ws;
    account;
    subscription;

    constructor(account) {
        this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://rpc.ankr.com/bsc_testnet_chapel/ws/8ac99bcdf3c33ad00ec3cc515b72c2088529c7782f67cd1d11d3c8bc09dba78b'));
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.ankr.com/bsc_testnet_chapel/8ac99bcdf3c33ad00ec3cc515b72c2088529c7782f67cd1d11d3c8bc09dba78b'));
        this.account = account.toLowerCase();
    }

    subscribe(topic) {
        this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
            if (err) console.error(err);
        });
    }

    watchTransactions() {
        console.log('Watching all pending transactions...');
        this.subscription.on('data', (txHash) => {
            setTimeout(async () => {
                try {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    if (tx != null) {
                     console.log(tx);
                    }
                } catch (err) {
                    console.error(err);
                }
            }, 60000)
        });
    }
}

let txChecker = new TransactionChecker('EOA account');
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions();
