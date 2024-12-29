import { useMutation, useQueryClient } from '@tanstack/react-query';
import { post } from 'api/post';
import { api_routes } from 'api/routes';

export default function useUpdateServiceDetails() {
    const queryClient = useQueryClient();

    // Define the mutation
    const mutation = useMutation({
        mutationFn: async (record) => {
            console.log('Updating Service details:', record);
            const response = await post(api_routes.updateService, record);
            console.log('Response:', response);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['allServices']); // Properly invalidate the query
        },
    });

    return mutation;
}
