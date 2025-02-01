import { z } from 'zod';

export const editProfileScheme = z.object({
  user_name: z.string().min(1, '* Please enter your name').nullable()
    .refine((val) => val !== null, { message: '* Please enter your name' }), 

  user_lastname: z.string().min(1, '* Please enter your last name').nullable()
  .refine((val) => val !== null, { message: '* Please enter your last name' }),

  user_country: z.string().min(1, '* Please enter your country').nullable()
  .refine((val) => val !== null, { message: '* Please enter your country' }),

  user_city: z.string().min(1, '* Please enter your city').nullable()
  .refine((val) => val !== null, { message: '* Please enter your city' }),

  user_description: z.string().max(500, '* Description cannot exceed 500 characters').nullable()
  .optional(),

  user_proficiency: z.string().max(50, '* Proficiency cannot exceed 50 characters').nullable(),

  user_current_lab: z.string().max(100, '* Current lab cannot exceed 100 characters').nullable(),

  user_current_boss: z.string().max(100, '* Current head cannot exceed 100 characters').nullable(),

});