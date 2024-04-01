import z from "zod"

export const createFabricanteSchema = z.object({
    nome: z
    .string()
    .min(5, { message: "Nome deve conter no mínimo 5 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  nif: z
    .string()
    .min(6, { message: "NIF de deve conter no mínimo 6 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços",
    }),
  pais: z
    .string()
    .min(4, { message: "O campo de País é obrigatório" })
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
});

export type createFabricanteType = z.infer<typeof createFabricanteSchema>

export const updateFabricanteSchema = z.object({
    nome: z
    .string()
    .min(5, { message: "Nome deve conter no mínimo 5 caracteres" })
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
})

export type updateFabricanteType = z.infer<typeof updateFabricanteSchema>