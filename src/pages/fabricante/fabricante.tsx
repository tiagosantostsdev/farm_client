import { Link } from "react-router-dom";
import { Label } from "../../components/Labels/label";
import { useForm } from "react-hook-form";
import {
  createFabricanteSchema,
  createFabricanteType,
} from "../../components/Schema/fabricanteSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TableRowFabricante } from "../../components/TableRows/tableRowFabri";
import {
  createFabricantes,
  findFabricantes,
} from "../../services/fabricanteServices";
import { useEffect, useState } from "react";

export const Fabricante = () => {
  const [data, setData] = useState([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<createFabricanteType>({
    resolver: zodResolver(createFabricanteSchema),
  });

  async function sendForm(data: Record<string, any>) {
    const response = await createFabricantes(data);
    if (!response) {
      return console.log({ message: "Falha ao adicionar novo fabricante" });
    }
    console.log(response);
    reset();
  }

  async function getFabricantes() {
    const response = await findFabricantes();
    if (!response) {
      return console.log("Falha ao buscar fabricantes");
    }
    setData(response.data);
  }

  useEffect(() => {
    getFabricantes();
  }, [sendForm]);

  return (
    <section className="bg-gray-100 flex flex-col ml-60 max-sm:ml-[8.5rem] h-screen p-4">
      <div className="mb-4">
        <h1 className="font-bold">Dashboard</h1>
        <Link to={"/fabricante"} className="text-blue-700">
          Fabricante
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(sendForm)}
        className="flex p-2 gap-4 items-center flex-col flex-wrap rounded w-full shadow shadow-gray-700 min-h-52 bg-white"
      >
        <fieldset className="grid grid-cols-3 place-items-center gap-2 w-full flex-wrap">
          <span className="flex flex-col">
            <Label id="nome" text="Nome de fabricante" />
            <input
              {...register("nome")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="text"
              placeholder="Ex: Shalina"
              id="nome"
            />
            {errors.nome && (
              <span className="text-red-500 text-xs">
                {errors.nome.message}
              </span>
            )}
          </span>

          <span className="flex flex-col">
            <Label id="nif" text="NIF" />
            <input
              {...register("nif")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="tel"
              placeholder="Ex: 265655LA3"
              id="nif"
            />
            {errors.nif && (
              <span className="text-red-500 text-xs">{errors.nif.message}</span>
            )}
          </span>

          <span className="flex flex-col">
            <Label id="pais" text="País" />
            <input
              {...register("pais")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="text"
              placeholder="Ex: Angola"
              id="pais"
            />
            {errors.pais && (
              <span className="text-red-500 text-xs">
                {errors.pais.message}
              </span>
            )}
          </span>

          <span className="flex flex-col">
            <Label id="endereco" text="Endereço" />
            <input
              {...register("endereco")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="text"
              placeholder="Ex: Zango 3/Viana/Luanda"
              id="endereco"
            />
            {errors.endereco && (
              <span className="text-red-500 text-xs">
                {errors.endereco.message}
              </span>
            )}
          </span>

          <span className="flex flex-col">
            <Label id="telefone" text="Telefone" />
            <input
              {...register("telefone")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="tel"
              placeholder="Ex: +244925000000"
              id="telefone"
            />
            {errors.telefone && (
              <span className="text-red-500 text-xs">
                {errors.telefone.message}
              </span>
            )}
          </span>

          <span className="flex flex-col">
            <Label id="email" text="Email" />
            <input
              {...register("email")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="email"
              placeholder="Ex: orlandomiguel@gmail.com"
              id="email"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </span>
        </fieldset>
        <div className="flex gap-3 ">
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
        <table className="w-full border border-gray-400">
          <caption className="font-bold m-2">Tabela de Fabricantes</caption>
          <thead className="bg-gray-500 text-white font-bold h-10">
            <tr>
              <th className="border">Fabricante</th>
              <th className="border">NIF</th>
              <th className="border">País</th>
              <th className="border">Endereço</th>
              <th className="border">Telefone</th>
              <th className="border">Email</th>
              <th className="border">Data de registro</th>
              <th className="border">Acção</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: Record<string, any>) => (
              <TableRowFabricante
                key={item._id}
                id={item._id}
                nome={item.nome}
                nif={item.nif}
                pais={item.pais}
                endereco={item.endereco}
                telefone={item.telefone}
                email={item.email}
                dataRegistro={item.dataRegistro}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
