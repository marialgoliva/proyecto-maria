"use client";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage("");

    if (data.password !== data.cPass) {
      setErrorMessage("Las contraseñas no coinciden");
    }
    try {
      const res = await axios.post("/api/auth/register", {
        dni: data.dni,
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email,
        username: data.username,
        password: data.password,
      });
      if (res.status == 200) {
        setSuccess(true);
      }
    } catch (e) {
      setErrorMessage(e.response.data.message);
    }
  });

  const onClick = () => {
    router.push("/auth/login");
    setSuccess(false);
  };
  return (
    <div className="d-flex justify-content-center w-100">
      {success ? (
        <div className="m-4 d-flex flex-column gap-2">
          <h2>Usuario registrado con éxito</h2>
          <button
            onClick={onClick}
            className="btn border border-dark text-bg-light py-2 px-3 rounded"
          >
            Iniciar sesión
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="d-flex flex-column w-50 m-2 gap-2">
          <h2>Registrar un usuario</h2>
          {errorMessage && (
            <span className="text-bg-danger px-1">{errorMessage}</span>
          )}
          <label htmlFor="dni">DNI: </label>
          <input
            type="text"
            {...register("dni", {
              required: {
                value: true,
                message: "El DNI no puede estar vacio.",
              },
            })}
            placeholder="Identificación - DNI - NIE ..."
          />
          {errors.dni && (
            <span className="text-bg-danger px-1">{errors.dni.message}</span>
          )}

          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: "El nombre no puede estar vacio.",
              },
            })}
            placeholder="Nombre"
          />
          {errors.nombre && (
            <span className="text-bg-danger px-1">{errors.nombre.message}</span>
          )}

          <label htmlFor="apellidos">Apellidos: </label>
          <input
            type="text"
            {...register("apellidos", {
              required: {
                value: true,
                message: "Los apellidos no pueden estar vacios.",
              },
            })}
            placeholder="Apellidos"
          />
          {errors.apellidos && (
            <span className="text-bg-danger px-1">
              {errors.apellidos.message}
            </span>
          )}

          <label htmlFor="username">Usuario: </label>
          <input
            type="text"
            {...register("username", {
              required: {
                value: true,
                message: "El username no puede estar vacio.",
              },
            })}
            placeholder="Nombre de usuario"
          />
          {errors.username && (
            <span className="text-bg-danger px-1">
              {errors.username.message}
            </span>
          )}

          <label htmlFor="email">Email: </label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "El email no puede estar vacio.",
              },
            })}
            placeholder="Dirección de e-mail"
          />

          {errors.email && (
            <span className="text-bg-danger px-1">{errors.email.message}</span>
          )}

          <label htmlFor="password">Contraseña: </label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Debe introducir una contreña.",
              },
            })}
            placeholder="Contraseña"
          />

          {errors.password && (
            <span className="text-bg-danger px-1">
              {errors.password.message}
            </span>
          )}

          <label htmlFor="cPass">Confirma contraseña: </label>
          <input
            type="password"
            {...register("cPass", {
              required: {
                value: true,
                message: "Repita la contraseña.",
              },
            })}
            placeholder="Repita contraseña"
          />

          {errors.cPass && (
            <span className="text-bg-danger px-1">{errors.cPass.message}</span>
          )}

          <button>Registrarse</button>
        </form>
      )}
    </div>
  );
}

export default RegisterPage;
