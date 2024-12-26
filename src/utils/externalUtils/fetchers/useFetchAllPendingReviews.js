import { useQuery } from "@tanstack/react-query";
import { fetchAllPendingReviews } from "../routerUtils/fetcher";

export const useFetchAllPendingReviews = () => {
	const queryInfo = useQuery({
		queryKey: ["allFeedbacks"],
		queryFn: async () => await fetchAllPendingReviews(),
		refetchOnWindowFocus: false,
	});
	return queryInfo;
};
