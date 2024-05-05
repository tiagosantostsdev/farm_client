import { useContext, useEffect, useState } from "react";
import { deleteVendas, findVendas } from "../../services/vendasService";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { AiOutlineDelete } from "react-icons/ai";

export const Venda = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);

  async function getVendas() {
    const response = await findVendas();
    if (!response) {
      return console.log("Falha ao buscar vendas");
    }
    setData(response.data);
  }

  async function deletar(id: string) {
    const response = await deleteVendas(id);
    if (!response) {
      return console.log("Erro ao deletar produtos");
    }
    console.log({ message: response });
  }

  useEffect(() => {
    getVendas();
  }, [deletar]);

  return (
    <section className="bg-gray-100 flex flex-col ml-60 max-sm:ml-[8.5rem] h-screen p-4">
      {user.usuario && (
        <div className="flex justify-end">
          <Link
            to={"/novavenda"}
            className="flex items-center rounded text-white bg-red-500 h-8 p-2"
          >
            <p>Nova venda</p>
          </Link>
        </div>
      )}

      <div className="overflow-x-auto overflow-y-auto max-h-[36rem]">
        <table className="w-full border border-gray-400">
          <caption className="font-bold mb-2">Produtos Vendidos</caption>
          <thead className="bg-gray-500 text-white font-bold h-10">
            <tr>
              <th className="border">Cliente</th>
              <th className="border">Produtos</th>
              <th className="border">Valor</th>
              <th className="border">Total</th>
              <th className="border">Troco</th>
              <th className="border">Funcionário</th>
              <th className="border">Data de venda</th>
              {user.admin && <th className="border">Acção</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item: Record<string, any>) => (
              <tr
                className="bg-white border-collapse border text-sm text-center"
                key={item._id}
              >
                <td>{item.nomeCliente}</td>
                <td className="w-[20%]">
                  <tr className="bg-white border-collapse border text-sm text-center">
                    <th className="border bg-slate-300">nome</th>
                    <th className="border bg-slate-300">quantidade</th>
                    <th className="border bg-slate-300">descrição</th>
                    <th className="border bg-slate-300">dosagem</th>
                  </tr>
                  {item.produtos.map(
                    (item: Record<string, any>, index: any) => (
                      <tr
                        key={index}
                        className="bg-red-500 border-collapse border text-sm text-center"
                      >
                        <td className="border border-collapse">{item.nome}</td>
                        <td className="border border-collapse">
                          {item.quantidade}
                        </td>
                        <td className="border border-collapse">
                          {item.descricao}
                        </td>
                        <td className="border border-collapse">
                          {item.dosagem}
                        </td>
                      </tr>
                    )
                  )}
                </td>
                <td className="border border-collapse">{item.valor}</td>
                <td className="border border-collapse">{item.total}</td>
                <td className="border border-collapse">{item.troco}</td>
                <td className="border border-collapse">
                  {item.Funcionario?.usuario}
                </td>
                <td className="border border-collapse">{item.dataVenda}</td>
                {user.admin && (
                  <td className="border border-collapse">
                    <i className="text-red-600">
                      <AiOutlineDelete
                        size={20}
                        onClick={() => deletar(item._id)}
                        className="m-auto cursor-pointer"
                      />
                    </i>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
