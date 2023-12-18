import axios from "axios";
import { useSession } from "next-auth/react";

function useAxios(access_token = null) {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (access_token) {
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${access_token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;

      if (status === 500) {
        console.warn(status);
      }

      return Promise.reject(error);
    }
  );

  return { api: instance };
}

export default useAxios;
