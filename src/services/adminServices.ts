import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URL

export const admSignIn = (data: Record<string, any>) => {
  const response: any = axios
    .post(`${baseURL}/auth/admin`, data)
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const admLogged = () => {
  const response: any = axios
    .get(`${baseURL}/admin/findadminbyid`, {
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

export const esqueciSenha = (data: Record<string, any>) => {
  const response = axios
    .post(`${baseURL}/admin/esqueci-a-senha`, data)
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const redefinirSenha = (data: Record<string, any>) => {
  delete data.confPassword;
  const email = Cookies.get("email");
  const response = axios
    .post(`${baseURL}/admin/redefinir-senha`, {
      email: email,
      codigo: data.codigo,
      password: data.password,
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  Cookies.remove("email");
  return response;
};

export const findAdmin = () => {
  const response = axios.get(`${baseURL}/admin/findadmin`).catch((error) => {
    response;
    return console.log({ message: error.message });
  });
  return response;
};

export const createAdmin = (data: Record<string, any>) => {
  const response: Record<string, any> = axios
    .post(`${baseURL}/admin/newadmin`, data)
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const deleteAdmin = (id: string) => {
  const response = axios
    .delete(`${baseURL}/admin/deleteadmin/${id}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};

export const updateAdmin = (id: string, data: Record<string, any>) => {
  const response = axios
    .patch(`${baseURL}/admin/updateadmin/${id}`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      response;
      return console.log({ message: error.message });
    });
  return response;
};
