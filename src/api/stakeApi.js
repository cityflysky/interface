import instance from "@/api/http";

export const getStakeData = (chain = 1, address ) => {
    if (chain === '0x89') {
        chain = 2
    } else {
        chain = 1
    }
    if(!address){
        address= "0x0000000000000000000000000000000000000000"
    }
    return instance.post(`/api/stake?chain=${chain}&address=${address}`);
};

export const getTokens = (chain = 1, address ) => {
    if (chain === '0x89') {
        chain = 2
    } else {
        chain = 1
    }
    if(!address){
        address= "0x0000000000000000000000000000000000000000"
    }
    return instance.post(`/api/tokens?chain=${chain}&address=${address}`);
};
