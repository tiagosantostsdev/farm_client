import z from "zod";

export const createCarrinhoSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "Adicione o nome" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  quantidade: z.number({
    required_error: "Adicione a quantidade",
    invalid_type_error: "Adicione a quantidade",
  }),
});

export type createCarrinhoType = z.infer<typeof createCarrinhoSchema>;

export const updateCarrinhoSchema = z.object({
  quantidade: z.number({
    required_error: "Adicione a quantidade",
    invalid_type_error: "Adicione a quantidade",
  }),
});

export type updateCarrinhoType = z.infer<typeof updateCarrinhoSchema>;
