import getContract from "@/abi/index.js";

function judgeToken(rootState) {
    if (!state.token) state.token = getContract.getContractByName('stake', rootState.app.web3)
}

const state = {};
const mutations = {};
const actions = {
    DIVISOR({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.DIVISOR().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    estateRate({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.estateRate().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    getBundleNFT({rootState}, {_bundleId}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.getBundleNFT(_bundleId).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    getCredit({rootState}, {_bundleId, _pledgeOrliquidate}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.getCredit(_bundleId, _pledgeOrliquidate).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    initialize({rootState}, {_owner, _iVault, _oracle, _tbc, _stakeProof}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.initialize(_owner, _iVault, _oracle, _tbc, _stakeProof).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.initialize(_owner, _iVault, _oracle, _tbc, _stakeProof).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2)
                }).then(res => {

                    resolve(res)
                })
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    isSanBoxEstate({rootState}, {_ids}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.isSanBoxEstate(_ids).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    liquidateRate({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.liquidateRate().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    minTBCBalance({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.minTBCBalance().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    owner({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.owner().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    pledgeRate({rootState}, {param0}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.pledgeRate(param0).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    releaseNFT({rootState}, {_bundle, _user}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.releaseNFT(_bundle, _user).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.releaseNFT(_bundle, _user).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2)
                }).then(res => {

                    resolve(res)
                })
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    sandBox({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.sandBox().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    sandboxEstate({rootState}, {param0}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.sandboxEstate(param0).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    setPledgeRate({rootState}, {_nft, _pledge}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.setPledgeRate(_nft, _pledge).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.setPledgeRate(_nft, _pledge).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2)
                }).then(res => {

                    resolve(res)
                })
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    setSandBox({rootState}, {_sandBox}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.setSandBox(_sandBox).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.setSandBox(_sandBox).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2)
                }).then(res => {

                    resolve(res)
                })
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    setSandboxEstate({rootState}, {_positions, _types}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.setSandboxEstate(_positions, _types).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.setSandboxEstate(_positions, _types).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2)
                }).then(res => {

                    resolve(res)
                })
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    setliquidateRate({rootState}, {_liquidateRate}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.setliquidateRate(_liquidateRate).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.setliquidateRate(_liquidateRate).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2)
                }).then(res => {

                    resolve(res)
                })
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    stake({rootState}, {_nfts, _ids, _underlying, _amount}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.stake(_nfts, _ids, _underlying, _amount).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.stake(_nfts, _ids, _underlying, _amount).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2)
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
                reject(err)
            })
        })
    },
    stakeSame({rootState}, {_nft, _ids, _underlying, _amount}) {
        console.log({_nft, _ids, _underlying, _amount})
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.stakeSame(_nft, _ids, _underlying, _amount).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.stakeSame(_nft, _ids, _underlying, _amount).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2)
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
                reject(err)
            })
        })
    },
    tbcIncrePledge({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.tbcIncrePledge().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    tokenEthPrice({rootState}, {_token, _amount}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.tokenEthPrice(_token, _amount).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    transferOwnership({rootState}, {newOwner}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.transferOwnership(newOwner).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.transferOwnership(newOwner).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2)
                }).then(res => {

                    resolve(res)
                })
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
}
export default {
    namespaced: true,
    mutations,
    state,
    actions
}
