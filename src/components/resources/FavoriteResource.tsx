import { FC } from "react"
import heart from "../../assets/heart.svg"
import edit from "../../assets/edit.svg"
interface FavoriteResourceProps {
  favorite: boolean
}
export const FavoriteResource: FC<FavoriteResourceProps> = ({ favorite }) => {
  return (
    <div className="flex items-center justify-start gap-2 max-h-12">
      <img src={edit} width={28} height={28} />
      <i role="resource"
        data-testid="favorite-resource"
        className="inline-flex">{
          favorite ? '❤' : <img src={heart} width={28} height={28} />
        }
      </i>
    </div>
  )
}
