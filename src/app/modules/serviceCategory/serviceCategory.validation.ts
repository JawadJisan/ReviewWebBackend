import { z } from 'zod';

const create = z.object({
  body: z.object({
    categoryName: z.string({
      required_error: 'Review Category Name is required',
    }),
    description: z.string().optional(),
    categoryImage: z.string({
      required_error: 'Review Category Image is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    categoryName: z.string().optional(),
    description: z.string().optional(),
    categoryImage: z.string().optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};
