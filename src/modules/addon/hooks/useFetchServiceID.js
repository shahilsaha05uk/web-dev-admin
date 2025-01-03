import { useQuery } from '@tanstack/react-query';
import { fetchAllServiceIDs } from 'api/fetcher';

export const useFetchAllServiceIDs = () => {
    const queryInfo = useQuery({
        queryKey: ['allServiceIDs'],
        queryFn: async () => await fetchAllServiceIDs(),
        refetchOnWindowFocus: false,
    });
    return queryInfo;
};
