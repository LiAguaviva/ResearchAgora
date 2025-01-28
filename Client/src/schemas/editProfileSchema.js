import { z } from 'zod';

export const editProfileSchema = z.object({
  user_name: z.string().min(1, '* Please enter your name').nullable()
    .refine((val) => val !== null, { message: '* Please enter your name' }), 

  user_lastname: z.string().min(1, '* Please enter your lastname').nullable()
  .refine((val) => val !== null, { message: '* Please enter your lastname' }),

  user_country: z.string().min(1, '* Please enter your country').nullable()
  .refine((val) => val !== null, { message: '* Please enter your country' }),

  user_city: z.string().min(1, '* Please enter your city').nullable()
  .refine((val) => val !== null, { message: '* Please enter your city' }),

  user_description: z.string().max(250, '* Description cannot exceed 250 characters').nullable()
  // .refine((val) => val !== null, { message: '* Description cannot be null' })
  .optional(),

  user_proficiency: z.string().max(50, '* Profiency cannot exceed 50 characters').nullable(),
    // .refine((val) => val !== null, { message: '* Please enter your proficiency' }),

  user_current_lab: z.string().max(100, '* Current lab cannot exceed 100 characters').nullable(),
  // .refine((val) => val !== null, { message: '* Please enter your current lab' }),

  user_current_boss: z.string().max(100, '* Curent head cannot exceed 100 characters').nullable(),
  // .refine((val) => val !== null, { message: '* Please enter your curent head' }),

});