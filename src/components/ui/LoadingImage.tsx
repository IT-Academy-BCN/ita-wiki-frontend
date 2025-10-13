import { FC } from "react";
import loading from "../../assets/loading-png.png";

interface LoadingImageProps {
  text: string;
}

const LoadingImage: FC<LoadingImageProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center w-150 mt-20">
      <img src={loading} alt="Cargando..." className="w-1/4" />
      <h1 className="font-black">{text}</h1>
      <p className="text-gray-500 text-sm mt-2">
        Prepárate para poner a prueba tu código y tus habilidades
      </p>
    </div>
  );
};

export default LoadingImage;
