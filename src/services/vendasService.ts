import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URL;

export const findVendas = () => {
  const response = axios.get(`${baseURL}/vendas`).catch((error) => {
    response;
    return console.log({ message: error.message });
  });
  return response;
};

export const createVendas = (data: Record<string, any>) => {
  const response = axios
    .post(
      `${baseURL}/vendas/create/`,
      {
        nomeCliente: data.nomeCliente,
      },
      {
        headers: { Authorization: `Bearer ${Cookies.get("tokenFunc")}` },
      }
    )
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const updateVendas = (
  id: string,
  data: Record<string, any>,
  total: number,
  troco: number
) => {
  const response = axios
    .patch(
      `${baseURL}/vendas/update/${id}`,
      {
        valor: data.valor,
        total: total,
        troco: troco,
      },
      {
        headers: { Authorization: `Bearer ${Cookies.get("tokenFunc")}` },
      }
    )
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const deleteVendas = (id: string) => {
  const response = axios
    .delete(`${baseURL}/vendas/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};
