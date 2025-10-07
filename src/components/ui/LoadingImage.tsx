import { FC } from "react";
import loading from "../../assets/loading-png.png";

interface LoadingImageProps {
  text: string;
}

const LoadingImage: FC<LoadingImageProps> = ({ text }) => {
  return (
    <div className="text-center">
      <img src={loading} alt="Cargando..." className="mx-auto" />
      <p> {text}</p>
    </div>
  );
};

export default LoadingImage;