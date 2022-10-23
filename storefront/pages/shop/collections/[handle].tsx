import { Layout } from '@/components/layout';
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import { medusaClient } from '@/lib/medusa-client';
import { Container } from '@/components/layout/container';
import { ProductCard, NavBar } from '@/components/collections';
import { FadeInText } from '@/components/animations/fade-in-text';

type ProductsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const CollectionPage = ({
  collectionProducts,
  collections,
}: ProductsPageProps) => {
  return (
    <Layout>
      <Container>
        <div className="my-10 flex flex-col gap-10 lg:my-20 lg:gap-20">
          <h1 className="text-4xl xl:text-8xl">
            <FadeInText text="Unleash The Beast" />
          </h1>

          <NavBar collections={collections} />
          <div className="grid grid-cols-2 gap-[1.5px] bg-noir lg:grid-cols-3">
            {collectionProducts?.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CollectionPage;

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { products } = await medusaClient.products.list();
  const { collections } = await medusaClient.collections.list();

  const collection = collections.find((collection) => {
    return collection.handle === params?.handle;
  });

  const collectionProducts = products.filter((product) => {
    return product.collection.handle === collection?.handle;
  });

  return {
    props: {
      collections,
      collectionProducts,
    },
  };
};

export const getStaticPaths = async () => {
  const { collections } = await medusaClient.collections.list();

  const paths = collections.map((collection) => ({
    params: { handle: collection.handle },
  }));

  return { paths, fallback: false };
};
