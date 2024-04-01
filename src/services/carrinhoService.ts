import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URL;

export const findCarrinho = () => {
  const response = axios
    .get(`${baseURL}/carrinho`, {
      headers: { Authorization: `Bearer ${Cookies.get("tokenFunc")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const createCarrinho = (data: Record<string, any>) => {
  const response = axios
    .post(`${baseURL}/carrinho/create`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("tokenFunc")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const updateCarrinho = (id: string, data: Record<string, any>) => {
  const response = axios
    .patch(`${baseURL}/carrinho/update/${id}`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("tokenFunc")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const deleteCarrinho = (id: string) => {
  const response = axios
    .delete(`${baseURL}/carrinho/delete/${id}`, {
      headers: { Authorization: `Bearer ${"tokenFunc"}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};
