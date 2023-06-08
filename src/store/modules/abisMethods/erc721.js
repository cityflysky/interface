import getContract from "@/abi/index.js";

function judgeToken(rootState,address) {
    console.log(address)
   state.token = getContract.getContractByToken('erc721',address, rootState.app.web3)
}

const state = {};
const mutations = {};
const actions = {
    approve({rootState}, {to, tokenId,address}) {
        console.log({to, tokenId,address})

        judgeToken(rootState,address)
        return new Promise((resolve, reject) => {
            state.token.methods.approve(to, tokenId).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.approve(to, tokenId).send({
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
    mint({rootState}, {to, tokenId}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.mint(to, tokenId).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.mint(to, tokenId).send({
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
    safeTransferFrom({rootState}, {from, to, tokenId}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.safeTransferFrom(from, to, tokenId).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.safeTransferFrom(from, to, tokenId).send({
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
    setApprovalForAll({rootState}, {to, approved, address}) {
        judgeToken(rootState,address)
        return new Promise((resolve, reject) => {
            state.token.methods.setApprovalForAll(to, approved).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.setApprovalForAll(to, approved).send({
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
    transferFrom({rootState}, {from, to, tokenId}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.transferFrom(from, to, tokenId).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.transferFrom(from, to, tokenId).send({
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
    balanceOf({rootState}, {owner}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.balanceOf(owner).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    getApproved({rootState}, {tokenId}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.getApproved(tokenId).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    isApprovedForAll({rootState}, {owner, operator}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.isApprovedForAll(owner, operator).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    ownerOf({rootState}, {tokenId}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.ownerOf(tokenId).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    supportsInterface({rootState}, {interfaceId}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.supportsInterface(interfaceId).call().then(res => {
                resolve(res)
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
