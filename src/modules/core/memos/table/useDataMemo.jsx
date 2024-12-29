import { useMemo } from "react";

export const useDataMemo = (data) => {
    return useMemo(() => {
        return data;
    }, [data]);
};
