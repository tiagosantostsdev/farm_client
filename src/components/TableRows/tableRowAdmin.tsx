import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { ConfModal } from "../modal/confirmModal";
import { EditModal } from "../modal/editModal";

export const TableRowAdmin = (params: Record<string, any>) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      {open && <ConfModal setOpen={setOpen} id={params.id} admin={params.admin}/>} 
      {openEdit && <EditModal setOpenEdit={setOpenEdit} id={params.id} admin={params.admin} email={params.email} telemovel={params.telemovel}/>} 
        <tr className="bg-white border-collapse border text-sm text-center" key={params.id}>
          <td className="border border-collapse">{params.admin}</td>
          <td className="border border-collapse">{params.email}</td>
          <td className="border border-collapse">{params.telemovel}</td>
          <td className="  flex text-xl justify-center gap-3">
            <i className="text-red-600">
              <AiOutlineDelete onClick={() => setOpen(true)} />
            </i>
            <i>
              <AiOutlineEdit onClick={()=>setOpenEdit(true)}/>
            </i>
          </td>
        </tr>
    </>
  );
};
