import React from "react";
import { IntUser } from "../../types";
import { useUser } from "../../hooks/useUser";

type WelcomeProps = {
  user?: IntUser;
};

const Welcome: React.FC<WelcomeProps> = () => {
  const { user } = useUser();
  return (
    <section>
      <h1 className="font-bold">
        ¡Bienvenido{user && ` ,${user.displayName}`} a la wiki de la IT Academy!
      </h1>
      <p>Este es el componente de bienvenida.</p>
    </section>
  );
};

export default Welcome;
