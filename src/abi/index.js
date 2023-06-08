
import addressMap from "@/abi/addressMap";
const CONTRACTS = {

    erc20:{
        abi:require("./data/erc20.json"),
    },
    erc721:{
        abi:require("./data/erc721.json"),
    },
    vault:{
        abi:require("./data/vault.json"),
        address:addressMap["0xaa36a7"].vault
    },
    usdt:{
        abi:require("./data/erc20.json"),
        address:addressMap["0xaa36a7"].usdt
    },
    stake:{
        abi:require("./data/stake.json"),
        address:addressMap["0xaa36a7"].stake
    },
};

function getContractByName(name, web3) {
    return new web3.eth.Contract(CONTRACTS[name].abi, CONTRACTS[name].address, {});
}

function getContractByToken(name, address, web3) {
    return new web3.eth.Contract(CONTRACTS[name].abi, address, {});
}

function getContractAddress(name) {
    return CONTRACTS[name].address;
}

export default {
    CONTRACTS,
    getContractByName,
    getContractByToken,
    getContractAddress
};
