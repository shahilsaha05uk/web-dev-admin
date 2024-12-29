import { useMutation, useQueryClient } from '@tanstack/react-query';
import { post } from 'api/post';
import { api_routes } from 'api/routes';

export default function useUpdateAddonDetails() {
    const queryClient = useQueryClient();

    // Define the mutation
    const mutation = useMutation({
        mutationFn: async (records) => {
            const response = await post(api_routes.updateAddon, records);
            console.log('response', response);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['allAddons']); // Properly invalidate the query
        },
    });

    return mutation;
}
