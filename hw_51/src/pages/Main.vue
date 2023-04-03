<template>
    <div>
        <strong>
            <a class="link" @click="connectionWallet">Подключить Metamask</a>
        </strong>
        <p>Адресс юзера: {{ $store.state.wallet.address }}</p>
        <p>Название сети: {{ $store.state.wallet.chain }}</p>
        <p>ID сети: {{ $store.state.wallet.chainId }}</p>
    </div>
    <div class="tx_send">
        <p>
            <input class="to" v-model="to" placeholder="адрес получателя" />
            <input v-model="value" placeholder="сумма" />
            <button @click="sendTx">Отправить</button>
        </p>
    </div>
    <div class="deploy">
        <button @click="deployContract">Деплоить контракт</button>
    </div>
    <div class="tx_send">
        <p>
            <input v-model="number" placeholder="число" />
            <input  class="to" v-model="cAddress" placeholder="адрес" />
            <button @click="sNumber">Ввод</button>
        </p>
    </div>
    <div>
        Число = {{ ans }}
        <p>
            <input class="to" v-model="cAddress" placeholder="адрес" />
            <button @click="gNumber">Получить</button>
        </p>
    </div>
    <div class="tx_send">
        <p>
            <input v-model="value" placeholder="число" />
            <input class="to" v-model="cAddress" placeholder="адрес" />
            <button @click="sArr">Ввод</button>
        </p>
    </div>
    <div>
        Массив = {{ ans }}
        <p>
            <input class="to" v-model="cAddress" placeholder="адрес" />
            <button @click="gArr">Получить</button>
        </p>
    </div>
    <!-- 0x43b2320aa7f00b43ee73474970c27b43757c0621 -->
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            to: "",
            value: "",
            number: "",
            ans: "",
            arr: "",
            cAddress: "",
            value: "",
        }
    },
    methods: {
        ...mapActions({
            newBlockHeaders: "newBlockHeaders",
            connectionWallet: "connectionWallet",
            sendTransaction: "sendTransaction",
            deployContract: "deployContract",
            setNumber: "setNumber",
            getNumber: "getNumber",
            addToData: "addToData",
            getData: "getData",
        }),
        async sendTx() {
            await this.sendTransaction([this.to, this.value])
            this.to = ""
            this.value = ""
        },
        async sNumber(){
            await this.setNumber([this.cAddress, this.number])
        },
        async gNumber() {
            this.ans = await this.getNumber(this.cAddress);
        },
        async sArr(){
            await this.addToData([this.cAddress, this.value])
        },
        async gArr() {
            this.arr = await this.getData(this.cAddress)
        }
    },
    mounted() {
        // this.newBlockHeaders();
    }
}
</script>

<style scoped>
    .link {
        color: #eb9e3a;
        cursor: pointer;
        padding: 5px;
    }
    strong :hover {
        background-color: #c10a0a;
        color: #f7f5f4;
        border-radius: 5px;
    }
    .tx_send {
        padding: 10px;
        background-color: #dad9d9;
    }
    input {
        margin-right: 5px;
    }
    button {
        background-color: #b4f6c1
    }
    .deploy {
        padding: 10px;
        background-color: #dad9d9;
        margin: 10px 0;
        
    }
    .to {
        width: 450px;
    }

</style>
