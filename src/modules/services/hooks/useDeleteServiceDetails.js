import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "api/post";
import { api_routes } from "api/routes";

export default function useDeleteServiceDetails() {
    const queryClient = useQueryClient();

    // Define the mutation
    const mutation = useMutation({
        mutationFn: async (record) => {
            await postData(api_routes.deleteService, record);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["allServices"]); // Properly invalidate the query
        },
    });

    return mutation;
}
