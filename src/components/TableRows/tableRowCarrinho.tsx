import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { ConfModalCarr } from "../modal/confirmModal";

export const TableRowCarrinho = (params: Record<string, any>) => {
  const [open, setOpen]=useState(false)

  return (
    <>
    {open && <ConfModalCarr
      setOpen={setOpen}
      nome={params.nome}
      id={params.id}
    />}
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
            <AiOutlineDelete className="cursor-pointer" onClick={()=> setOpen(true)} />
          </i>
        </td>
      </tr>
    </>
  );
};
