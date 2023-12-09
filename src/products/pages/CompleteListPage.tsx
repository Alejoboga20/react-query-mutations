import { ProductList, useProducts } from '..';

export const CompleteListPage = () => {
	const { isLoading, data = [] } = useProducts({});

	console.log({ isLoading, data });

	return (
		<div className='flex-col'>
			<h1 className='text-2xl font-bold'>Todos los productos</h1>

			<ProductList products={data} />
		</div>
	);
};
