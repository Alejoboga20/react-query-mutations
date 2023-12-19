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
	await sleep(5);
	const { data } = await productsApi.get<Product>(`/products/${id}`);

	return data;
};

export const getProducts = async ({ filterKey }: GetProductsArgs): Promise<Product[]> => {
	await sleep(5);
	const { data } = await productsApi.get<Product[]>('/products', {
		params: {
			category: filterKey,
		},
	});

	return data;
};

type CreateProduct = Omit<Product, 'id' | 'rating'>;

export const createPRoduct = async (product: CreateProduct): Promise<Product> => {
	await sleep(5);

	const { data } = await productsApi.post<Product>('/products', product);

	return data;
};
