import { Container } from '../layout/container';
import { FadeIn } from '../animations/fade-in';

export const Newsletter = () => {
  return (
    <div>
      <Container>
        <FadeIn>
          <div className="my-10 mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 border border-white border-opacity-10 bg-white bg-opacity-5 px-4 py-8 lg:my-20">
            <h3 className="text-center text-3xl lg:text-4xl">
              Join our newsletter be the first to know about new products and
              promotions.
            </h3>

            <form className="flex h-10 w-full max-w-md border border-white border-opacity-20">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="grow bg-white bg-opacity-10 px-4 text-sm placeholder:text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-monster-green-500 px-4 text-sm uppercase text-black duration-500 hover:bg-monster-green-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
};
