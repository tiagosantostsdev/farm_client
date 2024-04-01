import { useState } from "react"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { EditModalForn } from "../modal/editModal"
import { ConfModalForn } from "../modal/confirmModal"

export const TableRowFornecedor = (params:Record<string, any>)=>{
  
  const [open, setOpen] = useState(false)
  const [openEditForn, setOpenEditForn] = useState(false)
  
  return (
        <>
        {open && <ConfModalForn
          id={params.id}
          setOpen={setOpen}
        />}
        {openEditForn && <EditModalForn
            setOpenEditForn={setOpenEditForn}
            id={params.id}
            nome={params.nome}
            telefone={params.telefone}
            endereco={params.endereco}
            site={params.site}
        />}
            <tr key={params.id} className="bg-white border-collapse border text-sm text-center">
              <td className="border border-collapse">{params.nome}</td>
              <td className="border border-collapse">{params.nif}</td>
              <td className="border border-collapse">{params.telefone}</td>
              <td className="border border-collapse">{params.endereco}</td>
              <td className="border border-collapse">{params.email}</td>
              <td className="border border-collapse">{params.site}</td>
              <td className="border border-collapse">{params.dataRegistro}</td>
              <td className="flex text-xl justify-evenly">
                <i className="text-red-600">
                  <AiOutlineDelete onClick={()=>setOpen(true)}/>
                </i>
                <i>
                  <AiOutlineEdit onClick={()=>setOpenEditForn(true)}/>
                </i>
              </td>
            </tr>
          </>
    )
}