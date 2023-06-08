import instance from "@/api/http";
export const getMainData = () => {
    return instance.post(`/api/main`);
};
export const getLendingData = (chain,address) => {
    if(!address){
        address="0x0000000000000000000000000000000000000000"
    }
    if (chain === '0x89') {
        chain = 2
    } else {
        chain = 1
    }
    return instance.post(`/api/lending?chain=${chain}&address=${address}`);
};
