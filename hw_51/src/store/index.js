import { createStore } from 'vuex';

import { ABI } from '@/contracts/Example.abi.js';
import { bytecode } from '@/contracts/Example.bin.js';

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
            let sum = state.web3Wallet.utils.toHex(value);
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
        },
        async deployContract({ state }) {
            // let myContract = new state.web3Wallet.eth.Contract(ABI);
            // let deployCode = myContract.deploy({
            //     data: bytecode
            // }).encodeABI();
            await ethereum.request({
                method: "eth_sendTransaction", 
                params: [{
                    from: state.wallet.address,
                    data: bytecode
                }] 
            })
            .then(hash => {
                console.log(`Tx hash ${hash}`)
            })
        },
        async setNumber({ state }, args ){
            const [contractAddress, number] = args;
            let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress);
            let txData = myContract.methods.setNumber(number).encodeABI();
        
            ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: state.wallet.address,
                    to: contractAddress,
                    data: txData
                }]
            })
            .then(hash => {
                console.log(`Tx hash ${hash}`)
            })
        },
        async getNumber({ state }, contractAddress) {
            let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress);
            let number = await myContract.methods.getNumber().call({from: state.wallet.address});
            return number;
        },
        async addToData({ state }, args ){
            const [contractAddress, data] = args;
            let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress);
            let txArr = myContract.methods.addToData(data).encodeABI();
        
            ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: state.wallet.address,
                    to: contractAddress,
                    data: txArr
                }]
            })
            .then(hash => {
                console.log(`Tx hash ${hash}`)
            })
        },
        async getData({ state }, contractAddress) {
            let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress);
            let arr = await myContract.methods.getData().call({from: state.wallet.address});
            return arr;
        }
    },
    modules: {
    }
})
