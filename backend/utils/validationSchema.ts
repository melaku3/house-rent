import { z } from 'zod';

export const roleSchema = z.enum(['renter', 'landlord', 'admin']);

export const userSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(6),
    role: roleSchema.optional().default('renter'),
    profileInfo: z.object({
        name: z.string().optional(),
        avatar: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }).optional()
});

export const updateUserSchema = z.object({
    email: z.string().email().toLowerCase().optional(),
    role: roleSchema.optional(),
});