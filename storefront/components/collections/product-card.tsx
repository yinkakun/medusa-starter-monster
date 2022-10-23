import Image from 'next/image';
import Link from 'next/link';
import { Product as MedusaProduct } from '@medusajs/medusa';
import { formatPrice } from '@/utils/format-price';

interface ProductCardProps {
  product: MedusaProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { title, thumbnail, handle, variants } = product;
  const price = variants[0]?.prices[0];

  return (
    <Link href={`/shop/${handle}`} key={handle}>
      <a className="group flex items-center justify-center bg-lotion bg-opacity-5 p-4 pt-6 font-alt-sans">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center py-3">
            <div className="pointer-events-none w-28 border-opacity-20 duration-500 ease-in-out group-hover:scale-105">
              <Image src={thumbnail || ''} width={300} height={700} />
            </div>
          </div>
          <div className="flex grow flex-col items-center gap-2 pt-3 text-center font-alt-sans text-sm  duration-500 group-hover:text-monster-green-300 group-hover:opacity-100">
            <div className="capitalize lg:text-lg">{title}</div>
            <div className="mt-auto w-fit border border-lotion border-opacity-10 bg-white  bg-opacity-5 p-2 px-4 font-alt-sans text-xs backdrop-blur-md">
              {formatPrice(price)}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
