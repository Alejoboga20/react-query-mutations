import { useMutation } from '@tanstack/react-query';
import { productActions } from '..';

export const useProductMutation = () => {
	const mutation = useMutation({
		mutationFn: productActions.createPRoduct,
		onSuccess: () => {
			console.log('first mutation success');
		},
		onSettled: () => {
			console.log('first mutation settled');
		},
	});

	return mutation;
};
