import { Layout } from '@/components/layout';
import { InferGetStaticPropsType } from 'next';
import { medusaClient } from '@/lib/medusa-client';
import { Container } from '@/components/layout/container';
import { ProductCard, NavBar } from '@/components/collections';
import { SlideInCharacters } from '@/components/animations/slide-in-characters';

type ProductsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProductsPage = ({ products, collections }: ProductsPageProps) => {
  return (
    <Layout title="Products">
      <Container>
        <div className="my-10 flex flex-col gap-10 lg:my-20 lg:gap-20">
          <h1 className="text-4xl xl:text-8xl">
            <SlideInCharacters text="Unleash The Beast" />
          </h1>

          <NavBar collections={collections} />
          <div className="grid grid-cols-2 gap-[1.5px] bg-noir lg:grid-cols-3">
            {products?.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ProductsPage;

export const getStaticProps = async () => {
  const { products } = await medusaClient.products.list();
  const { collections } = await medusaClient.collections.list();

  return {
    props: {
      products,
      collections,
    },
  };
};
