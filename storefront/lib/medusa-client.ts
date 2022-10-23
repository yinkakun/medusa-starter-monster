import Medusa from '@medusajs/medusa-js';

const MEDUSA_SERVER_URL = process.env.NEXT_PUBLIC_MEDUSA_SERVER_URL;

const createMedusaClient = () => {
  if (!MEDUSA_SERVER_URL) {
    throw new Error('Missing Medusa server URL');
  }

  return new Medusa({
    maxRetries: 3,
    baseUrl: MEDUSA_SERVER_URL,
  });
};

export const medusaClient = createMedusaClient();
