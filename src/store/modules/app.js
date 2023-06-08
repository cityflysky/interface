import {setStorage, getStorage} from "@/utils/storageUtils";
import {message} from "ant-design-vue";
import getWeb3 from "@/utils/getWeb3";

const ETHDECIMAL = 10 ** 18
const state = {
    web3: null,
    account: '',
    isConnected: false,
    chainId: "0x66eed",
    ethBalance: 0,
    onConnecting: true,
    usdtDecimal: 10 ** 6,
    usdtBalance: 0,
    isSign: getStorage('isSign') || false,
    collapsed: true,
    desireChainId: null,
    currentTheme: getStorage('currentTheme') || '',
}

const mutations = {
    SET_THEME: (state, theme) => {
        state.currentTheme = theme;
        setStorage('currentTheme', theme);
    },
    SET_ONCONNECTING(state, val) {
        state.onConnecting = val;
    },
    SET_ISSIGN: (state, value) => {
        state.isSign = value;
        setStorage('isSign', value);
    },
    SET_ACCOUNT(state, account) {
        state.account = account
    },
    SET_ISCONNECT(state, isConnect) {
        state.isConnected = isConnect
    },
    SET_Web3(state, web3) {
        state.web3 = web3
    },
    SET_Balance(state, amount) {
        state.ethBalance = amount / ETHDECIMAL
    },
    SET_USDTDecimal(state, val) {
        if (val > 0) {
            state.usdtDecimal = val
        }
    },
    SET_USDTBalance(state, amount) {
        state.usdtBalance = amount
    },
    SET_CHAINID: (state, chainId) => {
        state.chainId = chainId;
    },
    SET_DESIRE_CHAINID: (state, desireChainId) => {
        state.desireChainId = desireChainId;
    },
    SET_SIDEBAR(state, isCollapse) {
        state.collapsed = isCollapse
    },
    SET_PRICE(state, val) {
        state.priceMap = val
    },

}
const getters = {
    wrongNetWork(state) {
        return state.chainId !== state.desireChainId;
    },
}
const actions = {
    async getETHBalance({state, commit}, theme) {
        await state.web3.eth.getBalance(state.account)
        commit('SET_THEME', theme);
    },
    updateTheme({commit}, theme) {
        commit('SET_THEME', theme);
    },
    toggleSideBar({commit}, isCollapse) {
        commit("SET_SIDEBAR", isCollapse)
    },
    updateDesireChainId({commit}, chainId) {
        commit('SET_DESIRE_CHAINID', chainId);
    },
    updateChainId({commit}, chainId) {
        commit("SET_CHAINID", chainId)
    },
    async registerWeb3erWeb3({commit}) {
        // const provider = await detectEthereumProvider();
        const provider = window.ethereum
        if (provider) {
            // From now on, this should always be true:
            // provider === window.ethereum
            try {
                if (window.ethereum) {
                    try {
                        await window.ethereum
                            .request({method: 'eth_requestAccounts'})
                            .then(() => {
                            }).catch(err => {
                                console.log(err)
                                message.error(err.message)
                            })
                    } catch (error) {
                        console.error("MetaMask Account access is denied. Procedure:", error);
                    }
                }
            } catch (e) {
                console.log(e)
            }
            return new Promise(resolve => {
                getWeb3(provider).then(async result => {
                    commit("app/SET_Web3", result.web3)
                    await window.ethereum
                        .request({method: 'eth_requestAccounts'})
                        .then(async (accounts) => {
                            if (accounts && accounts.length > 0) {
                                commit("app/SET_ACCOUNT", accounts[0])
                            }
                            let balance = await result.web3.eth.getBalance(accounts[0])
                            commit("app/SET_Balance", balance)
                        })

                    try {
                        window.ethereum.on('accountsChanged', async (accounts) => {
                            if (accounts && accounts.length > 0) {
                                let balance = await result.web3.eth.getBalance(accounts[0])
                                commit("app/SET_Balance", balance)
                            }
                        });
                        window.ethereum.on('chainChanged', async () => {
                            let balance = await result.web3.eth.getBalance(this.account)
                            commit("app/SET_Balance", balance)

                            let chainId = await window.ethereum.request({method: 'eth_chainId'});
                            commit("app/SET_CHAINID", chainId)
                        });
                    } catch (e) {
                        message.info(e)
                    }

                    try {
                        let chainId = await window.ethereum.request({method: 'eth_chainId'});
                        commit("app/SET_CHAINID", chainId)
                        if ((chainId == this.desireChainId || chainId == this.desireChainId2) && this.account) {
                            commit("app/SET_ISCONNECT", true)
                        }
                        if (!(chainId == this.desireChainId || chainId == this.desireChainId2)) {
                            message.error("Please choose right chain")
                        }
                    } catch (e) {
                        this.isWalletModal = false
                    }


                    if (this.account && !this.wrongNetWork && !this.isSign) {
                        this.showSign = true
                    }
                    resolve(result)
                })
            }).catch(err => {
                message.error(err)
            })
        } else {
            message.info('Install MetaMask first!');
        }

    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
