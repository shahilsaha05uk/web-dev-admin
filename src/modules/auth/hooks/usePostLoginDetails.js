import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api_routes } from "api/routes";
import { post } from "api/post";

export default function usePostLoginDetails() {
    // Define the mutation
    const mutation = useMutation({
        mutationFn: async (loginDetails) => {
            const response = await post(
                api_routes.postLoginDetails,
                loginDetails,
            );
            return response;
        },
    });

    return mutation;
}
