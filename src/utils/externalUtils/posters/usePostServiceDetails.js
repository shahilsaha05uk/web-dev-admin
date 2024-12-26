import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../routerUtils/post";
import { api_routes } from "../routes";

export default function usePostServiceDetails() {
	const queryClient = useQueryClient();

	// Define the mutation
	const mutation = useMutation({
		mutationFn: async (records) => {
			await postData(api_routes.addService, records);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["allServices"]); // Properly invalidate the query
		},
	});

	return mutation;
}
