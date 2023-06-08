import moment from "moment";
import {getTranStatus} from "@/api/common";

export function formatTime(time) {
    return moment(time).utc().format("YYYY-MM-DD HH:mm:ss") + " UTC";
}

export function formatTimeDay(time) {
    return moment(time).utc().format("YYYY-MM-DD") + " UTC";
}

export function formatTimeMinus(time) {
    return moment(time).utc().format("YYYY-MM-DD HH:mm") + " UTC";
}

export const dealRes = async (transactionHash) => {
    let statusRes = await getTranStatus(transactionHash);
    if (statusRes.data.data == 1) {
        setTimeout(() => {
            return
        }, 3000);
    } else {
        setTimeout(() => {
            dealRes(transactionHash);
        }, 3000);
    }
}
