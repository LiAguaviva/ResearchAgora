import { z } from 'zod';

export const createProjectScheme = z.object({
  title: z.string().min(1, '* Please enter the title'), 
  city: z.string().min(1, '* Please enter the city'),
  country: z.string().min(1, '* Please enter your country'),
  description: z.string().max(2000, '* Description cannot exceed 2000 characters'),
  max_member: z.preprocess((val) => (typeof(val) === 'string' ? parseFloat(val) : val), z.number()), 
  type:z.number()
  
});