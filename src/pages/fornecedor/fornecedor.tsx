import { Link } from "react-router-dom";
import { Label } from "../../components/Labels/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createFornecedorSchema,
  createFornecedorType,
} from "../../components/Schema/fornecedorSchema";
import { useEffect, useState } from "react";
import {
  createFornecedores,
  findFornecedores,
} from "../../services/fornecedoresService";
import { TableRowFornecedor } from "../../components/TableRows/tableRowForn";

export const Fornecedor = () => {
  const [data, setData] = useState([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<createFornecedorType>({
    resolver: zodResolver(createFornecedorSchema),
  });

  async function sendForm(data: Record<string, any>) {
    const response = await createFornecedores(data);
    if (!response) {
      return console.log({ messsage: "Falha ao adicionar fornecedor" });
    }
    console.log(response);
    reset();
  }

  async function getFornecedores() {
    const response = await findFornecedores();
    if (!response) {
      return console.log({ message: "Falha ao buscar fornecedores" });
    }
    setData(response.data);
  }

  useEffect(() => {
    getFornecedores();
  }, [sendForm]);

  return (
    <section className="bg-gray-100 flex flex-col ml-60 max-sm:ml-[8.5rem] h-screen p-4">
      <div className="mb-4">
        <h1 className="font-bold">Dashboard</h1>
        <Link to={"/fornecedor"} className="text-blue-700">
          Fornecedor
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(sendForm)}
        className="flex p-2 gap-4 items-center flex-col rounded w-full shadow shadow-gray-700 overflow-y-auto min-h-[13rem] bg-white"
      >
        <fieldset className="grid grid-cols-3 place-items-center gap-2 w-full flex-wrap">
          <span className="flex flex-col">
            <Label id="nome" text="Nome de fornecedor" />
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
            <Label id="endereco" text="Endereco" />
            <input
              {...register("endereco")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="text"
              placeholder="Ex: Cacuaco/Luanda/Angola"
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

          <span className="flex flex-col">
            <Label id="site" text="Site" />
            <input
              {...register("site")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="url"
              placeholder="Ex: www.javafarm.com"
              id="site"
            />
          </span>
        </fieldset>
        <div className="flex gap-3 ">
          <button
            type="reset"
            className=" rounded font-bold text-[16px] text-white bg-gray-500 p-1 px-2 hover:bg-gray-700 transition-all"
          >
            Limpar
          </button>
          <button
            type="submit"
            className=" rounded font-bold text-[16px] text-white bg-green-500 p-1 px-2 hover:bg-green-700 transition-all"
          >
            Adicionar
          </button>
        </div>
      </form>

      <div className="overflow-x-auto overflow-y-auto max-h-[28.5rem]">
        <table className="w-full border border-gray-400">
          <caption className="font-bold m-2">Tabela de Fornecedores</caption>
          <thead className="bg-gray-500 text-white font-bold h-10">
            <tr>
              <th className="border">Fornecedor</th>
              <th className="border">NIF</th>
              <th className="border">Telefone</th>
              <th className="border">Endereço</th>
              <th className="border">Email</th>
              <th className="border">Site</th>
              <th className="border">Data de registro</th>
              <th className="border">Acção</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: Record<string, any>) => (
              <TableRowFornecedor
                key={item._id}
                id={item._id}
                nome={item.nome}
                nif={item.nif}
                telefone={item.telefone}
                endereco={item.endereco}
                email={item.email}
                site={item.site}
                dataRegistro={item.dataRegistro}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
