import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { Product as MedusaProduct } from '@medusajs/medusa';
import { FadeIn } from '@/components/animations/fade-in';

interface CollectionProps {
  title: string;
  handle: string;
  products: MedusaProduct[];
}

export const ProductCollection = ({
  products,
  title,
  handle,
}: CollectionProps) => {
  return (
    <div className="py-10 lg:py-20">
      <Container>
        <FadeIn>
          <div>
            <h2 className="text-4xl md:text-6xl xl:text-8xl">{title}</h2>
          </div>

          <div className="divide-x-white mt-4 grid grid-cols-1 divide-y divide-lotion divide-opacity-10 border border-lotion  border-opacity-20 text-sm md:grid-cols-2 md:divide-y lg:grid-cols-4 lg:divide-y-0 lg:divide-x">
            {products?.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}

            <div className="flex items-center justify-center bg-white bg-opacity-5 p-4">
              <Link href={`/shop/collections/${handle}`}>
                <a className="border border-white border-opacity-70 px-12 py-3 font-alt-sans text-sm uppercase duration-500 hover:border-monster-green-300 hover:text-green-300">
                  View All
                </a>
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
};

interface ProductCardProps {
  product: MedusaProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { title, thumbnail, handle, variants } = product;
  const price = variants[0]?.prices[0];

  return (
    <Link href={`/shop/${handle}`}>
      <a className="group flex bg-white bg-opacity-5 p-4 pt-6 font-alt-sans">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center  justify-center py-3">
            <div className="pointer-events-none w-28 border-opacity-20 duration-500 ease-in-out group-hover:scale-105">
              <Image src={thumbnail || ''} width={300} height={700} />
            </div>
          </div>
          <div className="flex grow flex-col items-center gap-1 pt-3  text-center text-sm duration-500 group-hover:text-monster-green-300 group-hover:opacity-100">
            <div className="text-lg capitalize">{title}</div>
            <div className="mt-auto w-fit border border-lotion border-opacity-10 bg-white  bg-opacity-5 p-2 px-4 font-alt-sans text-xs backdrop-blur-md">
              <span className="">{(price.amount / 100).toFixed(2)}</span>
              <span> {price.currency_code.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
