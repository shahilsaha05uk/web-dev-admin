import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../routerUtils/post";
import { api_routes } from "../routes";

export default function useDeleteAddonDetails() {
	const queryClient = useQueryClient();

	// Define the mutation
	const mutation = useMutation({
		mutationFn: async (record) => {
			await postData(api_routes.deleteAddon, record);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["allAddons"]); // Properly invalidate the query
		},
	});

	return mutation;
}
