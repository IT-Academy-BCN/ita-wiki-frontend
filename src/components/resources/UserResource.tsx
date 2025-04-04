import { FC } from "react";
import { IntUser, TypChildren } from "../../types";
interface UserResourceProps {
  user: IntUser;
}

export const UserResource: FC<TypChildren & UserResourceProps> = ({
  children,
  user,
}) => {
  return (
    <div data-testid="user-resource" className="flex gap-2 items-center ">
      <img
        src={user.photoURL}
        alt="User avatar"
        width={28}
        height={28}
        className="rounded-full w-[28px] h-[28px]"
      />
      <h3 className="text-[#808080] font-bold text-[12px]">
        {user.displayName}
      </h3>
      {children}
    </div>
  );
};
