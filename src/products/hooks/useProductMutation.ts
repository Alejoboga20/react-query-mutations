import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productActions } from '..';

export const useProductMutation = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: productActions.createPRoduct,
		/* For optimistic updates */
		onMutate: (data) => {
			const optimisticData = { ...data, id: Date.now() };

			queryClient.setQueryData<Product[]>(
				['products', { filterKey: data.category }],
				(prevData) => {
					return [...(prevData || []), optimisticData];
				}
			);
		},
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
