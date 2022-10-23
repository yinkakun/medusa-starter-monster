import { Layout } from '@/components/layout';
import { medusaClient } from '@/lib/medusa-client';
import { InferGetStaticPropsType } from 'next';
import {
  Product as MedusaProduct,
  ProductCollection as MedusaProductCollection,
} from '@medusajs/medusa';

import { Hero } from '@/components/sections/hero';
import { ProductCollection } from '@/components/sections/product-collection';

import { Newsletter } from '@/components/sections/newsletter';

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const HomePage = ({ products, collections }: HomePageProps) => {
  return (
    <Layout title="Home">
      <Hero />
      <Collections collections={collections} products={products} />
      <Newsletter />
    </Layout>
  );
};

export default HomePage;

interface CollectionsProps {
  collections: MedusaProductCollection[];
  products: MedusaProduct[];
}

const Collections = ({ collections, products }: CollectionsProps) => {
  return (
    <div className="mt-20 flex flex-col divide-y divide-white divide-opacity-10 border-t border-b border-white border-opacity-10 md:mt-40">
      {collections?.map(({ id, handle, title }) => {
        const collectionProducts = products
          .filter((product) => {
            return product.collection.handle === handle;
          })
          .slice(0, 3);

        return (
          <ProductCollection
            key={id}
            title={title}
            handle={handle}
            products={collectionProducts}
          />
        );
      })}
    </div>
  );
};

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
