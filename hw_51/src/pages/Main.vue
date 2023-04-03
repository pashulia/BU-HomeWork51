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
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            to: "",
            value: ""
        }
    },
    methods: {
        ...mapActions({
            newBlockHeaders: "newBlockHeaders",
            connectionWallet: "connectionWallet",
            sendTransaction: "sendTransaction",
        }),
        async sendTx() {
            await this.sendTransaction([this.to, this.value])
            this.to = ""
            this.value = ""
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
