import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productActions } from '..';

export const useProductMutation = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: productActions.createPRoduct,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['products', { filterKey: data.category }],
			});
		},
		onSettled: () => {
			console.log('first mutation settled');
		},
	});

	return mutation;
};
