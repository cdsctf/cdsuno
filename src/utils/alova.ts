import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import ReactHook from "alova/react";

export const alovaInstance = createAlova({
    baseURL: "/api",
    requestAdapter: adapterFetch(),
    timeout: 5000,
    shareRequest: true,
    statesHook: ReactHook,
    responded: {
        onSuccess: async (response, _method) => {
            return response.json();
        },
    },
});
