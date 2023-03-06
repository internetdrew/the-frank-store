import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '05od4y7z',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2022-03-06',
  token: process.env.SANITY_SECRET_TOKEN,
});
