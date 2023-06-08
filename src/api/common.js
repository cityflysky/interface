import instance from "@/api/http";

export const getTranStatus = (hash) => {
    return instance.get(`/api/trans-status?trans_hash=${hash}`);
};
export const emailSign = ({email,signature,datetime,address}) => {
    console.log({email,signature,datetime,address})
    return instance.post(`/api/update-email`,{email,signature,datetime,address});
};

export const getPersonInfo = (address) => {
    console.log(address)
    return instance.post(`/api/info`,{address});
};
