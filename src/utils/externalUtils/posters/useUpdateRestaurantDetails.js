import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../routerUtils/post";
import { api_routes } from "../routes";

export default function useUpdateRestaurantDetails() {
	const queryClient = useQueryClient();

	// Define the mutation
	const mutation = useMutation({
		mutationFn: async (record) => {
			console.log("Updating restaurant details:", record);
			await postData(api_routes.updateRestaurant, record);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["allRestaurants"]); // Properly invalidate the query
		},
	});

	return mutation;
}
