<template>
    <div>
        <strong>
            <a class="link" @click="connectionWallet">Подключить Metamask</a>
        </strong>
        <p>Адресс кошелька: {{ $store.state.wallet.address }}</p>
        <p>Название сети: {{ $store.state.wallet.chain }}</p>
        <p>ID сети: {{ $store.state.wallet.chainId }}</p>
    </div>
    <div class="tx_send">
        <h4>Отправить транзакцию по адресу!</h4>
        <p>
            <input class="to" v-model="to" placeholder="адрес получателя" />
            <input v-model="value" placeholder="сумма" />
            <button @click="sendTx">Отправить</button>
        </p>
        <p class="tx">
            <a @click="$router.push(`/tx/${res}`)">tx: {{ res }}</a>
        </p>

    </div>
    <div class="deploy">
        <h4>Деплой контракта в сеть!</h4>
        <button @click="deployContract">Деплоить контракт</button>
    </div>
    <div class="block">
        <h3>Операции с числом в контракте</h3>
        <div class="tx_send">
            <h4>Добавить число в контракт!</h4>
            <p>
                <input v-model="number" placeholder="число" />
                <input  class="to" v-model="cAddress" placeholder="адрес" />
                <button @click="sNumber">Ввод</button>
            </p>
        </div>
        <div class="tx_send">
            <h4>Получить число из контракта!</h4>
            Число = {{ ans }}
            <p>
                <input class="to" v-model="cAddress" placeholder="адрес" />
                <button @click="gNumber">Получить</button>
            </p>
        </div>
    </div>
    <div class="block">
        <h3>Операции со строкой в контракте</h3>
        <div class="tx_send">
            <h4>Добавить строку в контракт!</h4>
            <p>
                <input v-model="str" placeholder="строка" />
                <input  class="to" v-model="cAddress" placeholder="адрес" />
                <button @click="sString">Ввод</button>
            </p>
        </div>
        <div class="tx_send">
            <h4>Получить строку из контракта!</h4>
            Строка = {{ ans }}
            <p>
                <input class="to" v-model="cAddress" placeholder="адрес" />
                <button @click="gString">Получить</button>
            </p>
        </div>
    </div>
    <div class="block">
        <h3>Операции с массивом в контракте</h3>
        <div class="tx_send">
            <h4>Добавить в массив из контракта!</h4>
            <p>
                <input v-model="data" placeholder="число" />
                <input class="to" v-model="cAddress" placeholder="адрес" />
                <button @click="sArr">Ввод</button>
            </p>
        </div>
        <div class="tx_send">
            <h4>Получить массив из контракта!</h4>
            Массив = {{ ans }}
            <p>
                <input class="to" v-model="cAddress" placeholder="адрес" />
                <button @click="gArr">Получить</button>
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            to: "",
            value: "",
            number: "",
            str: "",
            ans: "",
            arr: "",
            cAddress: "",
            data: "",
            res: "",
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
            this.res = await this.sendTransaction([this.to, this.value]);
            this.to = "";
            this.value = "";
            console.log(this.res);
        },
        async sNumber(){
            await this.setNumber([this.cAddress, this.number])
        },
        async gNumber() {
            this.ans = await this.getNumber(this.cAddress);
        },
        async sString(){
            await this.setString([this.cAddress, this.str])
        },
        async gString() {
            this.ans = await this.getString(this.cAddress);
        },
        async sArr(){
            await this.addToData([this.cAddress, this.data])
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
    .block {
        border: 1px solid black;
        padding: 10px;
        margin-bottom: 10px;
    }
    .block h3 {
        text-align: center;
    }
    .tx :hover {
        color: #071bf5;
        cursor: pointer;
    }

</style>
