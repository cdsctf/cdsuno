import { NavigateFunction } from "react-router-dom";

const globalRouter = { navigate: undefined } as {
    navigate?: NavigateFunction;
};

export default globalRouter;
