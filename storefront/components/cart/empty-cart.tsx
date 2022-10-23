import Link from 'next/link';

export const EmptyCart = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 border border-white border-opacity-10">
      <p className="text-lg  uppercase">Your cart is empty 👀</p>
      <Link href="/shop">
        <a className="border border-white border-opacity-70 py-2 px-4 text-center text-sm uppercase duration-300 hover:border-monster-green-300 hover:text-monster-green-300">
          Explore the Shop
        </a>
      </Link>
    </div>
  );
};
