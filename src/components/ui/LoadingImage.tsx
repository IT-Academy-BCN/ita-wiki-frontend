import { FC } from "react";
import loading from "../../assets/loading-png.png";

interface LoadingImageProps {
  text: string;
}

const LoadingImage: FC<LoadingImageProps> = ({ text }) => {
  return (
    <div>
      <img src={loading} alt="Cargando..." className="w-1/2" />
      <p> {text}</p>
    </div>
  );
};

export default LoadingImage;
