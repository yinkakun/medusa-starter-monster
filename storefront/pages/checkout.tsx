import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { Layout } from '@/components/layout';
import { Container } from '@/components/layout/container';
import { medusaClient } from '@/lib/medusa-client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/context/cart-context';
import Image from 'next/image';

interface Address {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  province: string;
  postal_code: string;
  country_code: string;
  phone: string;
}

interface CheckoutFormValues {
  shipping_address: Address;
  email: string;
}

const CHECKOUT_STEPS = [
  {
    next: 'Choose Shipping Options',
  },
  {
    previous: 'Return to Information',
    next: 'Continue to Payment',
  },
  {
    previous: 'Return to Shipping Options',
    next: 'Place Order',
  },
];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [paymentIsVisible, setPaymentIsVisible] = useState(false);
  const [shippingInfoIsVisible, setShippingInfoIsVisible] = useState(true);
  const [shippingMethodIsVisible, setShippingMethodIsVisible] = useState(false);

  const methods = useForm<CheckoutFormValues>();

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('form data', data);
  };

  const nextStep = () => {
    if (activeStep > CHECKOUT_STEPS.length - 1) return;
    setActiveStep(activeStep + 1);
  };

  const previousStep = () => {
    if (activeStep === 0) return;
    setActiveStep(activeStep - 1);
  };

  const { cart } = useCart();

  return (
    <Layout title="Checkout">
      <Container>
        <div className="my-10 flex w-full flex-col items-start justify-between gap-4 md:flex-row">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex max-w-4xl grow flex-col gap-10 border border-white border-opacity-20 bg-white bg-opacity-5 p-3"
            >
              <div className="flex flex-col items-center justify-center">
                <AnimatePresence>
                  {shippingInfoIsVisible && <ShippingInfo />}
                  {shippingMethodIsVisible && <ShippingMethod />}
                  {paymentIsVisible && <Payment />}
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                <div className="md:basis-1/2">
                  {activeStep > 0 && (
                    <button className="w-full border border-white border-opacity-60 p-3 text-center text-xs uppercase duration-500 hover:border-monster-green-300 hover:text-monster-green-300">
                      <span>{CHECKOUT_STEPS[activeStep].previous}</span>
                    </button>
                  )}
                </div>

                <div className="md:basis-1/2">
                  <button className="w-full border border-white border-opacity-60 p-3 text-center text-xs uppercase tracking-wider text-white text-opacity-80 duration-500 hover:border-monster-green-300 hover:text-monster-green-300">
                    <span>{CHECKOUT_STEPS[activeStep].next}</span>
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>

          <div className="w-full basis-96  border border-white border-opacity-20 bg-white bg-opacity-5 p-3">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-6">
                {cart &&
                  cart.items.map((item) => {
                    return (
                      <div key={item.id}>
                        <div className="flex items-center gap-4">
                          <div className="flex gap-2">
                            <div className="relative flex h-[80px] w-[80px] shrink-0 items-center justify-center border-white border-opacity-20 bg-white bg-opacity-10">
                              <Image
                                src={item.thumbnail || ''}
                                width={20}
                                height={50}
                              />
                              <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-white border-opacity-20 bg-noir bg-opacity-90 p-1 px-2 text-xs text-white">
                                <span> {item.quantity}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="text-sm">{item.title}</div>
                            <div className="w-fit rounded-full border border-white border-opacity-5 bg-white bg-opacity-10 px-2 py-1 font-alt-sans text-xs">
                              ${(item.unit_price / 100).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="flex w-full items-center justify-between py-2 font-alt-sans text-sm uppercase">
                <span>Total</span>
                <span>${((cart?.total || 0) / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CheckoutPage;

const ShippingInfo = () => {
  const methods = useFormContext<CheckoutFormValues>();
  const { register, formState } = methods;

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-1 text-xs uppercase">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register('email', {
              required: 'Please enter your email',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Please enter a valid email',
              },
            })}
            className="border border-white border-opacity-20 bg-white bg-opacity-5 p-3"
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex w-full flex-col gap-1 text-xs uppercase">
            <label id="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              {...register('shipping_address.first_name', {
                required: 'Please enter your first name',
              })}
              className="border border-white border-opacity-20 bg-white bg-opacity-5 p-3"
            />
          </div>
          <div className="flex w-full flex-col gap-1 text-xs uppercase">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register('shipping_address.last_name', {
                required: 'Please enter your last name',
              })}
              className="border border-white border-opacity-20 bg-white bg-opacity-5 p-3"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-1 text-xs uppercase">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            {...register('shipping_address.country_code', {
              required: 'Please select a country',
            })}
            className="border border-white border-opacity-20 bg-white bg-opacity-5 p-3"
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
          </select>
        </div>

        <div className="flex w-full flex-col gap-1 text-xs uppercase">
          <label htmlFor="address1">Address</label>
          <input
            type="text"
            id="address1"
            {...register('shipping_address.address_1', {
              required: 'Please enter your address',
            })}
            className="border border-white border-opacity-20 bg-white bg-opacity-5 p-3"
          />
        </div>

        <div className="flex w-full flex-col gap-1 text-xs uppercase">
          <label htmlFor="address2">Apartment (Optional)</label>
          <input
            type="text"
            id="address2"
            {...register('shipping_address.address_2')}
            className="border border-white border-opacity-20 bg-white bg-opacity-5 p-3"
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex w-full flex-col gap-1 text-xs uppercase">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              {...register('shipping_address.province', {
                required: 'Please enter your state',
              })}
              className="border border-white border-opacity-20 bg-white bg-opacity-5 p-3"
            />
          </div>
          <div className="flex w-full flex-col gap-1 text-xs uppercase">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              {...register('shipping_address.city', {
                required: 'Please enter your city',
              })}
              className="border border-white border-opacity-20 bg-white bg-opacity-5 p-3"
            />
          </div>
          <div className="flex w-full flex-col gap-1 text-xs uppercase">
            <label htmlFor="postalCode">Postal code</label>
            <input
              type="text"
              id="postalCode"
              {...register('shipping_address.postal_code', {
                required: 'Please enter your postal code',
              })}
              className="border border-white border-opacity-20 bg-white bg-opacity-5 p-3"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-1 text-xs uppercase">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            {...register('shipping_address.phone', {
              required: 'Please enter your phone number',
            })}
            className="border border-white border-opacity-20 bg-white bg-opacity-5 p-3"
          />
        </div>
      </div>
    </div>
  );
};

const ShippingMethod = () => {
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

const Payment = () => {
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
