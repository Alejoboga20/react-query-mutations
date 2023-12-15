import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productActions } from '..';

export const useProductMutation = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: productActions.createPRoduct,
		onSuccess: (data) => {
			/* Invalidate Query */
			/* queryClient.invalidateQueries({
				queryKey: ['products', { filterKey: data.category }],
			}); */
			/* Avoid Invalidate Query */
			queryClient.setQueryData<Product[]>(
				['products', { filterKey: data.category }],
				(prevData) => {
					return [...(prevData || []), data];
				}
			);
		},
		onSettled: () => {
			console.log('first mutation settled');
		},
	});

	return mutation;
};
