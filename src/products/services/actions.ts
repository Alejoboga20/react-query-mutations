import { type Product, productsApi } from '..';

interface GetProductsArgs {
	filterKey?: string;
}

const sleep = (seconds: number = 0): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, seconds * 1000);
	});
};

export const getProductById = async (id: number): Promise<Product> => {
	const { data } = await productsApi.get<Product>(`/products/${id}`);

	return data;
};

export const getProducts = async ({ filterKey }: GetProductsArgs): Promise<Product[]> => {
	sleep(2);

	const { data } = await productsApi.get<Product[]>(`/products`, {
		params: {
			category: filterKey,
		},
	});

	return data;
};
