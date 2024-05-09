"use client";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
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
        <IoIosArrowBack className="fs-5" />
      </button>
    </div>
  );
}

export default BackButton;
