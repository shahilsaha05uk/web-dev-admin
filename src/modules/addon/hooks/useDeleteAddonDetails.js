import { useMutation, useQueryClient } from '@tanstack/react-query';
import { post, postData } from 'api/post';
import { api_routes } from 'api/routes';

export default function useDeleteAddonDetails() {
    const queryClient = useQueryClient();

    // Define the mutation
    const mutation = useMutation({
        mutationFn: async (record) => {
            const response = await postData(api_routes.deleteAddon, record);
            console.log('response', response);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['allAddons']); // Properly invalidate the query
        },
    });

    return mutation;
}
