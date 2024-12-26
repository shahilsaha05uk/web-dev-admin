import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../routerUtils/post";
import { api_routes } from "../routes";

export default function usePostRestaurantDetails() {
	const queryClient = useQueryClient();

	// Define the mutation
	const mutation = useMutation({
		mutationFn: async (records) => {
			await postData(api_routes.postRestaurants, records);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["allRestaurants"]); // Properly invalidate the query
		},
	});

	return mutation;
}
