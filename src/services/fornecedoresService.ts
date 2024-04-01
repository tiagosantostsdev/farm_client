import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URL

export const createFornecedores = (data: Record<string, any>) => {
  const response = axios
    .post(`${baseURL}/fornecedores/novo`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const findFornecedores = () => {
  const response = axios
    .get(`${baseURL}/fornecedores`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const deleteFornecedores = (id: string) => {
  const response = axios
    .delete(`${baseURL}/fornecedores/delete/${id}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const updateFornecedores = (id: string, data: Record<string, any>) => {
  const response = axios
    .patch(`${baseURL}/fornecedores/update/${id}`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};
