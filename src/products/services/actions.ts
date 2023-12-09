import { type Product, productsApi } from '..';

interface GetProductsArgs {
	filterKey?: string;
}

export const getProducts = async ({ filterKey }: GetProductsArgs) => {
	console.log({ filterKey });
	const { data } = await productsApi.get<Product[]>(`/products`);
	return data;
};
