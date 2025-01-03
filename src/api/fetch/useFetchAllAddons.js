import { useQuery } from "@tanstack/react-query";
import { fetchAllAddons } from "api/fetcher";

export const useFetchAllAddons = () => {
    const queryInfo = useQuery({
        queryKey: ["allAddons"],
        queryFn: async () => await fetchAllAddons(),
        refetchOnWindowFocus: false,
    });
    return queryInfo;
};
