import { useMemo } from "react";

export const useColumnMemo = (cols) => {
    return useMemo(() => {
        return cols;
    }, [cols]);
};
