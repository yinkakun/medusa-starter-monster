import { ProductCollection } from '@medusajs/medusa';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavBarProps {
  collections: ProductCollection[];
}

export const NavBar = ({ collections }: NavBarProps) => {
  const router = useRouter();

  const currentCollection = router.asPath.split('/')[3];
  const isCollectionPage = router.asPath.includes('/collections/');

  return (
    <div className="md:scrollbar-hide overflow-scroll">
      <div className="flex w-fit items-center divide-x divide-white divide-opacity-10 border border-white border-opacity-10 font-alt-sans text-sm uppercase">
        <Link href="/shop">
          <a
            className={`whitespace-nowrap  px-4 py-1 ${
              !isCollectionPage && 'bg-white bg-opacity-10'
            }`}
          >
            All
          </a>
        </Link>
        {collections.map((collection) => {
          return (
            <Link
              href={`/shop/collections/${collection.handle}`}
              key={collection.id}
            >
              <a
                className={`whitespace-nowrap px-4 py-1 ${
                  currentCollection === collection.handle &&
                  'bg-white bg-opacity-10'
                }`}
              >
                {collection.title}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
