import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  esqueciSenhaSchema,
  esqueciSenhaType,
} from "../../components/Schema/admSchema";
import { esqueciSenha } from "../../services/adminServices";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

export const EsqueciASenha = () => {
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<esqueciSenhaType>({ resolver: zodResolver(esqueciSenhaSchema) });

  async function sendForm(data: Record<string, any>) {
    const response = await esqueciSenha(data);
    if (!response) {
      setErro(true);
      return console.log("Falha ao enviar email de válidação");
    }
    Cookies.set("email", data.email);
    navigate("/admin/redefinir-senha");
    reset();
  }

  return (
    <section className="bg-gray-100 flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(sendForm)}
        className="flex flex-col justify-center gap-3 p-4 w-2/3 bg-blue-200 rounded-md"
      >
        <span>
          Digite o email registrado no sistema de gestão Farmácia da banda para
          receber o código de validação para redefinir a sua palavra passe!
        </span>
        <input
          {...register("email")}
          className="h-12 px-2 outline-none focus:outline-cyan-800 border-gray-600 rounded-md"
          type="email"
          placeholder="Ex:___________@gmail.com"
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
        {erro && (
          <span className="text-sm text-red-500">
            Email não encontrado no sistema!
          </span>
        )}
        <Button type="submit" text="Validar email" />
      </form>
    </section>
  );
};
