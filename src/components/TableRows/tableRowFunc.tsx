import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { ConfModalFunc } from "../modal/confirmModal";
import { useContext, useState } from "react";
import { EditModalFunc } from "../modal/editModal";
import { UserContext } from "../../context/UserContext";

export const TableRowFuncionario = (params: Record<string, any>) => {
  const [open, setOpen] = useState(false);
  const [openEditFunc, setOpenEditFunc] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <>
      {open && (
        <ConfModalFunc
          setOpen={setOpen}
          id={params.id}
          usuario={params.usuario}
        />
      )}
      {openEditFunc && (
        <EditModalFunc
          setOpenEditFunc={setOpenEditFunc}
          id={params.id}
          usuario={params.usuario}
          telemovel={params.telemovel}
          endereco={params.endereco}
          email={params.email}
        />
      )}

      <tr
        className="bg-white border-collapse border text-sm text-center"
        key={params.id}
      >
        <td className="border border-collapse">{params.usuario}</td>
        <td className="border border-collapse">{params.nif}</td>
        <td className="border border-collapse">{params.dataNascimento}</td>
        <td className="border border-collapse">{params.genero}</td>
        <td className="border border-collapse">{params.email}</td>
        <td className="border border-collapse">{params.telemovel}</td>
        <td className="border border-collapse">{params.endereco}</td>
        <td className="border border-collapse">{params.dataRegistro}</td>
        <td
          className={`flex text-xl justify-center gap-3  ${
            user.usuario && `hidden`
          } `}
        >
          <i className="text-red-600">
            <AiOutlineDelete onClick={() => setOpen(true)} />
          </i>
          <i>
            <AiOutlineEdit onClick={() => setOpenEditFunc(true)} />
          </i>
        </td>
      </tr>
    </>
  );
};
