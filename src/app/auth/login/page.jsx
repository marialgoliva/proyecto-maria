"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import Spinner from "react-bootstrap/Spinner";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: {errors}, clearErrors  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error){
      setErrorMessage(res.error);
    } else {
      setLoading(true);
      router.push('/admin/products');
      router.refresh();
    }


  })
  
  const onChange = () => {
    clearErrors("email");
    setErrorMessage("");
  }

  return (
    <div className="d-flex justify-content-center w-100">
      <form onSubmit={onSubmit} className="d-flex flex-column w-50 m-2 gap-2 w-1/4">
        <h1>Login</h1>
        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {errorMessage && (
            <span className="text-bg-danger px-1">{errorMessage}</span>
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
          placeholder="user@email.com"
          onChange={onChange}
          value='moondesign@gmail.com'
          
        />
        {errors.email && (
            <span className="text-bg-danger px-1">{errors.email.message}</span>
          )}
        <label htmlFor="email">Password: </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "La contraseña no puede estar vacia.",
            },
          })}
          placeholder="******"
          onChange={onChange}
          value='123456'
        />
        {errors.password && (
            <span className="text-bg-danger px-1">
              {errors.password.message}
            </span>
          )}
        <button>Iniciar sesión</button>
      </form>
    </div>
  );
}

export default LoginPage;
