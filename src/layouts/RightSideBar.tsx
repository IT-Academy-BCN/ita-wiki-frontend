import { FC } from "react";
import { useUserCtx } from "../hooks/user/useUserCtx";
import { getPersonalResources } from "../api/userApi";
import layoutCSS from "./css/layout.module.css";
import { IntResource } from "../types";
import { ListMyResources } from "../components/resources/ListMyResources";

interface RightSideBarProps {
  resources: IntResource[];
}

const RightSideBar: FC<RightSideBarProps> = ({ resources }) => {
  const { user } = useUserCtx();
  const personalResources = getPersonalResources(user, resources);

  return (
    <section className={`${layoutCSS.rightSideBar} flex flex-col lg:pr-6`}>
      <article className="bg-white sm:rounded-xl px-4 py-6 ">
        <h3 className="text-[22px] font-bold">Lista de lectura</h3>
      </article>
      {user && personalResources.length > 0 && (
        <ListMyResources myResources={personalResources} />
      )}
    </section>
  );
};

export default RightSideBar;
