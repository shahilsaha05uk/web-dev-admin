import { useMutation, useQueryClient } from '@tanstack/react-query';
import { post, postData } from 'api/post';
import { api_routes } from 'api/routes';

export default function usePostAddonDetails() {
    const queryClient = useQueryClient();

    // Define the mutation
    const mutation = useMutation({
        mutationFn: async (records) => {
            await post(api_routes.addAddon, records);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['allAddons']); // Properly invalidate the query
        },
    });

    return mutation;
}
