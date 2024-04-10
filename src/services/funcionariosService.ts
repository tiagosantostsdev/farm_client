import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URL

export const findFuncionarios = () => {
  const response = axios
    .get(`${baseURL}/funcionarios/`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const createFuncionario = (
  genero: string,
  data: Record<string, any>
) => {
  const response = axios
    .post(
      `${baseURL}/funcionarios/novo`,
      {
        usuario: data.usuario,
        senha: data.senha,
        nif: data.nif,
        endereco: data.endereco,
        telemovel: data.telemovel,
        email: data.email,
        genero: genero,
        dataNascimento: data.dataNascimento,
      },
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    )
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const esqueciSenhaFunc = (data: Record<string, any>) => {
  const response = axios
    .post(`${baseURL}/funcionarios/esqueci-a-senha`, data)
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const redefinirSenhaFunc = (data: Record<string, any>) => {
  delete data.confPassword;
  const email = Cookies.get("email");
  const response = axios
    .post(`${baseURL}/funcionarios/redefinir-senha`, {
      email: email,
      codigo: data.codigo,
      senha: data.password,
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  Cookies.remove("email");
  return response;
};

export const updateFuncionario = (id: string, data: Record<string, any>) => {
  const response = axios
    .patch(`${baseURL}/funcionarios/update/${id}`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      console.log({ message: error.message });
    });
  return response;
};

export const deleteFuncionario = (id: string) => {
  const response = axios
    .delete(`${baseURL}/funcionarios/delete/${id}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      console.log({ message: error.message });
    });
  return response;
};

export const loginFuncionario = (data: Record<string, any>) => {
  const response: any = axios
    .post(`${baseURL}/auth/funcionarios`, data)
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const loggedFuncionario = () => {
  const response: any = axios
    .get(`${baseURL}/funcionarios/findbyid`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("tokenFunc")}`,
      },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};
