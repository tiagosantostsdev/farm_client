import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar/navbar.tsx";
import { Main } from "./pages/home/homePage.tsx";
import { Login } from "./pages/login/loginPage.tsx";
import { Aside } from "./components/Aside/aside.tsx";
import { Venda } from "./pages/venda/vendaPage.tsx";
import { Produtos } from "./pages/produtos/produtosPage.tsx";
import { Fornecedor } from "./pages/fornecedor/fornecedor.tsx";
import { Fabricante } from "./pages/fabricante/fabricante.tsx";
import { Funcionarios } from "./pages/funcionarios/funcionario.tsx";
import { LoginFunc } from "./pages/login/loginPageFunc.tsx";
import UserProvider from "./context/UserContext.tsx";
import { EsqueciASenha } from "./pages/redefinirSenha/esqueci_a_senha.tsx";
import { RedefinirASenha } from "./pages/redefinirSenha/redefinir_a_senha.tsx";
import { Admin } from "./pages/admin/admin.tsx";
import { NovaVenda } from "./pages/venda/novaVenda.tsx";
import Cookies from "js-cookie";
import { ErrorPage } from "./pages/errorPage/errorPage.tsx";
import { RedefinirASenhaFunc } from "./pages/redefinirSenha/redefinir_a_senhFunc.tsx";
import { EsqueciASenhaFunc } from "./pages/redefinirSenha/esqueci_a_senhaFunc.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/auth/funcionario", element: <LoginFunc /> },
      { path: "/funcionario/esqueci-a-senha", element: <EsqueciASenhaFunc /> },
      { path: "/funcionario/redefinir-senha", element: <RedefinirASenhaFunc /> },
      { path: "/admin/esqueci-a-senha", element: <EsqueciASenha /> },
      { path: "/admin/redefinir-senha", element: <RedefinirASenha /> },
      Cookies.get("token") || Cookies.get("tokenFunc")
        ? {
            path: "/",
            element: <Aside />,
            children: [
              { path: "/home", element: <Main /> },
              { path: "/admin", element: <Admin /> },
              { path: "/novavenda", element: <NovaVenda /> },
              { path: "/vendas", element: <Venda /> },
              { path: "/produtos", element: <Produtos /> },
              { path: "/fornecedores", element: <Fornecedor /> },
              { path: "/fabricantes", element: <Fabricante /> },
              { path: "/funcionarios", element: <Funcionarios /> },
            ],
          }
        : { errorElement: <ErrorPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
