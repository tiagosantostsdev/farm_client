import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { EditModalCarr } from "../modal/editModal";
import { deleteCarrinho } from "../../services/carrinhoService";

export const TableRowCarrinho = (params: Record<string, any>) => {
  const [openEditCarr, setOpenEditCarr] = useState(false);

  async function remove() {
    const response = await deleteCarrinho(params.id);
    if (!response) {
      return console.log("Erro ao remover item do carrinho");
    }
    console.log(response.data);
  }

  return (
    <>
      {openEditCarr && (
        <EditModalCarr
          setOpenEditCarr={setOpenEditCarr}
          id={params.id}
          nome={params.nome}
          quantidade={params.quantidade}
          dosagem={params.dosagem}
          descricao={params.descricao}
          preco={params.preco}
        />
      )}
      <tr
        key={params.id}
        className="bg-white border-collapse border text-sm text-center"
      >
        <td className="border border-collapse">{params.nome}</td>
        <td className="border border-collapse">{params.quantidade}</td>
        <td className="border border-collapse">{params.descricao}</td>
        <td className="border border-collapse">{params.dosagem}</td>
        <td className="flex text-xl justify-evenly">
          <i className="text-red-600">
            <AiOutlineDelete onClick={remove} />
          </i>
          <i>
            <AiOutlineEdit onClick={() => setOpenEditCarr(true)} />
          </i>
        </td>
      </tr>
    </>
  );
};
