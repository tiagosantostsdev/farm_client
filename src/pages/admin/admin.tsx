import { Link } from "react-router-dom";
import { Label } from "../../components/Labels/label";
import { useEffect, useState } from "react";
import { createAdmin, findAdmin } from "../../services/adminServices";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAdminSchema,
  createAdminType,
} from "../../components/Schema/admSchema";
import {TableRowAdmin } from "../../components/TableRows/tableRowAdmin";

export const Admin = () => {
  const [admin, setAdmin] = useState([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<createAdminType>({ resolver: zodResolver(createAdminSchema) });

  function sendForm(data: Record<string, any>) {
    const response = createAdmin(data);
    if (!response) {
      return console.log("Falha ao adicionar novo administardor");
    }
    reset();
  }

  async function getAdmins() {
    const response = await findAdmin();
    if (!response) {
      return console.log({ message: "Nenhum administardor encontrado" });
    }
    setAdmin(response.data);
  }
  useEffect(() => {
    getAdmins();
  }, [sendForm]);

  return (
    <section className="bg-gray-100 flex flex-col ml-60 max-sm:ml-[8.5rem] h-screen p-4">
      <div className="mb-4">
        <h1 className="font-bold">Dashboard</h1>
        <Link to={"/admin"} className="text-blue-700">
          Administradores
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(sendForm)}
        className="flex p-2 gap-4 items-center flex-col flex-wrap rounded w-full shadow shadow-gray-700 min-h-52 bg-white"
      >
        <fieldset className="grid grid-cols-2 place-items-center gap-2 w-full flex-wrap">
          <span className="flex flex-col">
            <Label id="admin" text="Nome de administrador" />
            <input
              {...register("admin")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="text"
              placeholder="Ex: Orlando Miguel"
              id="admin"
            />
            {errors.admin && (
              <span className="text-red-500 text-xs">
                {errors.admin.message}
              </span>
            )}
          </span>
          <span className="flex flex-col">
            <Label id="email" text="Email" />
            <input
              {...register("email")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="email"
              placeholder="Ex: Orlando Miguel"
              id="email"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </span>
          <span className="flex flex-col">
            <Label id="password" text="Senha" />
            <input
              {...register("password")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="password"
              placeholder="Ex: Orlando Miguel"
              id="password"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </span>
          <span className="flex flex-col">
            <Label id="telemovel" text="Telemovel" />
            <input
              {...register("telemovel")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="tel"
              placeholder="Ex: +244925000000"
              id="telemovel"
            />
            {errors.telemovel && (
              <span className="text-red-500 text-xs">
                {errors.telemovel.message}
              </span>
            )}
          </span>
        </fieldset>
        <div className="flex gap-2">
          <button
            type="reset"
            className=" rounded font-bold text-white bg-gray-500 p-1 px-2 hover:bg-gray-700 transition-all"
          >
            Limpar
          </button>
          <button
            type="submit"
            className=" rounded font-bold text-white bg-green-500 p-1 px-2 hover:bg-green-700 transition-all"
          >
            Adicionar
          </button>
        </div>
      </form>
      <div className="overflow-x-auto overflow-y-auto max-h-60">
        <table className="w-full text-center border border-gray-400">
          <caption>
            <h1 className="text-center font-bold m-2">
              Tabela de Administradores
            </h1>
          </caption>
          <thead className=" bg-gray-500 text-white font-bold h-10">
            <tr>
              <th className="border">Admin</th>
              <th className="border">email</th>
              <th className="border">Telemovel</th>
              <th className="border">Ações</th>
            </tr>
          </thead>
          <tbody>
          {admin.map((item: Record<string, any>) => (
            <TableRowAdmin
              key={item._id}
              id={item._id}
              admin={item.admin}
              email={item.email}
              telemovel={item.telemovel}
            />
          ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
