import { useQuery } from "@tanstack/react-query";
import { fetchAllUserDetails } from "api/fetcher";

export const useFetchAllUserDetails = () => {
    const queryInfo = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => await fetchAllUserDetails(),
        refetchOnWindowFocus: false,
    });
    return queryInfo;
};
