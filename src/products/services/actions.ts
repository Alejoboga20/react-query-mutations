import { type Product, productsApi } from '..';

interface GetProductsArgs {
	filterKey?: string;
}

export const getProducts = async ({ filterKey }: GetProductsArgs) => {
	const { data } = await productsApi.get<Product[]>(`/products`, {
		params: {
			category: filterKey,
		},
	});

	return data;
};
