import { z } from 'zod';

export type roleType = 'renter' | 'landlord' | 'admin';

export const userSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(6),
    role: z.string().default('renter' as roleType),
    profileInfo: z.object({
        name: z.string().optional(),
        avatar: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }).optional()
});
