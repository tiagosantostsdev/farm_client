import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findProdutos } from "../../services/produtosService";
import { findVendas } from "../../services/vendasService";
import { findFornecedores } from "../../services/fornecedoresService";
import { UserContext } from "../../context/UserContext";

export const Main = () => {
  const {user}=useContext(UserContext)
  const [data, setData] = useState([]);
  const [dataProd, setDataProd] = useState([]);
  const [dataForn, setDataForn] = useState([]);

  async function getLength() {
    const response = await findVendas();
    if(!response){
      return console.log("Falha ao buscar vendas")
    }
    setData(response.data);
    const respo = await findProdutos();
    if(!respo){
      return console.log("Falha ao buscar produtos")
    }
    setDataProd(respo.data);
    const res = await findFornecedores();
    if(!res){
      return console.log("Falha ao buscar fornecedores")
    }
    setDataForn(res.data);
  }

  useEffect(() => {
    getLength();
  }, []);

  return (
    <>
      <section className=" bg-gray-100 flex flex-col ml-60 h-screen p-4">
        <div className="flex w-full justify-between">
          <div className="mb-4">
            <h1 className="font-bold">Dashboard</h1>
            <Link to={"/home"} className="text-blue-700">
              Home
            </Link>
          </div>
          {user.usuario && <Link
            to={"/novavenda"}
            className="flex items-center rounded text-white bg-red-500 h-8 p-2"
          >
            <p>Nova venda</p>
          </Link>}
        </div>
        <div className="grid grid-cols-3 place-items-center w-full gap-3 flex-row">
          <div className="bg-green-500 w-2/3 h-20 rounded p-2">
            <p className="text-center text-lg tracking-wide leading-6 text-gray-800 font-bold">
              Vendas
            </p>
            <p className="text-center font-medium text-white text-lg">{data.length}</p>
          </div>
          <div className="bg-orange-500 w-2/3 h-20 rounded p-2">
            <p className="text-center text-lg tracking-wide leading-6 text-gray-800 font-bold">
              Produtos
            </p>
            <p className="text-center font-medium text-white text-lg">{dataProd.length}</p>
          </div>
          <div className="bg-gray-500 w-2/3 h-20 rounded p-2">
            <p className="text-center text-lg tracking-wide leading-6 text-gray-800 font-bold">
              Fornecedores
            </p>
            <p className="text-center font-medium text-white text-lg">{dataForn.length}</p>
          </div>
        </div>
      </section>
    </>
  );
};
