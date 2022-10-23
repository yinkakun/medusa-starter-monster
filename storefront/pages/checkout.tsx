import { useForm } from 'react-hook-form';
import { Layout } from '@/components/layout';
import { Container } from '@/components/layout/container';

const CheckoutPage = () => {
  return (
    <Layout title="Checkout">
      <Container>
        <div className="mx-auto mb-4 mt-10 flex h-full max-w-2xl flex-col items-center justify-center">
          <ShippingAddress />
        </div>
      </Container>
    </Layout>
  );
};

export default CheckoutPage;

const ShippingAddress = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <form className="flex w-full flex-col gap-4">
        <h2 className="text-center text-xs uppercase">
          Shipping Address -Checkout is currently WIP
        </h2>
        <div className="flex w-full flex-col gap-1 text-xs uppercase">
          <label htmlFor="country">Country</label>
          <select
            name="country"
            id="country"
            className="border border-white border-opacity-25 bg-white bg-opacity-5 p-2 px-2"
            placeholder="country"
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
          </select>
        </div>

        <div className="flex w-full flex-col gap-1 text-xs uppercase">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="border border-white border-opacity-25 bg-white bg-opacity-5 p-2 px-2"
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex w-full flex-col gap-1 text-xs uppercase">
            <label>First Name</label>
            <input
              type="text"
              className="border border-white border-opacity-25 bg-white bg-opacity-5 p-2 px-2"
            />
          </div>
          <div className="flex w-full flex-col gap-1 text-xs uppercase">
            <label>Last Name</label>
            <input
              type="text"
              className="border border-white border-opacity-25 bg-white bg-opacity-5 p-2 px-2"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-1 text-xs uppercase">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="border border-white border-opacity-25 bg-white bg-opacity-5 p-2 px-2"
          />
        </div>

        <div className="flex w-full flex-col gap-1 text-xs uppercase">
          <label htmlFor="address">City</label>
          <input
            type="text"
            className="border border-white border-opacity-25 bg-white bg-opacity-5 p-2 px-2"
          />
        </div>

        <div className="flex w-full flex-col gap-1 text-xs uppercase">
          <label htmlFor="address">Apartment</label>
          <input
            type="text"
            className="border border-white border-opacity-25 bg-white bg-opacity-5 p-2 px-2"
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex w-full flex-col gap-1 text-xs uppercase">
            <label>State</label>
            <input
              type="text"
              className="border border-white border-opacity-25 bg-white bg-opacity-5 p-2 px-2"
            />
          </div>
          <div className="flex w-full flex-col gap-1 text-xs uppercase">
            <label>Zip code</label>
            <input
              type="text"
              className="border border-white border-opacity-25 bg-white bg-opacity-5 p-2 px-2"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-1 text-xs uppercase">
          <label htmlFor="address">Phone</label>
          <input
            type="text"
            className="border border-white border-opacity-25 bg-white bg-opacity-5 p-2 px-2"
          />
        </div>
      </form>
      <button className="w-full border border-white border-opacity-60 py-2 text-center text-xs uppercase duration-500 hover:border-monster-green-300 hover:text-monster-green-300">
        <span>Continue to Payment</span>
      </button>
    </div>
  );
};

const DeliveryMethod = () => {
  return (
    <section>
      <h2>Delivery Method</h2>
      <div>
        <div>
          <label htmlFor="shipping">Shipping</label>
          <input type="text" />
        </div>

        <div>
          <label htmlFor="pickup">Pickup</label>
          <input type="text" />
        </div>
      </div>
    </section>
  );
};

const PaymentMethod = () => {
  return (
    <section>
      <h2>Payment Method</h2>
      <div>
        <div>
          <label htmlFor="card">Card</label>
          <input type="text" />
        </div>

        <div>
          <label htmlFor="paypal">Paypal</label>
          <input type="text" />
        </div>
      </div>
    </section>
  );
};
