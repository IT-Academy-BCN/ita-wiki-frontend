import { FC } from "react";

const ErrorAccess: FC<{ loginError: boolean }> = ({ loginError }) => {
  return (
    loginError && (
      <div className="text-red-500 text-sm mt-2">
        <div className="text-red-500 text-sm mt-2 text-center">
          Lo sentimos, no se ha podido iniciar sesión,
          <br /> contacte con el administrador.
        </div>
      </div>
    )
  );
};

export default ErrorAccess;
