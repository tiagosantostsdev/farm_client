import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URL

export const createFabricantes = (data: Record<string, any>) => {
  const response = axios
    .post(`${baseURL}/fabricantes/novo`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const findFabricantes = () => {
  const response = axios
    .get(`${baseURL}/fabricantes`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.mmessage });
    });
  return response;
};

export const updateFabricantes = (id: string, data: Record<string, any>) => {
  const response = axios
    .patch(`${baseURL}/fabricantes/update/${id}`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const deleteFabricantes = (id:string)=>{
    const response = axios
    .delete(`${baseURL}/fabricantes/delete/${id}`,{
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
}