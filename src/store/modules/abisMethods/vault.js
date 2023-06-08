import getContract from "@/abi/index.js";

function judgeToken(rootState) {
    if (!state.token) state.token = getContract.getContractByName('vault', rootState.app.web3)
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
    ONE_YEAR({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.ONE_YEAR().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    auctionEnd({rootState}, value, {_bundleId, _auctionUser, _price} ){
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.auctionEnd(_bundleId, _auctionUser, _price).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.auctionEnd(_bundleId, _auctionUser, _price).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2),
                    value: rootState.app.web3.utils.toWei(value.toString())
                }).then(res => {

                    resolve(res)
                })
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    borrow({rootState}, {_bundleId, _amount}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.borrow(_bundleId, _amount).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.borrow(_bundleId, _amount).send({
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
    bundles({rootState}, {param0}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.bundles(param0).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    compensationRatio({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.compensationRatio().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    deposit({rootState}, {value,_underlying, _amount}) {
        console.log(_underlying)
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.deposit(_underlying, _amount).estimateGas({
                from: rootState.app.account,
                value: rootState.app.web3.utils.toWei(value.toString())
            }).then(gas => {
                state.token.methods.deposit(_underlying, _amount).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2),
                    value: rootState.app.web3.utils.toWei(value.toString())
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },
    feeRatio({rootState}, {param0}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.feeRatio(param0).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    getAum({rootState}, {_underlying}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.getAum(_underlying).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    initialize({rootState}, {_owner, _stakeProof, _auction, _stake, _rewardPools}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.initialize(_owner, _stakeProof, _auction, _stake, _rewardPools).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.initialize(_owner, _stakeProof, _auction, _stake, _rewardPools).send({
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
    interestPerShare({rootState}, {_underlying}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.interestPerShare(_underlying).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    liquidate({rootState}, {_bundleId}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.liquidate(_bundleId).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.liquidate(_bundleId).send({
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
    newBundle({rootState}, {_user, _underlying, _amount, _nftCount}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.newBundle(_user, _underlying, _amount, _nftCount).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.newBundle(_user, _underlying, _amount, _nftCount).send({
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
    pools({rootState}, {param0}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.pools(param0).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    redeem({rootState}, value, {_bundleId, _user} ){
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.redeem(_bundleId, _user).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.redeem(_bundleId, _user).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2),
                    value: rootState.app.web3.utils.toWei(value.toString())
                }).then(res => {

                    resolve(res)
                })
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    reply({rootState}, value, {_bundleId, _amount} ){
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.reply(_bundleId, _amount).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.reply(_bundleId, _amount).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2),
                    value: rootState.app.web3.utils.toWei(value.toString())
                }).then(res => {

                    resolve(res)
                })
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    setPool({rootState}, {_underlying, _allow, _borrowAPY, _occupancyFactor}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.setPool(_underlying, _allow, _borrowAPY, _occupancyFactor).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.setPool(_underlying, _allow, _borrowAPY, _occupancyFactor).send({
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
    setPoolDepositeToken({rootState}, {_underlying, _depositToken}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.setPoolDepositeToken(_underlying, _depositToken).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.setPoolDepositeToken(_underlying, _depositToken).send({
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
    stakeProof({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.stakeProof().call().then(res => {
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
    updateBlock({rootState}, {_time}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.updateBlock(_time).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.updateBlock(_time).send({
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
    userLoan({rootState}, {_bundleId}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.userLoan(_bundleId).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(JSON.parse(err.message.substr(24, err.message.length)).message)
            })
        })
    },
    withdraw({rootState}, {_underlying, _share}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.withdraw(_underlying, _share).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.withdraw(_underlying, _share).send({
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
    withdrawPlatformFee({rootState}, {_underlying, _to, _amount}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.withdrawPlatformFee(_underlying, _to, _amount).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.withdrawPlatformFee(_underlying, _to, _amount).send({
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
