"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignOutButton() {
  const router = useRouter();
  const signOutHandler = () => {
    signOut();
    router.push("../");
  };
  return (
    <button
      className="bg-white text-black border rounded px-3 me-5"
      onClick={signOutHandler}
    >
      Cerrar sesión
    </button>
  );
}

export default SignOutButton;
