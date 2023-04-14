import React from "react";
import type { Method } from "axios";
import axios from "axios";
import urls from "../../consts/urls.json";


function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const authRouteApiCallV2 = async (target: (arg: any) => any, url: string|null, method: Method = "get", data: any = null) => {
    let config: {
        url: string;
        method: Method;
        data?: any;
    } = {
        url: urls.BASE_URL + url,
        method: method,
    };
    if (data) config = { ...config, data: data };
    await axios(config)
        .then(async (axiosResponse) => await target(axiosResponse))
        .catch(async (error) => {
            if (error.response) {
                if (error.response.status === 429) {
                    await sleep(1000);
                    await authRouteApiCallV2(target, url, method, data);
                } else {
                    throw error.response.status;
                }
            } else {
                console.error(error.response);
            }
        });
};


export {
    authRouteApiCallV2,
    sleep
}