import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/button";
import { Label } from "../../components/Labels/label";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFuncSchema,
  loginFuncType,
} from "../../components/Schema/funcionarioSchema";
import { loginFuncionario } from "../../services/funcionariosService";
import Cookies from "js-cookie";
import { useState } from "react";
import { Spinner } from "../../components/Spinner/Spinner";

export const LoginFunc = () => {
  const [status, setStatus] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFuncType>({ resolver: zodResolver(loginFuncSchema) });

  async function sendForm(data: Record<string, any>) {
    setStatus(true);
    const response = await loginFuncionario(data);
    if (!response) {
      setStatus(false);
      return setErrorLogin(true);
    }
    Cookies.remove("token");
    Cookies.set("tokenFunc", response.data.token, { expires: 1 });
    setStatus(false);
    location.href = "/home";
    reset();
  }

  return (
    <>
      <div className="bg-[url('./assets/fundo1.jpg')] bg-no-repeat bg-cover flex justify-center items-center h-screen">
        {status ? (
          <Spinner />
        ) : (
          <form
            onSubmit={handleSubmit(sendForm)}
            className=" bg-gray-200 bg-opacity-40 flex flex-col w-9/12 max-w-lg p-8 shadow-xl shadow-black-500 rounded-lg justify-center"
          >
            <h1 className="text-center text-3xl font mb-5">Login</h1>
            <hr className="mb-8 border-gray-500" />
            <Label id="nome" text="Nome de usuário" />
            <input
              {...register("usuario")}
              className="h-12 px-2 outline-none focus:outline-cyan-800 border-gray-600 rounded-md"
              type="text"
              id="nome"
              placeholder="Ex: Pedro Java"
            />
            {errors.usuario && (
              <span className="text-red-500 text-xs">
                {errors.usuario.message}
              </span>
            )}
            <Label id="pass" text="Palavra passe" />
            <input
              {...register("senha")}
              className="h-12 px-2 outline-none focus:outline-cyan-800 border-gray-600 rounded-md"
              type="password"
              id="pass"
              placeholder="Ex: Pedro Java"
            />
            {errors.senha && (
              <span className="text-red-500 text-xs">
                {errors.senha.message}
              </span>
            )}
            {errorLogin && (
              <span className="text-red-500 text-xs">
                Usuário ou senha inválido
              </span>
            )}
            <Link
              to={"/funcionario/esqueci-a-senha"}
              className="mt-2 text-blue-800 font-medium"
            >
              Esqueceu a senha?
            </Link>
            <Link to={"/"} className="mt-2  text-blue-800 font-medium">
              Administrador?
            </Link>
            <Button type="submit" text="Iniciar Sessão" />
          </form>
        )}
      </div>
    </>
  );
};
