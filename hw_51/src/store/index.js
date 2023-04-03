import { createStore } from 'vuex';

const Web3 = require('web3');
const web3 = new Web3('wss://eth-goerli.g.alchemy.com/v2/XdE1v9zVDSoRe6S5013cteykw1ZDC0u9');

export default createStore({
    state: {
        blocks: [],
        web3Wallet: {},
        wallet: {
            address: "",
            chainId: "",
            chain: "",
        },
        contractAddress: "",
    },
    getters: {
    },
    mutations: {
        addBlock(state, newBlock) {
            state.blocks.unshift(newBlock)
        }
    },
    actions: {
        async connectionWallet({ state }) {
            if (typeof window.ethereum !== 'undefined') {
                console.log("Ethereum client installed!")
                if (ethereum.isMetaMask === true) {
                    console.log("Metamask installed!")
                    if (ethereum.isMetaMask !== true) {
                        console.log("Metamask is not installed!")
                        await ethereum.enable()
                    } 
                    console.log("Metamask connected!")
                }
                else{
                    alert("Metamask is not installed!")
                }
            } 
            else {
                alert("Ethereum client is not installed!")
            }
            // подключение аккаунта
            ethereum.request({ method: "eth_requestAccounts" })
            .then(accounts => {
                state.wallet.address = accounts[0]
                console.log(`Account ${state.wallet.address} connected`)
            })
            // создаем провайдера
            state.web3Wallet = new Web3(ethereum)
            // параметры сети
            state.wallet.chainId = await state.web3Wallet.eth.net.getId()
            state.wallet.chain = await state.web3Wallet.eth.net.getNetworkType()
            // смена аккаунта
            ethereum.on('accountsChanged', (accounts) => {
                state.wallet.address = accounts[0]
                console.log(`accounts changed to ${state.wallet.address}`);
            }) 
            // смена сети
            ethereum.on('chainChanged', async (chainId) => {
                state.web3Wallet = new Web3(ethereum)
                state.wallet.chainId = await state.web3Wallet.eth.net.getId()
                state.wallet.chain = await state.web3Wallet.eth.net.getNetworkType()
                console.log(`chainId changed to ${state.wallet.chainId}`);
                console.log(`chain changed to ${state.wallet.chain}`);
            })
        },
        // отправка транзакции
        async sendTransaction({ state }, arg) {
            const [to, value] = arg;
            sum = web3.utils.numberToHex(value);
            await ethereum.request({
                method: "eth_sendTransaction", 
                params: [{
                    from: state.wallet.address,
                    to: to,
                    value: sum,
                }] 
            })
            .then(hash => {
                console.log(`Tx hash: ${hash}`)
            })
        }
    },
    modules: {
    }
})
