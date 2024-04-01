import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { EditModalFabri } from "../modal/editModal";
import { ConfModalFabri } from "../modal/confirmModal";

export const TableRowFabricante = (params: Record<string, any>) => {
  const [open, setOpen] = useState(false);
  const [openEditFabri, setOpenEditFabri] = useState(false);

  return (
    <>
      {open && (
        <ConfModalFabri id={params.id} nome={params.nome} setOpen={setOpen} />
      )}
      {openEditFabri && (
        <EditModalFabri
          setOpenEditFabri={setOpenEditFabri}
          id={params.id}
          nome={params.nome}
          telefone={params.telefone}
          endereco={params.endereco}
        />
      )}
      <tr
        key={params.id}
        className="bg-white border-collapse border text-sm text-center"
      >
        <td className="border border-collapse">{params.nome}</td>
        <td className="border border-collapse">{params.nif}</td>
        <td className="border border-collapse">{params.pais}</td>
        <td className="border border-collapse">{params.endereco}</td>
        <td className="border border-collapse">{params.telefone}</td>
        <td className="border border-collapse">{params.email}</td>
        <td className="border border-collapse">{params.dataRegistro}</td>
        <td className="flex text-xl justify-evenly">
          <i className="text-red-600">
            <AiOutlineDelete onClick={() => setOpen(true)} />
          </i>
          <i>
            <AiOutlineEdit onClick={() => setOpenEditFabri(true)} />
          </i>
        </td>
      </tr>
    </>
  );
};
