import { z } from 'zod';

export const createOfferScheme = z.object({
  
offer_title: z.string().min(1, '* Please enter the title'),
offer_description: z.string().min(1, '* Please enter the description'),
number_of_position: z
  .preprocess((val) => (typeof val === 'string' ? parseInt(val, 10) : val), z.number())
  .refine((val) => val > 1, '* Number must be greater than 1'),
});