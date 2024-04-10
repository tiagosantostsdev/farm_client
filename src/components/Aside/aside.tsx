import { BiLogOut } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdOutlineFactory } from "react-icons/md";
import { MdApproval } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaStoreAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { admLogged } from "../../services/adminServices";
import Cookies from "js-cookie";
import { loggedFuncionario } from "../../services/funcionariosService";

export const Aside = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [verify, setVerify] = useState(false);

  async function adminLogged() {
    const response = await admLogged();
    setUser(response.data);
  }

  function logged() {
    if (!Cookies.get("token")) {
      setVerify(true);
      return funcionarioLogged();
    }
    setVerify(false);
    adminLogged();
  }

  async function funcionarioLogged() {
    const response = await loggedFuncionario();
    setUser(response.data);
  }

  function logOut() {
    if (!Cookies.get("token")) {
      Cookies.remove("tokenFunc");
      setUser(undefined);
      navigate("/")
      return;
    }
    Cookies.remove("token");
    setUser(undefined);
    navigate("/")
  }

  useEffect(() => {
    logged();
  }, []);

  return (
    <div className=" fixed top-14  w-screen">
      <aside className="max-sm:w-[8.5rem] flex flex-col w-60 bg-white shadow-lg shadow-gray-400 h-full absolute ">
        <div className=" select-none flex flex-col items-center mt-3">
          <i className="text-6xl bg-gray-200 rounded-full w-20 h-20 flex justify-center items-center">
            <AiOutlineUser className="text-red-500" />
          </i>
          {verify ? (
            <span className="text-xl">Funcionário</span>
          ) : (
            <Link className="text-xl" to={"/admin"}>
              Administrador
            </Link>
          )}
          <p className="font-bold">
            {verify ? `${user.usuario}` : `${user.admin}`}
          </p>
        </div>
        <hr className="border self-center border-gray-400 w-full m-3" />
        <ul className="flex flex-col gap-3">
          <Link to={"/vendas"}>
            <li className=" select-none cursor-pointer flex w-full h-10 gap-1 items-center  hover:bg-green-600 transition-all">
              <i className="px-2">
                <FaStoreAlt />
              </i>
              Vendas
            </li>
          </Link>
          <Link to={"/produtos"}>
            <li className="select-none cursor-pointer flex w-full h-10 gap-1 items-center  hover:bg-green-600 transition-all">
              <i className="px-2">
                <MdOutlineProductionQuantityLimits />
              </i>
              Produtos
            </li>
          </Link>
          <Link className={`${user.usuario && `hidden`}`} to={"/fabricantes"}>
            <li className="select-none cursor-pointer flex  w-full h-10 gap-1 items-center  hover:bg-green-600 transition-all">
              <i className="px-2">
                <MdOutlineFactory />
              </i>
              Fabricantes
            </li>
          </Link>
          <Link className={`${user.usuario && `hidden`}`} to={"/fornecedores"}>
            <li className="select-none cursor-pointer flex w-full h-10 gap-1 items-center  hover:bg-green-600 transition-all">
              <i className="px-2">
                <MdApproval />
              </i>
              Fornecedores
            </li>
          </Link>

          <Link className={`${user.usuario && `hidden`}`} to={"/funcionarios"}>
            <li className="select-none cursor-pointer flex  w-full h-10 gap-1 items-center  hover:bg-green-600 transition-all">
              <i className="px-2">
                <FaUsers />
              </i>
              Funcionários
            </li>
          </Link>
          <li
            onClick={logOut}
            className="flex ml-1 items-center gap-1 text-red-600 cursor-pointer hover:text-red-900 select-none"
          >
            <i>
              <BiLogOut />
            </i>
            Sair
          </li>
        </ul>
      </aside>
      <Outlet />
    </div>
  );
};
