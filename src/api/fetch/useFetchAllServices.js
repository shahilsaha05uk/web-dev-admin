import { useQuery } from "@tanstack/react-query";
import { fetchAllServices } from "api/fetcher";

export const useFetchAllServices = () => {
    const queryInfo = useQuery({
        queryKey: ["allServices"],
        queryFn: async () => await fetchAllServices(),
        refetchOnWindowFocus: false,
    });
    return queryInfo;
};
