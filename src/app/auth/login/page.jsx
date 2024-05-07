"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "react-bootstrap/Spinner";

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

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setLoading(true);
      router.push("/");
      router.refresh();
    }
  });

  const onChange = () => {
    clearErrors("email");
    setErrorMessage("");
  };

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
