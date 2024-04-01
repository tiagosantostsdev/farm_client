import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateAdmin } from "../../services/adminServices";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { updateAdminSchema, updateAdminType } from "../Schema/admSchema";
import {
  updateFuncionarioSchema,
  updateFuncionarioType,
} from "../Schema/funcionarioSchema";
import { updateFuncionario } from "../../services/funcionariosService";
import {
  updateFornecedorSchema,
  updateFornecedorType,
} from "../Schema/fornecedorSchema";
import { updateFornecedores } from "../../services/fornecedoresService";
import {
  updateFabricanteSchema,
  updateFabricanteType,
} from "../Schema/fabricanteSchema";
import { updateFabricantes } from "../../services/fabricanteServices";
import {
  updateProdutosSchema,
  updateProdutosType,
} from "../Schema/produtoSchema";
import { updateProdutos } from "../../services/produtosService";
import { updateCarrinho } from "../../services/carrinhoService";
import { updateCarrinhoSchema, updateCarrinhoType } from "../Schema/carrinhoSchema";

export const EditModal = (params: Record<string, any>) => {
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateAdminType>({ resolver: zodResolver(updateAdminSchema) });

  async function sendForm(data: Record<string, any>) {
    if (user._id !== params.id) {
      alert("Somente o administrador logado pode alterar seus dados");
      return;
    }
    const response = await updateAdmin(params.id, data);
    if (!response) {
      return console.log("Falha ao alterar dados de administardor");
    }
    console.log(response);
    params.setOpenEdit(false);
  }

  return (
    <section className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-gray-700 bg-opacity-75">
      <form
        onSubmit={handleSubmit(sendForm)}
        className="flex p-2 gap-4 items-center flex-col flex-wrap rounded shadow shadow-gray-700  bg-gray-800"
      >
        <fieldset className="grid grid-cols-2 place-items-center gap-2 w-full flex-wrap">
          <input
            {...register("admin")}
            defaultValue={params.admin}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="text"
            placeholder="Ex: Orlando Miguel"
            id="admin"
          />
          {errors.admin && (
            <span className="text-red-500 text-xs">{errors.admin.message}</span>
          )}
          <input
            {...register("email")}
            defaultValue={params.email}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="email"
            placeholder="Ex: pedrojava@gmail.com"
            id="email"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
          <input
            {...register("telemovel")}
            defaultValue={params.telemovel}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="tel"
            placeholder="Ex: +244925000000"
            id="telemovel"
          />
          {errors.telemovel && (
            <span className="text-red-500 text-xs">
              {errors.telemovel.message}
            </span>
          )}
        </fieldset>
        <div className="flex gap-3">
          <button
            onClick={() => params.setOpenEdit(false)}
            className=" bg-red-500 p-1 rounded-md hover:bg-opacity-70"
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 p-1 rounded-md hover:bg-opacity-70"
            type="submit"
          >
            Salvar
          </button>
        </div>
      </form>
    </section>
  );
};

export const EditModalFunc = (params: Record<string, any>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateFuncionarioType>({
    resolver: zodResolver(updateFuncionarioSchema),
  });

  async function sendForm(data: Record<string, any>) {
    const response = await updateFuncionario(params.id, data);
    if (!response) {
      return console.log("Falha ao alterar dados de funcionário");
    }
    console.log(response);
    params.setOpenEditFunc(false);
  }

  return (
    <section className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-gray-700 bg-opacity-75">
      <form
        onSubmit={handleSubmit(sendForm)}
        className="flex p-2 gap-4 items-center flex-col flex-wrap rounded shadow shadow-gray-700  bg-gray-800"
      >
        <fieldset className="grid grid-cols-3 place-items-center gap-2 w-full flex-wrap">
          <input
            {...register("usuario")}
            defaultValue={params.usuario}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="text"
            placeholder="Ex: Orlando Miguel"
            id="usuario"
          />
          {errors.usuario && (
            <span className="text-red-500 text-xs">
              {errors.usuario.message}
            </span>
          )}

          <input
            {...register("email")}
            defaultValue={params.email}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="email"
            placeholder="Ex: orlandomiguel@gmail.com"
            id="email"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}

          <input
            {...register("telemovel")}
            defaultValue={params.telemovel}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="tel"
            placeholder="Ex: +244925000000"
            id="telemovel"
          />
          {errors.telemovel && (
            <span className="text-red-500 text-xs">
              {errors.telemovel.message}
            </span>
          )}

          <input
            {...register("endereco")}
            defaultValue={params.endereco}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="text"
            placeholder="Ex: Cacuaco/Luanda/Angola"
            id="endereco"
          />
          {errors.endereco && (
            <span className="text-red-500 text-xs">
              {errors.endereco.message}
            </span>
          )}
        </fieldset>
        <div className="flex gap-3">
          <button
            onClick={() => params.setOpenEditFunc(false)}
            className=" bg-red-500 p-1 rounded-md hover:bg-opacity-70"
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 p-1 rounded-md hover:bg-opacity-70"
            type="submit"
          >
            Salvar
          </button>
        </div>
      </form>
    </section>
  );
};

export const EditModalForn = (params: Record<string, any>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateFornecedorType>({
    resolver: zodResolver(updateFornecedorSchema),
  });

  async function sendForm(data: Record<string, any>) {
    const response = await updateFornecedores(params.id, data);
    if (!response) {
      return console.log("Falha ao alterar dados de fornecedor");
    }
    console.log(response);
    params.setOpenEditForn(false);
  }

  return (
    <section className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-gray-700 bg-opacity-75">
      <form
        onSubmit={handleSubmit(sendForm)}
        className="flex p-2 gap-4 items-center flex-col flex-wrap rounded shadow shadow-gray-700  bg-gray-800"
      >
        <fieldset className="grid grid-cols-3 place-items-center gap-2 w-full flex-wrap">
          <input
            {...register("nome")}
            defaultValue={params.nome}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="text"
            placeholder="Ex: Shalina"
            id="nome"
          />
          {errors.nome && (
            <span className="text-red-500 text-xs">{errors.nome.message}</span>
          )}

          <input
            {...register("endereco")}
            defaultValue={params.endereco}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="text"
            placeholder="Ex: Cacuaco/Luanda/Angola"
            id="endereco"
          />
          {errors.endereco && (
            <span className="text-red-500 text-xs">
              {errors.endereco.message}
            </span>
          )}

          <input
            {...register("telefone")}
            defaultValue={params.telefone}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="tel"
            placeholder="Ex: +244925000000"
            id="telefone"
          />
          {errors.telefone && (
            <span className="text-red-500 text-xs">
              {errors.telefone.message}
            </span>
          )}

          <input
            {...register("site")}
            defaultValue={params.site}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="url"
            placeholder="Ex: www.javafarm.com"
            id="site"
          />
        </fieldset>
        <div className="flex gap-3">
          <button
            onClick={() => params.setOpenEditForn(false)}
            className=" bg-red-500 p-1 rounded-md hover:bg-opacity-70"
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 p-1 rounded-md hover:bg-opacity-70"
            type="submit"
          >
            Salvar
          </button>
        </div>
      </form>
    </section>
  );
};

export const EditModalFabri = (params: Record<string, any>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateFabricanteType>({
    resolver: zodResolver(updateFabricanteSchema),
  });

  async function sendForm(data: Record<string, any>) {
    const response = await updateFabricantes(params.id, data);
    if (!response) {
      return console.log("Falha ao alterar dados de fornecedor");
    }
    console.log(response);
    params.setOpenEditFabri(false);
  }

  return (
    <section className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-gray-700 bg-opacity-75">
      <form
        onSubmit={handleSubmit(sendForm)}
        className="flex p-2 gap-4 items-center flex-col flex-wrap rounded shadow shadow-gray-700  bg-gray-800"
      >
        <fieldset className="grid grid-cols-3 place-items-center gap-2 w-full flex-wrap">
          <input
            {...register("nome")}
            defaultValue={params.nome}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="text"
            placeholder="Ex: Shalina"
            id="nome"
          />
          {errors.nome && (
            <span className="text-red-500 text-xs">{errors.nome.message}</span>
          )}

          <input
            {...register("endereco")}
            defaultValue={params.endereco}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="text"
            placeholder="Ex: Cacuaco/Luanda/Angola"
            id="endereco"
          />
          {errors.endereco && (
            <span className="text-red-500 text-xs">
              {errors.endereco.message}
            </span>
          )}

          <input
            {...register("telefone")}
            defaultValue={params.telefone}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="tel"
            placeholder="Ex: +244925000000"
            id="telefone"
          />
          {errors.telefone && (
            <span className="text-red-500 text-xs">
              {errors.telefone.message}
            </span>
          )}
        </fieldset>
        <div className="flex gap-3">
          <button
            onClick={() => params.setOpenEditFabri(false)}
            className=" bg-red-500 p-1 rounded-md hover:bg-opacity-70"
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 p-1 rounded-md hover:bg-opacity-70"
            type="submit"
          >
            Salvar
          </button>
        </div>
      </form>
    </section>
  );
};

export const EditModalProd = (params: Record<string, any>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateProdutosType>({
    resolver: zodResolver(updateProdutosSchema),
  });

  async function sendForm(data: Record<string, any>) {
    const response = await updateProdutos(params.id, data);
    if (!response) {
      return console.log("Falha ao alterar dados do produto");
    }
    console.log(response);
    params.setOpenEditProd(false);
  }

  return (
    <section className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-gray-700 bg-opacity-75">
      <form
        onSubmit={handleSubmit(sendForm)}
        className="flex p-2 gap-4 items-center flex-col flex-wrap rounded shadow shadow-gray-700  bg-gray-800"
      >
        <fieldset className="grid grid-cols-3 place-items-center gap-2 w-full flex-wrap">
          <input
            {...register("nome")}
            defaultValue={params.nome}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="text"
            placeholder="Ex: Paracetamol"
            id="nome"
          />
          {errors.nome && (
            <span className="text-red-500 text-xs">{errors.nome.message}</span>
          )}

          <input
            {...register("quantidade", { valueAsNumber: true })}
            defaultValue={params.quantidade}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="number"
            min={1}
            placeholder="0"
            id="quantidade"
          />
          {errors.quantidade && (
            <span className="text-red-500 text-xs">
              {errors.quantidade.message}
            </span>
          )}

          <input
            {...register("dosagem")}
            defaultValue={params.dosagem}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="text"
            placeholder="Ex: 500mg"
            id="dosagem"
          />
          {errors.dosagem && (
            <span className="text-red-500 text-xs">
              {errors.dosagem.message}
            </span>
          )}

          <input
            {...register("descricao")}
            defaultValue={params.descricao}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="text"
            placeholder="Ex: Injectavel ou Comprimido"
            id="descricao"
          />
          {errors.descricao && (
            <span className="text-red-500 text-xs">
              {errors.descricao.message}
            </span>
          )}

          <input
            {...register("preco", { valueAsNumber: true })}
            defaultValue={params.preco}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="number"
            min={100}
            placeholder="100"
            id="preco"
          />
          {errors.preco && (
            <span className="text-red-500 text-xs">{errors.preco.message}</span>
          )}
        </fieldset>
        <div className="flex gap-3">
          <button
            onClick={() => params.setOpenEditProd(false)}
            className=" bg-red-500 p-1 rounded-md hover:bg-opacity-70"
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 p-1 rounded-md hover:bg-opacity-70"
            type="submit"
          >
            Salvar
          </button>
        </div>
      </form>
    </section>
  );
};

export const EditModalCarr = (params: Record<string, any>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateCarrinhoType>({
    resolver: zodResolver(updateCarrinhoSchema),
  });

  async function sendForm(data: Record<string, any>) {
    const response = await updateCarrinho(params.id, data);
    console.log(data)
    if (!response) {
      return console.log("Falha ao actualizar produto, verifque o stock do produto");
    }
    console.log(response);
    params.setOpenEditCarr(false);
  }

  return (
    <section className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-gray-700 bg-opacity-75">
      <form
        onSubmit={handleSubmit(sendForm)}
        className="flex p-2 gap-4 items-center flex-col flex-wrap rounded shadow shadow-gray-700  bg-gray-800"
      >
        <fieldset className="grid grid-cols-1 place-items-center gap-2 w-full flex-wrap">
          <input
            {...register("quantidade", { valueAsNumber: true })}
            defaultValue={params.quantidade}
            className="p-1 w-full outline-none border border-gray-600 rounded-md"
            type="number"
            min={1}
            placeholder="0"
            id="quantidade"
          />
          {errors.quantidade && (
            <span className="text-red-500 text-xs">
              {errors.quantidade.message}
            </span>
          )}
        </fieldset>
        <div className="flex gap-3">
          <button
            onClick={() => params.setOpenEditCarr(false)}
            className=" bg-red-500 p-1 rounded-md hover:bg-opacity-70"
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 p-1 rounded-md hover:bg-opacity-70"
            type="submit"
          >
            Salvar
          </button>
        </div>
      </form>
    </section>
  );
};
