import { MoneyAmount } from '@medusajs/medusa';

export const formatPrice = (price: MoneyAmount) => {
  return `${(price.amount / 100).toFixed(
    2,
  )} ${price.currency_code.toUpperCase()}`;
};
