import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  esqueciSenhaSchema,
  esqueciSenhaType,
} from "../../components/Schema/admSchema";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import { Spinner } from "../../components/Spinner/Spinner";
import { esqueciSenhaFunc } from "../../services/funcionariosService";

export const EsqueciASenhaFunc = () => {
  const [status, setStatus] = useState(false);
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<esqueciSenhaType>({ resolver: zodResolver(esqueciSenhaSchema) });

  async function sendForm(data: Record<string, any>) {
    setStatus(true);
    const response = await esqueciSenhaFunc(data);
    if (!response) {
      setStatus(false);
      setErro(true);
      return console.log("Falha ao enviar email de válidação");
    }
    setStatus(false);
    Cookies.set("email", data.email, {expires: 1});
    navigate("/funcionario/redefinir-senha");
    reset();
  }

  return (
    <section className="bg-gray-100 flex justify-center items-center h-screen">
      {status ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit(sendForm)}
          className="flex flex-col justify-center gap-3 p-4 w-2/3 bg-blue-200 rounded-md"
        >
          <span>
            Digite o email registrado no sistema de gestão Farmácia da banda
            para receber o código de validação para redefinir a sua palavra
            passe!
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
      )}
    </section>
  );
};
