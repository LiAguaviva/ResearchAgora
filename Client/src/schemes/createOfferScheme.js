import { z } from 'zod';

export const createOfferScheme = z.object({
  
  offer_title: z.string().min(1, '* Please enter the title'),
  offer_description: z.string().max(255, '* Description cannot exceed 255 characters'),
  number_of_position: z
    .preprocess((val) => (typeof val === 'string' ? parseFloat(val) : val), z.number())
    .refine((val) => val > 0, '* Number must be greater than 1'),
});