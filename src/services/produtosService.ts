import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URL

export const findProdutos = () => {
  const response = axios.get(`${baseURL}/produtos`).catch((error) => {
    response;
    return console.log({ message: error.message });
  });
  return response;
};

export const createProdutos = (data: Record<string, any>) => {
  const response = axios
    .post(`${baseURL}/produtos/novo`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const updateProdutos = (id: string, data: Record<string, any>) => {
  const response = axios
    .patch(`${baseURL}/produtos/update/${id}`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const deleteProdutos = (id: string) => {
  const response = axios
    .delete(`${baseURL}/produtos/delete/${id}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};
