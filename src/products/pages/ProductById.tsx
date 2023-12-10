import { useParams } from 'react-router-dom';
import { ProductCard, useProduct } from '..';

export const ProductById = () => {
	const { id } = useParams<{ id: string }>();
	const { data } = useProduct({ id: +id! });

	return (
		<div className='flex-col'>
			<h1 className='text-2xl font-bold'>Producto</h1>
			{data && <ProductCard product={data} fullDescription />}
		</div>
	);
};
