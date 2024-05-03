"use client";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import styles from "@/components/buttons/styles.module.css";

function BackButton() {
  const router = useRouter();
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
