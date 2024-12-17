import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import ReactHook from "alova/react";
import globalRouter from "./globalRouter";
import { useToastStore } from "@/stores/toast";

export const alovaInstance = createAlova({
    baseURL: "/api",
    requestAdapter: adapterFetch(),
    timeout: 5000,
    shareRequest: true,
    statesHook: ReactHook,
    cacheFor: {
        POST: 0,
        PUT: 0,
        DELETE: 0,
    },
    responded: {
        onSuccess: async (response, _method) => {
            if (response.status === 401) {
                globalRouter?.navigate?.("/login");
                useToastStore.getState().add({
                    type: "warning",
                    title: "请先登录",
                    description: "登录后才能继续操作",
                });
                return Promise.reject(response);
            }

            return response.json();
        },
    },
});
