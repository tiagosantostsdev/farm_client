import { useContext } from "react";
import { deleteAdmin } from "../../services/adminServices";
import { UserContext } from "../../context/UserContext";
import { deleteFuncionario } from "../../services/funcionariosService";
import { deleteFornecedores } from "../../services/fornecedoresService";
import { deleteFabricantes } from "../../services/fabricanteServices";
import { deleteProdutos } from "../../services/produtosService";

export const ConfModal = (params: Record<string, any>) => {
  const { user } = useContext(UserContext);

  async function sendForm(e: any) {
    e.preventDefault();
    if (user._id === params.id) {
      params.setOpen(false);
      alert("Não pode se auto deletar!");
      return;
    }
    const response = await deleteAdmin(params.id);
    if (!response) {
      return console.log(response);
    }
    params.setOpen(false);
  }

  return (
    <section className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-gray-700 bg-opacity-75">
      <form
        onSubmit={sendForm}
        className="flex flex-col gap-3 items-center bg-gray-800 p-7 rounded"
      >
        <p className="text-cyan-50">
          Tem certeza de que quer eliminar o administrador {params.admin}?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => params.setOpen(false)}
            className=" bg-red-500 p-1 rounded-md hover:bg-opacity-70"
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 p-1 rounded-md hover:bg-opacity-70"
            type="submit"
          >
            Confirmar
          </button>
        </div>
      </form>
    </section>
  );
};

export const ConfModalFunc = (params: Record<string, any>) => {
  async function sendForm(e: any) {
    e.preventDefault();
    const response = await deleteFuncionario(params.id);
    if (!response) {
      return console.log(response);
    }
    params.setOpen(false);
  }

  return (
    <section className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-gray-700 bg-opacity-75">
      <form
        onSubmit={sendForm}
        className="flex flex-col gap-3 items-center bg-gray-800 p-7 rounded"
      >
        <p className="text-cyan-50">
          Tem certeza de que quer eliminar o Funcionário {params.usuario}?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => params.setOpen(false)}
            className=" bg-red-500 p-1 rounded-md hover:bg-opacity-70"
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 p-1 rounded-md hover:bg-opacity-70"
            type="submit"
          >
            Confirmar
          </button>
        </div>
      </form>
    </section>
  );
};

export const ConfModalForn = (params: Record<string, any>) => {
  async function sendForm(e: any) {
    e.preventDefault();
    const response = await deleteFornecedores(params.id);
    if (!response) {
      return console.log(response);
    }
    params.setOpen(false);
  }

  return (
    <section className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-gray-700 bg-opacity-75">
      <form
        onSubmit={sendForm}
        className="flex flex-col gap-3 items-center bg-gray-800 p-7 rounded"
      >
        <p className="text-cyan-50">
          Tem certeza de que quer eliminar o fornecedor {params.nome}?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => params.setOpen(false)}
            className=" bg-red-500 p-1 rounded-md hover:bg-opacity-70"
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 p-1 rounded-md hover:bg-opacity-70"
            type="submit"
          >
            Confirmar
          </button>
        </div>
      </form>
    </section>
  );
};

export const ConfModalFabri = (params: Record<string, any>) => {
  async function sendForm(e: any) {
    e.preventDefault();
    const response = await deleteFabricantes(params.id);
    if (!response) {
      return console.log(response);
    }
    params.setOpen(false);
  }

  return (
    <section className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-gray-700 bg-opacity-75">
      <form
        onSubmit={sendForm}
        className="flex flex-col gap-3 items-center bg-gray-800 p-7 rounded"
      >
        <p className="text-cyan-50">
          Tem certeza de que quer eliminar a fabricante {params.nome}?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => params.setOpen(false)}
            className=" bg-red-500 p-1 rounded-md hover:bg-opacity-70"
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 p-1 rounded-md hover:bg-opacity-70"
            type="submit"
          >
            Confirmar
          </button>
        </div>
      </form>
    </section>
  );
};

export const ConfModalProd = (params: Record<string, any>) => {
  async function sendForm(e: any) {
    e.preventDefault();
    const response = await deleteProdutos(params.id);
    if (!response) {
      return console.log(response);
    }
    params.setOpen(false);
  }

  return (
    <section className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-gray-700 bg-opacity-75">
      <form
        onSubmit={sendForm}
        className="flex flex-col gap-3 items-center bg-gray-800 p-7 rounded"
      >
        <p className="text-cyan-50">
          Tem certeza de que quer eliminar este produto {params.nome}?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => params.setOpen(false)}
            className=" bg-red-500 p-1 rounded-md hover:bg-opacity-70"
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 p-1 rounded-md hover:bg-opacity-70"
            type="submit"
          >
            Confirmar
          </button>
        </div>
      </form>
    </section>
  );
};