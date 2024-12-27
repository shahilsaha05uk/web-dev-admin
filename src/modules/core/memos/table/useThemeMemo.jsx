import { useMemo } from "react";
import { TableTheme } from "constants/table";

export const useTableThemeMemo = () => {
    return useMemo(() => {
        return TableTheme;
    }, []);
};
