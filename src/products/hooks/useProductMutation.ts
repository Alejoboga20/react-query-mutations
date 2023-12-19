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

			return { optimisticData };
		},
		onSuccess: (data, variables, context) => {
			/* Invalidate Query */
			/* queryClient.invalidateQueries({
				queryKey: ['products', { filterKey: data.category }],
			}); */
			/* Avoid Invalidate Query */
			queryClient.removeQueries({
				queryKey: ['products', context?.optimisticData.id],
			});
			queryClient.setQueryData<Product[]>(
				['products', { filterKey: data.category }],
				(prevData) => {
					if (!prevData) return [data];

					return prevData.map((product) =>
						product.id === context?.optimisticData.id ? data : product
					);
				}
			);
		},
		onSettled: () => {
			console.log('first mutation settled');
		},
	});

	return mutation;
};
