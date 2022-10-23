import Image from 'next/image';
import { medusaClient } from '@/lib/medusa-client';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Layout } from '@/components/layout';
import { Container } from '@/components/layout/container';
import React from 'react';
import { Minus, Plus } from 'react-feather';
import { formatPrice } from '@/utils/format-price';
import { useCart } from '@/context/cart-context';

type ProductPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProductPage = ({ product }: ProductPageProps) => {
  const [quantity, setQuantity] = React.useState(1);
  const { addItem } = useCart();
  const { title, thumbnail, description, variants } = product!;
  const price = variants[0].prices[0];
  const variantId = variants[0].id;

  const handleAddToCart = () => {
    addItem({
      variantId: variantId,
      quantity,
    });

    setQuantity(1);
  };

  return (
    <Layout title={product?.title}>
      <div className="flex grow flex-col">
        <Container className="flex grow flex-col">
          <div className="my-8 grid h-full grow grid-cols-1 items-center  justify-around divide-y divide-white divide-opacity-10 border border-white border-opacity-10 md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="flex h-full grow items-center justify-center bg-white bg-opacity-5">
              <div className="flex h-[20rem] w-[20rem] items-center justify-center    p-8 lg:h-[25rem] lg:w-[25rem]">
                <div className="w-28 lg:w-32">
                  <Image src={thumbnail || ''} width={300} height={700} />
                </div>
              </div>
            </div>

            <div className="flex h-full w-full flex-col items-center justify-center gap-6  p-4">
              <div className="flex max-w-sm flex-col gap-6">
                <h1 className="text-2xl">{title}</h1>
                <span>{formatPrice(price)}</span>

                <div className="flex flex-col gap-3">
                  <QuantityStepper
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-monster-green p-3 py-2 font-alt-sans text-lg uppercase text-noir duration-500 hover:bg-monster-green-300 md:max-w-sm"
                  >
                    Add to cart
                  </button>
                </div>
                <p className="font-alt-sans text-sm font-light text-lotion text-opacity-90">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default ProductPage;

interface QuantityStepperProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityStepper = ({ quantity, setQuantity }: QuantityStepperProps) => {
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="flex h-10 grow gap-2 text-lotion md:max-w-sm md:flex-row">
      <button
        className="flex grow items-center justify-center border border-white border-opacity-20 bg-transparent p-2 px-5 duration-500 hover:bg-white hover:bg-opacity-5"
        onClick={handleDecrement}
      >
        <Minus size={16} />
      </button>
      <span className="flex grow items-center justify-center px-6 py-2">
        {quantity}
      </span>
      <button
        className="over:bg-white flex grow  items-center justify-center border border-white border-opacity-20  bg-transparent p-2 px-5  duration-500 hover:bg-monster-green-500 hover:bg-opacity-5"
        onClick={handleIncrement}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { products } = await medusaClient.products.list();
  const product = products.find((product) => {
    return product.handle === params?.handle;
  });

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  const { products } = await medusaClient.products.list();

  const paths = products.map(({ handle }) => ({
    params: { handle },
  }));

  return { paths, fallback: false };
};
