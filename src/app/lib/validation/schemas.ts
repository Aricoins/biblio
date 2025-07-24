// src/lib/validation/schemas.ts
import { z } from 'zod';

// Schema para validar mensajes del chat
export const ChatMessageSchema = z.object({
  message: z.string()
    .min(1, 'El mensaje no puede estar vacío')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres')
    .trim(),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })).optional().default([])
});

// Schema para validar libros
export const LibroSchema = z.object({
  titulo: z.string()
    .min(1, 'El título es requerido')
    .max(255, 'El título no puede exceder 255 caracteres')
    .trim(),
  autor: z.string()
    .min(1, 'El autor es requerido')
    .max(255, 'El autor no puede exceder 255 caracteres')
    .trim(),
  decla: z.string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .trim()
    .optional(),
  imagen: z.string()
    .url('Debe ser una URL válida')
    .optional()
});

// Schema para validar productos
export const ProductoSchema = z.object({
  model: z.string()
    .min(1, 'El modelo es requerido')
    .max(255, 'El modelo no puede exceder 255 caracteres')
    .trim(),
  category: z.string()
    .min(1, 'La categoría es requerida')
    .max(255, 'La categoría no puede exceder 255 caracteres')
    .trim(),
  specs: z.record(z.any()),
  image: z.string()
    .url('Debe ser una URL válida')
    .max(255, 'La URL de imagen no puede exceder 255 caracteres'),
  price: z.number()
    .positive('El precio debe ser positivo'),
  video: z.string()
    .url('Debe ser una URL válida')
    .max(255, 'La URL de video no puede exceder 255 caracteres')
    .optional(),
  disable: z.boolean().optional().default(false)
});

// Schema para paginación
export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20)
});

// Tipos derivados de los schemas
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type Libro = z.infer<typeof LibroSchema>;
export type Producto = z.infer<typeof ProductoSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;