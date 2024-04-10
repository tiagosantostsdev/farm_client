import { z } from "zod";

export const inSchema = z.object({
  admin: z
    .string({ required_error: "Digite o nome de administardor" })
    .min(4, { message: "Digite o nome de administrador" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O campo de administrador não pode conter apenas espaços",
    }),
  password: z
    .string({ required_error: "Digite a senha de administrador" })
    .min(1, { message: "Digite a senha de administrador" }),
});
export type admSchema = z.infer<typeof inSchema>;

export const esqueciSenhaSchema = z.object({
  email: z
    .string({ required_error: "Campo email obrigatório" })
    .email({ message: "Email inválido" }),
});
export type esqueciSenhaType = z.infer<typeof esqueciSenhaSchema>;

export const redefinirSenhaSchema = z
  .object({
    codigo: z
      .string()
      .min(6, { message: "Código de inválido" }).max(6)
      .refine((value) => !/^\s*$/.test(value), {
        message: "O campo código não pode conter apenas espaços",
      }),
    password: z
      .string({ required_error: "Introduza a nova senha" })
      .min(8, { message: "Palavra passe deve conter no mínimo 8 caracteres" }),
    confPassword: z
      .string({ required_error: "Confirme a senha" })
      .min(8, { message: "Confirme a senha" }),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "As senhas não correspondem",
    path: ["confPassword"],
  });

export type redefinirSenhaType = z.infer<typeof redefinirSenhaSchema>;

export const createAdminSchema = z.object({
  admin: z.string().min(8, {message:"Nome de usuário deve conter no mínimo 5 caracteres"}).refine((value) => !/^\s*$/.test(value), {
    message: "O campo de administrador não pode conter apenas espaços",
  }),
  email:z.string().email({message: "Email inválido"}).toLowerCase(),
  password: z.string().min(8, {message:"Senha deve conter no mínimo 8 caracteres"}).refine((value) => !/^\s*$/.test(value), {
    message: "O campo de administrador não pode conter apenas espaços",
  }),
  telemovel: z.string().min(13, {message:"O número de telemovel deve começar com +244"})
})

export type createAdminType = z.infer<typeof createAdminSchema>

export const updateAdminSchema = z.object({
  admin: z.string().min(8, {message:"Nome de usuário deve conter no mínimo 5 caracteres"}).refine((value) => !/^\s*$/.test(value), {
    message: "O campo de administrador não pode conter apenas espaços",
  }),
  email:z.string().email({message: "Email inválido"}).toLowerCase(),
  telemovel: z.string().min(13, {message:"O número de telemovel deve começar com +244"})
})

export type updateAdminType = z.infer<typeof updateAdminSchema>