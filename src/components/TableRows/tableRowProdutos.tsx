import { useContext, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { EditModalProd } from "../modal/editModal";
import { ConfModalProd } from "../modal/confirmModal";
import { UserContext } from "../../context/UserContext";

export const TableRowProdutos = (params: Record<string, any>) => {
  const [open, setOpen] = useState(false);
  const [openEditProd, setOpenEditProd] = useState(false);
  const {user} = useContext(UserContext)

  return (
    <>
      {open && <ConfModalProd id={params.id} setOpen={setOpen} />}
      {openEditProd && (
        <EditModalProd
          setOpenEditProd={setOpenEditProd}
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
        <td className="border border-collapse">{params.dosagem}</td>
        <td className="border border-collapse">{params.descricao}</td>
        <td className="border border-collapse">{params.preco}</td>
        <td className="border border-collapse">{params.fornecedor}</td>
        <td className="border border-collapse">{params.fabricante}</td>
        <td className="border border-collapse">{params.dataRegistro}</td>
        {user.admin && <td className="flex text-xl justify-evenly">
          <i className="text-red-600">
            <AiOutlineDelete onClick={() => setOpen(true)} />
          </i>
          <i>
            <AiOutlineEdit onClick={() => setOpenEditProd(true)} />
          </i>
        </td>}  
      </tr>
    </>
  );
};
