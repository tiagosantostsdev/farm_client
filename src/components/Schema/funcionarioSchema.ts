import z from "zod";

export const loginFuncSchema = z.object({
  usuario: z
    .string({ required_error: "Digite o nome de funcionário" })
    .min(4, { message: "Digite o nome de funcionário" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O campo de administrador não pode conter apenas espaços",
    }),
  senha: z
    .string({ required_error: "Digite a senha de funcionário" })
    .min(1, { message: "Digite a senha de funcionário" }),
});
export type loginFuncType = z.infer<typeof loginFuncSchema>;

export const createFuncionarioSchema = z.object({
  usuario: z
    .string()
    .min(8, { message: "Nome de usuário deve conter no mínimo 8 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O campo de funcionário não pode conter apenas espaços",
    }),
  senha: z
    .string()
    .min(8, { message: "Senha deve conter no mínimo 8 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O campo senha de funcionário não pode conter apenas espaços",
    }),
  nif: z
    .string()
    .min(6, { message: "NIF de usuário deve conter no mínimo 6 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O campo nif não pode conter apenas espaços",
    }),
  endereco: z
    .string()
    .min(5, { message: "O campo de endereço é obrigatório" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O campo endereço não pode conter apenas espaços",
    }),
  telemovel: z
    .string()
    .min(13, { message: "O número de telemovel deve começar com +244" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O campo telemovel não pode conter apenas espaços",
    }),
  email: z.string().email({ message: "Email inválido" }).toLowerCase(),
  dataNascimento: z.string().min(6, { message: "Data de nascimento inválido" }),
});

export type createFuncionarioType = z.infer<typeof createFuncionarioSchema>

export const updateFuncionarioSchema = z.object({
  usuario: z
    .string()
    .min(8, { message: "Nome de usuário deve conter no mínimo 8 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O campo de funcionário não pode conter apenas espaços",
    }),
  endereco: z
    .string()
    .min(5, { message: "O campo de endereço é obrigatório" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O campo endereço não pode conter apenas espaços",
    }),
  telemovel: z
    .string()
    .min(13, { message: "O número de telemovel deve começar com +244" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O campo telemovel não pode conter apenas espaços",
    }),
  email: z.string().email({ message: "Email inválido" }).toLowerCase(),
});

export type updateFuncionarioType = z.infer<typeof updateFuncionarioSchema>