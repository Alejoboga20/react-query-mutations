import { type Product, productsApi } from '..';

interface GetProductsArgs {
	filterKey?: string;
}

export const getProducts = async () => {
	const { data } = await productsApi.get<Product[]>(`/products`);
	return data;
};
