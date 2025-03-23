import React from "react";
import { IntUser } from "../../types";
import { useUser } from "../../hooks/useUser";

type WelcomeProps = {
  user?: IntUser;
};

const Welcome: React.FC<WelcomeProps> = () => {
  const { user } = useUser();
  return (
    <section className="flex items-center justify-center h-40 p-4">
      {user ?
        <h1 className="text-center font-bold">
          ¡Bienvenido {user.displayName} a la wiki de la IT Academy!
        </h1> : <h1 className="font-bold text-center ">
          ¡Bienvenido a la wiki de la IT Academy!
        </h1>}
    </section>
  );
};

export default Welcome;
