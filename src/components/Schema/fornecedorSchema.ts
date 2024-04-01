import z from "zod"

export const createFornecedorSchema = z.object({
    nome: z
    .string()
    .min(8, { message: "Nome deve conter no mínimo 5 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  nif: z
    .string()
    .min(6, { message: "NIF de deve conter no mínimo 6 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  endereco: z
    .string()
    .min(5, { message: "O campo de endereço é obrigatório" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  telefone: z
    .string()
    .min(9, { message: "Número de telefone deve conter no mínimo 9 digitos" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  email: z.string().email({ message: "Insira o endereço de email" }).toLowerCase(),
  site: z
    .string()
});
export type createFornecedorType = z.infer<typeof createFornecedorSchema>

export const updateFornecedorSchema = z.object({
    nome: z
    .string()
    .min(8, { message: "Nome deve conter no mínimo 5 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  endereco: z
    .string()
    .min(5, { message: "O campo de endereço é obrigatório" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  telefone: z
    .string()
    .min(9, { message: "Número de telefone deve conter no mínimo 9 digitos" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
    site: z.string()
});
export type updateFornecedorType = z.infer<typeof updateFornecedorSchema>