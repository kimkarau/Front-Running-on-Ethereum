const ethers = require('ethers');

const { abi: erc20_abi } = require('./erc20abi.json');

if (!erc20_abi) {
    throw new Error("erc20.json ABI file missing.");
}

const account = '0xb8c84184668c22bde653fd2dcb7bf1205a71c59d';
const tokenAddress = '0xfc4f6e92143621d1ff144c1ff5b7f14ec53535a1'
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed3.binance.org");
// const provider = new ethers.providers.JsonRpcProvider("https://testnet-rpc.coinex.net");
// const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");

const checkBlock = async () => {
    let blockNumber = await provider.getBlockNumber();

    const pollBlocks = setInterval(async () => {
        const block = await provider.getBlockWithTransactions(blockNumber);
        console.log(`[*] Searching block ${blockNumber}...`);

        if (block && block.transactions) {
            // console.log(block);
            for (const tx of block.transactions) {
                try {
                    const iface = new ethers.utils.Interface(erc20_abi);
                    const decodedData = iface.parseTransaction(tx);
                    // console.log(decodedData);

                    if (decodedData.name === 'transfer') {
                        const toAddress = decodedData.args[0];
                        console.log('toAddress: ', toAddress);

                        if (
                            account === toAddress.toLowerCase() &&
                            tokenAddress === tx.to.toLowerCase()
                        ) {
                            console.log(`[+] Transaction found on block ${blockNumber}`);

                            clearInterval(pollBlocks);
                        }
                    }
                } catch (error) {
                    // console.log(error.message)
                }
            }

            blockNumber++;
        }
    }, 2000);
}

const getTransaction = async () => {
    //claim on bsc mainnet
    const txHash = '0xa66b14d87ba5690c942b783ee820cdf19873b46cf4fb939deb735e999893ce43';
    const tx = await provider.getTransaction(txHash);
    console.log(tx);

    const iface = new ethers.utils.Interface(erc20_abi);
    let decodedData = iface.parseTransaction({ data: tx.data });
    console.log(decodedData);

    // if (decodedData.name === 'transfer') {
    let toAddress = decodedData.args[0];
    console.log('toAddress: ', toAddress);

    if (account === toAddress.toLowerCase()) {
        console.log('[+] Transaction found');
    }
    // }
}

const getBalanceOf = async () => {
    const rpc="https://bsc-dataseed3.binance.org";
const contractAddress='0x424aa711301c82252ecCaccF01301aD7Ad7b5D40';

    let blockNumber = await provider.getBlockNumber();
    let lastBalance=0;

    const pollBlocks = setInterval(async () => {
        const block = await provider.getBlock(blockNumber);
        console.log(`[*] Searching block ${blockNumber}...`);

        if (block && block.transactions) {
            const provider = new ethers.providers.JsonRpcProvider(rpc);
            const contractInstance = new ethers.Contract(contractAddress, erc20_abi, provider);
            const balance = await contractInstance.balanceOf();
            const symbol = await contractInstance.symbol();

            console.log('I have  ',balance, symbol);

            if(balance>0){
                console.log('[+] Transaction found');
            }

            blockNumber++;
        }
    }, 2000);
}

// getTransaction();
getBalanceOf();
// checkBlock();
