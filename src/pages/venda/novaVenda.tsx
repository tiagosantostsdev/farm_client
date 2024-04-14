import { Link } from "react-router-dom";
import { Label } from "../../components/Labels/label";
import { useEffect, useState } from "react";
import { createCarrinho, findCarrinho } from "../../services/carrinhoService";
import { TableRowCarrinho } from "../../components/TableRows/tableRowCarrinho";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCarrinhoSchema,
  createCarrinhoType,
} from "../../components/Schema/carrinhoSchema";
import { ConfirmVendas } from "../../components/modal/confrimVendas";

export const NovaVenda = () => {
  const [open, setOpen] = useState(false);
  const [erro, setErro] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<createCarrinhoType>({
    resolver: zodResolver(createCarrinhoSchema),
  });

  async function sendForm(data: Record<string, any>) {
    const response = await createCarrinho(data);
    if (!response) {
      setErro(true);
      return console.log("Erro ao adicionar itens ao carrinho");
    }
    setErro(false);
    console.log(response);
    reset();
  }

  async function getCarrinho() {
    const response = await findCarrinho();
    if (!response) {
      return console.log(response);
    }
    setData(response.data.item);
    setTotal(response.data.total);
  }

useEffect(() => {
    getCarrinho();
  }, [sendForm]);

  return (
    <section className=" bg-gray-100 flex flex-col ml-60 max-sm:ml-[8.5rem] h-screen p-4">
      <div className=" mb-4">
        <h1 className="font-bold">Dashboard</h1>
        <Link to={"/novavenda"} className="text-blue-700">
          Nova Venda
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(sendForm)}
        className="flex p-2 pb-3 gap-4 items-center flex-col flex-wrap rounded w-full shadow shadow-gray-700 min-h-50 bg-white"
      >
        <fieldset className="grid grid-cols-2 place-items-center gap-2 w-full flex-wrap">
          <span className="flex flex-col">
            <Label id="nome" text="Nome do produto" />
            <input
              {...register("nome")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="text"
              placeholder="Ex: paracetamol"
              id="nome"
            />
            {errors.nome && <span className="text-red-500 text-xs">{errors.nome.message}</span>}
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
            {errors.quantidade && <span className="text-red-500 text-xs">{errors.quantidade.message}</span>}
          </span>
        </fieldset>
        {erro && (
          <span className="text-sm text-red-500 text-center">
            Produto não encontrado
          </span>
        )}
        <div className="flex gap-3 ">
          <button
            type="reset"
            className=" rounded font-bold text-[16px] text-white bg-red-500 p-1 px-2 hover:bg-red-700 transition-all"
          >
            Limpar
          </button>
          <button
            type="submit"
            className=" rounded text-[16px] font-bold text-white bg-green-500 p-1 px-2 hover:bg-green-700 transition-all"
          >
            Adicionar
          </button>
        </div>
      </form>

      {open && <ConfirmVendas setOpen={setOpen} total={total}/>}

      <div className="flex justify-between mt-3">
        <p className="text-xl font-semibold">
          Total: <span>{total}</span>
          <span className="text-sm">Kz</span>{" "}
        </p>
        <button
          onClick={() => setOpen(true)}
          className="bg-orange-500 p-1 rounded text-white hover:bg-orange-700"
        >
          Concluir venda
        </button>
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-60">
        <table className="w-full border border-gray-400">
          <caption className="font-bold mb-2">Produtos selecionados</caption>
          <thead className="bg-gray-500 text-white font-bold h-10">
            <tr>
              <th className="border">Produto</th>
              <th className="border">Quantidade</th>
              <th className="border">Descrição</th>
              <th className="border">Dosagem</th>
              <th className="border">Acção</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: Record<string, any>) => (
              <TableRowCarrinho
                key={item._id}
                id={item._id}
                nome={item.nome}
                quantidade={item.quantidade}
                descricao={item.descricao}
                dosagem={item.dosagem}
                effect={useEffect}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
