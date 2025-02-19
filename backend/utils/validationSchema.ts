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

export const propertySchema = z.object({
    title: z.string(),
    numberOfRooms: z.number(),
    description: z.string(),
    location: z.string(),
    price: z.number(),
    amenities: z.array(z.string()).optional(),
    image: z.array(z.string()).min(1),
    owner: z.string().length(24),
    available: z.boolean().optional()
});

export const propertyUpdateSchema = z.object({
    propertyId: z.string().length(24),
    title: z.string().optional(),
    numberOfRooms: z.number().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    price: z.number().optional(),
    amenities: z.array(z.string()).optional(),
    image: z.array(z.string()).optional(),
    available: z.boolean().optional()
});
