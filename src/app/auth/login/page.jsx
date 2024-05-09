"use client";
/**
 * Importa varias utilidades de React y Next.js, así como un componente Spinner de react-bootstrap.
 */
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "react-bootstrap/Spinner";

/**
 * Componente de página de inicio de sesión.
 *
 * Este componente maneja el formulario de inicio de sesión del usuario, incluyendo la validación del formulario y el manejo de errores.
 * Utiliza el hook useForm de react-hook-form para manejar el estado del formulario y la validación.
 * Utiliza el hook useState de React para manejar el estado del mensaje de error y el estado de carga.
 * Utiliza la función signIn de next-auth/react para iniciar sesión del usuario.
 * Utiliza el hook useRouter de next/navigation para redirigir al usuario después de iniciar sesión con éxito.
 *
 * @returns {JSX.Element} El elemento JSX del formulario de inicio de sesión.
 */
function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const router = useRouter();

  // Función onSubmit que se ejecuta cuando se envía el formulario
  const onSubmit = handleSubmit(async (data) => {
    // Intenta iniciar sesión con las credenciales proporcionadas
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      // Si no hay errores, establece la carga a true y redirige al usuario a la página de inicio
      setLoading(true);
      router.push("/");
      router.refresh();
    }
  });

  //Función onChange que se ejecuta cuando cambia el valor del campo de entrada
  const onChange = () => {
    // Limpia los errores del campo de email y establece el mensaje de error a una cadena vacía
    clearErrors("email");
    setErrorMessage("");
  };

  // Renderiza el formulario de inicio de sesión
  return (
    <div className="d-flex justify-content-center w-100">
      <form
        onSubmit={onSubmit}
        className="d-flex flex-column w-50 m-2 gap-2 w-1/4"
      >
        <h1 className="bigtitle">Iniciar sesión</h1>
        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {errorMessage && (
          <span className="text-bg-danger px-1">{errorMessage}</span>
        )}

        <input
          className="rounded p-2 border-1"
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "El email no puede estar vacio.",
            },
          })}
          placeholder="Introduce tu email registrado"
          onChange={onChange}
        />
        {errors.email && (
          <div>
            <div class="alert alert-warning mt-2 " role="alert">
              {errors.email.message}
            </div>
          </div>
        )}

        <input
          className="rounded p-2 border-1"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "La contraseña no puede estar vacia.",
            },
          })}
          placeholder="Introduce tu contraseña"
          onChange={onChange}
        />
        {errors.password && (
          <div>
            <div class="alert alert-warning mt-2 " role="alert">
              {errors.password.message}
            </div>
          </div>
        )}
        <button className="btn btn-dark w-100 mt-3 mb-4 font-monospace">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
