import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/button";
import {
  redefinirSenhaSchema,
  redefinirSenhaType,
} from "../../components/Schema/admSchema";
import { Label } from "../../components/Labels/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Spinner/Spinner";
import { redefinirSenhaFunc } from "../../services/funcionariosService";

export const RedefinirASenhaFunc = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [erro, setErro] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<redefinirSenhaType>({
    resolver: zodResolver(redefinirSenhaSchema),
  });

  async function sendForm(data: Record<string, any>) {
    setStatus(true);
    const response = await redefinirSenhaFunc(data);
    if (!response) {
      setStatus(false);
      return setErro(true);
    }
    setStatus(false);
    navigate("/auth/funcionario");
    reset();
  }

  return (
    <section className="bg-gray-100 flex justify-center items-center h-screen">
      {status ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit(sendForm)}
          className="flex flex-col justify-center p-4 w-2/3 bg-blue-200 rounded-md"
        >
          <Label id="codigo" text="Insira o código de validação" />
          <input
            {...register("codigo")}
            className="h-12 px-2 outline-none focus:outline-cyan-800 border-gray-600 rounded-md"
            type="text"
            maxLength={6}
            id="codigo"
            placeholder="000000"
          />
          {errors.codigo && (
            <span className="text-sm text-red-500">
              {errors.codigo.message}
            </span>
          )}
          <Label id="password" text="Nova senha" />
          <input
            {...register("password")}
            className="h-12 px-2 outline-none focus:outline-cyan-800 border-gray-600 rounded-md"
            type="password"
            id="password"
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
          <Label id="confPassword" text="Confirmar senha" />
          <input
            {...register("confPassword")}
            className="h-12 px-2 outline-none focus:outline-cyan-800 border-gray-600 rounded-md"
            type="password"
            id="confPassword"
          />
          {errors.confPassword && (
            <span className="text-sm text-red-500">
              {errors.confPassword.message}
            </span>
          )}
          {erro && (
            <span className="text-sm text-red-500">
              Código de validação inválido
            </span>
          )}
          <Button type="submit" text="Redefinir Senha" />
        </form>
      )}
    </section>
  );
};
