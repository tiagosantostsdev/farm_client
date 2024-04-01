import logo from "../../assets/logo.png";
import { Outlet, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
    <header className="flex w-full h-14 items-center fixed top-0 shadow-xl bg-slate-500 bg-opacity-70 px-4">
      <nav onClick={()=>{navigate("/home")}} className="flex items-center gap-1">
        <img className="cursor-pointer" width={38} src={logo} alt="logotipo de farmacia" />
        <h1 className="cursor-pointer text-2xl font-medium select-none">Farmácia da Banda</h1>
      </nav>
    </header>
    <Outlet/>
    </>
  );
};
