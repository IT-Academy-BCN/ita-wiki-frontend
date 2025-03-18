import { FC } from "react";
import heart from "../../assets/svg/heart.svg";
import edit from "../../assets/svg/edit.svg";
interface FavoriteResourceProps {
  favorite: boolean;
}
export const FavoriteResource: FC<FavoriteResourceProps> = ({ favorite }) => {
  return (
    <div className="flex items-center justify-start gap-2 max-h-12">
      <img src={edit} width={28} height={28} alt="Icono editar" />
      <i data-testid="favorite-resource" className="inline-flex">
        {favorite ? (
          "❤"
        ) : (
          <img src={heart} width={28} height={28} alt="Icono corazon" />
        )}
      </i>
    </div>
  );
};
