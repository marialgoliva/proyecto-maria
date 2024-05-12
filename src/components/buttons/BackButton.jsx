"use client";
import { useRouter } from "next/navigation";
import { CiShop } from "react-icons/ci";
import styles from "@/components/buttons/styles.module.css";

/**
 * Componente botón de retroceso
 * @component
 */
function BackButton() {
  const router = useRouter();

  /**
   * Función que se ejecuta cuando se hace clic en el botón
   */
  const onClick = () => {
    router.push("/../");
  };

  return (
    <div>
      <button onClick={onClick} className={styles.backButton}>
        <CiShop /> <p> Volver</p>
      </button>
    </div>
  );
}

export default BackButton;
