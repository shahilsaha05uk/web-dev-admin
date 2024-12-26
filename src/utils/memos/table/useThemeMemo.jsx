import { useMemo } from "react";
import { TableTheme } from "../../consts/tableConsts";

export const useTableThemeMemo = () => {
	return useMemo(() => {
		return TableTheme;
	}, []);
};
