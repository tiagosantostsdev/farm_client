import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error: any = useRouteError();
  return (
    <>
      <section className="flex flex-col justify-center items-center gap-2 w-full h-screen bg-gray-300">
        <div className="w-2/4 bg-gray-400 rounded h-72 flex flex-col gap-1 justify-center items-center">
          <h1 className="text-5xl text-red-500">Oops!</h1>
          <p className="text-4xl">Error {error.message}</p>
          <h2 className="text-2xl">{error.status}</h2>
          <h3 className="text-3xl">{error.statusText}</h3>
        </div>
        <Link className="bg-blue-400 rounded text-white p-2" to={"/"}>
          Voltar
        </Link>
      </section>
    </>
  );
};
