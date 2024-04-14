import { Link } from "react-router-dom";
import { Label } from "../../components/Labels/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createFuncionarioSchema,
  createFuncionarioType,
} from "../../components/Schema/funcionarioSchema";
import { useEffect, useState } from "react";
import {
  createFuncionario,
  findFuncionarios,
} from "../../services/funcionariosService";
import { TableRowFuncionario } from "../../components/TableRows/tableRowFunc";

export const Funcionarios = () => {
  const [error, setError] = useState(false);
  const [genero, setGenero] = useState("");
  const [func, setFunc] = useState([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<createFuncionarioType>({
    resolver: zodResolver(createFuncionarioSchema),
  });

  async function sendForm(data: Record<string, any>) {
    if (genero === "") {
      return setError(true);
    }
    const response = await createFuncionario(genero, data);
    if (!response) {
      return console.log(response);
    }
    setError(false);
    reset();
  }

  async function getFuncionarios() {
    const response = await findFuncionarios();
    if (!response) {
      return console.log("Falha ao buscar funcionários");
    }
    setFunc(response.data);
  }

  useEffect(() => {
    getFuncionarios();
  }, [sendForm]);

  return (
    <section className="bg-gray-100 flex flex-col ml-60 max-sm:ml-[8.5rem] h-screen p-4">
      <div className="mb-4">
        <h1 className="font-bold">Dashboard</h1>
        <Link to={"/funcionarios"} className="text-blue-700">
          Funcionarios
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(sendForm)}
        className="flex p-2 gap-4 items-center flex-col flex-wrap rounded w-full shadow shadow-gray-700 min-h-52 bg-white"
      >
        <fieldset className="grid grid-cols-3 place-items-center gap-2 w-full flex-wrap">
          <span className="flex flex-col">
            <Label id="usuario" text="Nome de funcionário" />
            <input
              {...register("usuario")}
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
          </span>

          <span className="flex flex-col">
            <Label id="email" text="Email" />
            <input
              {...register("email")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="email"
              placeholder="Ex: orlandomiguel@gmail.com"
              id="email"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </span>

          <span className="flex flex-col">
            <Label id="dataNascimento" text="Data de nascimento" />
            <input
              {...register("dataNascimento")}
              className="p-1 w-full max-sm:w-[5rem] outline-none border border-gray-600 rounded-md"
              type="date"
              id="dataNascimento"
            />
            {errors.dataNascimento && (
              <span className="text-red-500 text-xs">
                {errors.dataNascimento.message}
              </span>
            )}
          </span>

          <span className="flex flex-col">
            <Label id="telemovel" text="Telemovel" />
            <input
              {...register("telemovel")}
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
          </span>

          <span className="flex flex-col">
            <Label id="senha" text="Senha" />
            <input
              {...register("senha")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="password"
              placeholder="sua senha"
              id="senha"
            />
            {errors.senha && (
              <span className="text-red-500 text-xs">
                {errors.senha.message}
              </span>
            )}
          </span>

          <span className="flex flex-col">
            <Label id="genero" text="Gênero" />
            <select
              defaultValue={"Selecione"}
              onChange={(e) => setGenero(e.target.value)}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
            >
              <option disabled value={"Selecione"}>
                Selecione
              </option>
              <option value={"Masculino"}>Masculino</option>
              <option value={"Feminino"}>Feminino</option>
            </select>
            {error && (
              <span className="text-red-500 text-xs">Selecione o gênero</span>
            )}
          </span>

          <span className="flex flex-col">
            <Label id="endereco" text="Endereco" />
            <input
              {...register("endereco")}
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
          </span>

          <span className="flex flex-col">
            <Label id="nif" text="NIF" />
            <input
              {...register("nif")}
              className="p-1 w-full outline-none border border-gray-600 rounded-md"
              type="tel"
              placeholder="Ex: 265655LA3"
              id="nif"
            />
            {errors.nif && (
              <span className="text-red-500 text-xs">{errors.nif.message}</span>
            )}
          </span>
        </fieldset>
        <div className="flex gap-2">
          <button
            type="reset"
            className=" rounded font-bold text-[16px] text-white bg-gray-500 p-1 px-2 hover:bg-gray-700 transition-all"
          >
            Limpar
          </button>
          <button
            type="submit"
            className=" rounded font-bold text-[16px] text-white bg-green-500 p-1 px-2 hover:bg-green-700 transition-all"
          >
            Adicionar
          </button>
        </div>
      </form>

      <div className="overflow-x-auto overflow-y-auto max-h-[30rem]">
        <table className="w-full border border-gray-400">
          <caption className="font-bold m-2">Tabela de Funcionários</caption>
          <thead className="bg-gray-500 text-white font-bold h-10">
            <tr>
              <th className="border">Funcionário</th>
              <th className="border">NIF</th>
              <th className="border">Data de nascimento</th>
              <th className="border">Gênero</th>
              <th className="border">Email</th>
              <th className="border">Telemovel</th>
              <th className="border">Endereço</th>
              <th className="border">Data de registro</th>
              <th className="border">Acção</th>
            </tr>
          </thead>
          <tbody>
          {func.map((item: Record<string, any>) => (
            <TableRowFuncionario
              key={item._id}
              id={item._id}
              usuario={item.usuario}
              nif={item.nif}
              endereco={item.endereco}
              telemovel={item.telemovel}
              email={item.email}
              genero={item.genero}
              dataNascimento={item.dataNascimento}
              dataRegistro={item.dataRegistro}
            />
          ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
