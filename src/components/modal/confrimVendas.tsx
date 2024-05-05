import { useForm } from "react-hook-form";
import { createVendasSchema, createVendasType } from "../Schema/vendasSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createVendas, updateVendas } from "../../services/vendasService";
import { Spinner } from "../Spinner/Spinner";

export const ConfirmVendas = (params: Record<string, any>) => {
  const [erro, setErro] = useState(false);
  const [openSpinner, setOpenSpinner] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<createVendasType>({ resolver: zodResolver(createVendasSchema) });

  async function sendForm(data: Record<string, any>) {
    setOpenSpinner(true);
    if (!data.nomeCliente && !data.valor) {
      return console.log("Preencha os campos solicitados por favor!");
    }

    const total: number = params.total;
    if (total === 0) {
      return setErro(true);
    } else {
      if (data.valor < total) {
        return setErro(true);
      }
    }
    setErro(false);

    const response = await createVendas(data);
    
    if (!response) {
      setOpenSpinner(false);
      return console.log("Falha ao adicionar novo cliente");
    }
    console.log(response);
    const id = response.data;
    const troco: number = data.valor - total;
    const res = await updateVendas(id, data, total, troco);
    if (!res) {
      setOpenSpinner(false);
      return console.log("Falha ao actualizar venda");
    }
    console.log(res);
    reset();
    location.href = "/vendas";
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(sendForm)}
        className="fixed top-1/3 left-1/3 flex p-2 gap-6 justify-center items-center flex-col flex-wrap rounded w-2/4 min-h-44 shadow shadow-gray-700 bg-gray-800 bg-opacity-80"
      >
        {openSpinner ? (
          <Spinner />
        ) : (
          <>
            <fieldset className="grid grid-cols-2 place-items-center gap-2 w-full flex-wrap">
              <span className="flex flex-col">
                <label className="text-white" htmlFor="nomeCliente">
                  Nome do Cliente
                </label>
                <input
                  {...register("nomeCliente")}
                  className="p-1 w-full outline-none border border-gray-600 rounded-md"
                  type="text"
                  placeholder="Ex: Pedro João"
                  id="nomeCliente"
                />
                {errors.nomeCliente && (
                  <span className="text-red-500 text-xs">
                    {errors.nomeCliente.message}
                  </span>
                )}
              </span>
              <span className="flex flex-col">
                <label className="text-white" htmlFor="valor">
                  Valor
                </label>
                <input
                  {...register("valor", { valueAsNumber: true })}
                  className="p-1 w-full outline-none border border-gray-600 rounded-md"
                  type="number"
                  min={100}
                  placeholder="0"
                  id="valor"
                />
                {errors.valor && (
                  <span className="text-red-500 text-xs">
                    {errors.valor.message}
                  </span>
                )}
              </span>
            </fieldset>
            {erro && (
              <span className="text-center text-red-500 text-xl">
                Valor insuficente ou a Venda não pode ser realizada!
              </span>
            )}
            <p className="text-white text-xl">
              Total: <span>{params.total}</span>
              <span className="text-sm">Kz</span>{" "}
            </p>
            <div className="flex gap-3 ">
              <button
                onClick={() => params.setOpen(false)}
                className=" rounded font-bold text-white bg-red-500 p-1 px-2 hover:bg-red-700 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className=" rounded font-bold text-white bg-green-500 p-1 px-2 hover:bg-green-700 transition-all"
              >
                Confirmar
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};
