import { Link } from "react-router-dom";
import { Label } from "../../components/Labels/label";
import { useForm } from "react-hook-form";
import {
  createProdutosSchema,
  createProdutosType,
} from "../../components/Schema/produtoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProdutos, findProdutos } from "../../services/produtosService";
import { useContext, useEffect, useState } from "react";
import { TableRowProdutos } from "../../components/TableRows/tableRowProdutos";
import { UserContext } from "../../context/UserContext";

export const Produtos = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<createProdutosType>({
    resolver: zodResolver(createProdutosSchema),
  });

  async function sendForm(data: Record<string, any>) {
    const response = await createProdutos(data);
    if (!response) {
      return console.log({ message: "Falha ao adicionar novo produtos" });
    }
    console.log(response);
    reset();
  }

  async function getProdutos() {
    const response = await findProdutos();
    if (!response) {
      return console.log({ message: "Falha ao buscar produtos" });
    }
    setData(response.data);
  }

  useEffect(() => {
    getProdutos();
  }, [sendForm]);

  return (
    <section className="bg-gray-100 flex flex-col ml-60 max-sm:ml-[8.5rem] h-screen p-4">
      <div className="mb-4">
        <h1 className="font-bold">Dashboard</h1>
        <Link to={"/produtos"} className="text-blue-700">
          Produtos
        </Link>
      </div>

      {user.admin && (
        <form
          onSubmit={handleSubmit(sendForm)}
          className="flex p-2 gap-4 items-center flex-col flex-wrap rounded w-full shadow shadow-gray-700 min-h-52 bg-white"
        >
          <fieldset className="grid grid-cols-3 place-items-center gap-2 w-full flex-wrap">
            <span className="flex flex-col">
              <Label id="nome" text="Nome do produto" />
              <input
                {...register("nome")}
                className="p-1 w-full outline-none border border-gray-600 rounded-md"
                type="text"
                placeholder="Ex: Paracetamol"
                id="nome"
              />
              {errors.nome && (
                <span className="text-red-500 text-xs">
                  {errors.nome.message}
                </span>
              )}
            </span>

            <span className="flex flex-col">
              <Label id="quantidade" text="Quantidade" />
              <input
                {...register("quantidade", { valueAsNumber: true })}
                className="p-1 w-full outline-none border border-gray-600 rounded-md"
                type="number"
                min={1}
                placeholder="0"
                id="quantidade"
              />
              {errors.quantidade && (
                <span className="text-red-500 text-xs">
                  {errors.quantidade.message}
                </span>
              )}
            </span>

            <span className="flex flex-col">
              <Label id="dosagem" text="Dosagem" />
              <input
                {...register("dosagem")}
                className="p-1 w-full outline-none border border-gray-600 rounded-md"
                type="text"
                placeholder="Ex: 500mg"
                id="dosagem"
              />
              {errors.dosagem && (
                <span className="text-red-500 text-xs">
                  {errors.dosagem.message}
                </span>
              )}
            </span>

            <span className="flex flex-col">
              <Label id="descricao" text="Descrição" />
              <input
                {...register("descricao")}
                className="p-1 w-full outline-none border border-gray-600 rounded-md"
                type="text"
                placeholder="Ex: Injectavel ou Comprimido"
                id="descricao"
              />
              {errors.descricao && (
                <span className="text-red-500 text-xs">
                  {errors.descricao.message}
                </span>
              )}
            </span>

            <span className="flex flex-col">
              <Label id="preco" text="Preco" />
              <input
                {...register("preco", { valueAsNumber: true })}
                className="p-1 w-full outline-none border border-gray-600 rounded-md"
                type="number"
                min={100}
                placeholder="100"
                id="preco"
              />
              {errors.preco && (
                <span className="text-red-500 text-xs">
                  {errors.preco.message}
                </span>
              )}
            </span>

            <span className="flex flex-col">
              <Label id="fornecedor" text="Fornecedor" />
              <input
                {...register("fornecedor")}
                className="p-1 w-full outline-none border border-gray-600 rounded-md"
                type="text"
                placeholder="Ex: Shalina"
                id="fornecedor"
              />
              {errors.fornecedor && (
                <span className="text-red-500 text-xs">
                  {errors.fornecedor.message}
                </span>
              )}
            </span>

            <span className="flex flex-col">
              <Label id="fabricante" text="Fabricante" />
              <input
                {...register("fabricante")}
                className="p-1 w-full outline-none border border-gray-600 rounded-md"
                type="text"
                placeholder="Ex: shalina"
                id="fabricante"
              />
              {errors.fabricante && (
                <span className="text-red-500 text-xs">
                  {errors.fabricante.message}
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
      )}

      <div className="overflow-x-auto overflow-y-auto max-h-[30rem]">
        <table className="w-full border border-gray-400">
          <caption className="font-bold m-2">Tabela de Produtos</caption>
          <thead className="bg-gray-500 text-white font-bold h-10">
            <tr>
              <th className="border">Produto</th>
              <th className="border">Stock</th>
              <th className="border">Dosagem</th>
              <th className="border">Descrição</th>
              <th className="border">Preço</th>
              <th className="border">Fornecedor</th>
              <th className="border">Fabricante</th>
              <th className="border">Data de resgistro</th>
              {user.admin && <th className="border">Acção</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item: Record<string, any>) => (
              <TableRowProdutos
                key={item._id}
                id={item._id}
                nome={item.nome}
                quantidade={item.quantidade}
                dosagem={item.dosagem}
                descricao={item.descricao}
                preco={item.preco}
                fornecedor={item.fornecedor}
                fabricante={item.fabricante}
                dataRegistro={item.dataRegistro}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
