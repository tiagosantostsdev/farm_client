import { Button } from "../../components/Button/button";
import { Label } from "../../components/Labels/label";
import { Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { admSchema, inSchema } from "../../components/Schema/admSchema";
import { admSignIn } from "../../services/adminServices";
import Cookies from "js-cookie";
import { useState } from "react";

export const Login = () => {
  const [errorLogin, setErrorLogin] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<admSchema>({ resolver: zodResolver(inSchema) });

  async function sendForm(data: Record<string, any>) {
    const response = await admSignIn(data);
    if (!response) {
      return setErrorLogin(true);
    }
    Cookies.remove("tokenFunc")
    Cookies.set("token", response.data.token, { expires: 1 });
    location.href = "/home";
    reset();
  }

  return (
    <>
      <div className="bg-[url('./assets/fundo1.jpg')] bg-no-repeat flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(sendForm)}
          className=" bg-gray-200 bg-opacity-40 flex flex-col w-9/12 max-w-lg p-8 shadow-xl shadow-black-500 rounded-lg justify-center"
        >
          <h1 className="text-center text-3xl font mb-5">Login</h1>
          <hr className="mb-8 border-gray-500" />
          <Label id="admin" text="Nome de Administrador" />
          <input
            className="h-12 px-2 outline-none focus:outline-cyan-800 border-gray-600 rounded-md"
            {...register("admin")}
            type="text"
            id="admin"
            placeholder="Ex: admin"
          />
          {errors.admin && (
            <span className="text-red-500 text-xs">
              {errors.admin?.message}
            </span>
          )}
          <Label id="password" text="Palavra passe" />
          <input
            className="h-12 px-2 outline-none focus:outline-cyan-800 border-gray-600 rounded-md"
            {...register("password")}
            type="password"
            id="password"
            placeholder="Ex: admin"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password?.message}
            </span>
          )}
          {errorLogin && (
            <span className="text-red-500 text-xs">
              administrador ou senha inválido
            </span>
          )}

          <Link
            to={"admin/esqueci-a-senha"}
            className="mt-2 text-blue-800 font-medium"
          >
            Esqueceu a senha?
          </Link>
          <Link
            to={"/auth/funcionario"}
            className="mt-2  text-blue-800 font-medium"
          >
            Funcionário?
          </Link>
          <Button type="submit" text="Iniciar Sessão" />
        </form>
      </div>
    </>
  );
};
