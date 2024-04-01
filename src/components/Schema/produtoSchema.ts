import z from "zod";

export const createProdutosSchema = z.object({
  nome: z
    .string()
    .min(4, { message: "Adicione o nome" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  quantidade: z.number({
    required_error: "Adicione a quantidade",
    invalid_type_error: "Adicione a quantidade",
  }),
  dosagem: z
    .string()
    .min(2, { message: "Adicione a dosagem" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  descricao: z
    .string()
    .min(5, { message: "Adicione a descrição" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  preco: z.number({
    required_error: "Adicione o preço",
    invalid_type_error: "Adicione o preço",
  }),
  fornecedor: z
    .string()
    .min(5, { message: "Adicione o fornecedor" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  fabricante: z
    .string()
    .min(5, { message: "Adicione a fabricante" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
});

export type createProdutosType = z.infer<typeof createProdutosSchema>;

export const updateProdutosSchema = z.object({
  nome: z
    .string()
    .min(4, { message: "Adicione o nome" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  quantidade: z.number({
    required_error: "Adicione a quantidade",
    invalid_type_error: "Adicione a quantidade",
  }),
  dosagem: z
    .string()
    .min(2, { message: "Adicione a dosagem" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  descricao: z
    .string()
    .min(5, { message: "Adicione a descrição" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  preco: z.number({
    required_error: "Adicione o preço",
    invalid_type_error: "Adicione o preço",
  }),
});

export type updateProdutosType = z.infer<typeof updateProdutosSchema>;
