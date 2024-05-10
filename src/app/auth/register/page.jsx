"use client";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function RegisterPage() {
  //Define el estado del mensaje de error y el estado de éxito
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  //Función onSubmit que se ejecuta cuando se envía el formulario
  const onSubmit = handleSubmit(async (data) => {
    //Limpia el mensaje de error
    setErrorMessage("");
    //Comprueba si las contraseñas coinciden
    if (data.password !== data.cPass) {
      setErrorMessage("Las contraseñas no coinciden");
    } else {
      //Intenta registrar al usuario con los datos proporcionados
      try {
        const res = await axios.post("/api/auth/register", {
          dni: data.dni,
          nombre: data.nombre,
          apellidos: data.apellidos,
          email: data.email,
          username: data.username,
          password: data.password,
        });
        //Si el registro es exitoso, establece el estado de éxito a true
        if (res.status == 200) {
          setSuccess(true);
        }
        //Si hay un error, establece el mensaje de error al mensaje de error proporcionado por el servidor
      } catch (e) {
        setErrorMessage(e.response.data.message);
      }
    }
  });

  //Función onClick que se ejecuta cuando se hace clic en el botón de inicio de sesión
  const onClick = () => {
    //Redirige al usuario a la página de inicio de sesión
    router.push("/auth/login");
    setSuccess(false);
  };
  //Renderiza el formulario de registro
  return (
    <div className="d-flex justify-content-center w-100 mtop">
      {success ? (
        <div className="m-4 d-flex flex-column gap-2">
          <h2 className="bigtitle">Usuario registrado con éxito</h2>
          <button
            onClick={onClick}
            className="btn btn-dark w-100 mt-3 mb-4 font-monospace"
          >
            Iniciar sesión
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="d-flex flex-column w-50 m-2 gap-4">
          <h2 className="bigtitle">Registrate para consultar tus pedidos</h2>
          {/* Muestra el mensaje de error si hay un error */}
          {errorMessage && (
            <div>
              <div className="alert alert-warning mt-2 " role="alert">
                {errorMessage}
              </div>
            </div>
          )}

          <input
            className="rounded p-2 border-1"
            type="text"
            // Registra el campo de entrada DNI con las reglas de validación
            {...register("dni", {
              required: {
                value: true,
                message: "El DNI no puede estar vacio.",
              },
              pattern: {
                value: /^[0-9]{8}[A-Za-z]$/,
                message:
                  "Formato del DNI inválido. Debe contener 8 dígitos seguidos de una letra.",
              },
            })}
            placeholder="Identificación (DNI/NIE)"
          />
          {/* Muestra el mensaje de error si hay un error. Se realiza igual para el resto de campos.*/}
          {errors.dni && (
            <div>
              <div className="alert alert-warning mt-2 " role="alert">
                {errors.dni.message}
              </div>
            </div>
          )}

          <input
            className="rounded p-2 border-1"
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
            <div>
              <div className="alert alert-warning mt-2 " role="alert">
                {errors.nombre.message}
              </div>
            </div>
          )}

          <input
            className="rounded p-2 border-1"
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
            <div>
              <div className="alert alert-warning mt-2 " role="alert">
                {errors.apellidos.message}
              </div>
            </div>
          )}

          <input
            className="rounded p-2 border-1"
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
            <div>
              <div className="alert alert-warning mt-2 " role="alert">
                {errors.username.message}
              </div>
            </div>
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
            placeholder="Dirección de e-mail"
          />

          {errors.email && (
            <div>
              <div className="alert alert-warning mt-2 " role="alert">
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
                message: "Debe introducir una contraseña.",
              },
            })}
            placeholder="Contraseña"
          />

          {errors.password && (
            <div>
              <div className="alert alert-warning mt-2 " role="alert">
                {errors.password.message}
              </div>
            </div>
          )}

          <input
            className="rounded p-2 border-1"
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
            <div>
              <div className="alert alert-warning mt-2 " role="alert">
                {errors.cPass.message}
              </div>
            </div>
          )}

          <button className="btn btn-dark w-100 mt-3 mb-4 font-monospace">
            Registrarse
          </button>
        </form>
      )}
    </div>
  );
}

export default RegisterPage;
