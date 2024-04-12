"use client";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

function BackButton() {
  const router = useRouter();
  const onClick = () => {
    router.push("/../");
  };
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-transparent border-0 text-secondary"
      >
        <IoIosArrowBack className="fs-3" />
      </button>
    </div>
  );
}

export default BackButton;
