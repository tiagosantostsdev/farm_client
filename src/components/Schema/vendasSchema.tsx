import z from "zod";

export const createVendasSchema = z.object({
  nomeCliente: z
    .string()
    .min(4, { message: "Adicione o nome do cliente" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  valor: z.number({
    required_error: "Adicione o valor",
    invalid_type_error: "Adicione o valor",
  }),
});

export type createVendasType = z.infer<typeof createVendasSchema>