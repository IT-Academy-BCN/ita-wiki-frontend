import folder from "../assets/new-folder-dynamic-color.svg";
import puzzle from "../assets/puzzle-dynamic-color.svg";
import ok from "../assets/thumb-up-dynamic-color.svg";
import { useCtxUser } from "../hooks/useCtxUser";
import { useCallback, useEffect, useState } from "react";
import ButtonComponent from "../components/atoms/ButtonComponent";
import Card from "../components/ui/Card";
import { useNavigate } from "react-router";
import PageTitle from "../components/ui/PageTitle";
import { getUserRole } from "../api/userApi";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useCtxUser();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      getUserRole(user.id)
        .then((role) => {
          setUserRole(role || "anonymous");
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching role:", err);
          setUserRole("anonymous");
          setLoading(false);
        });
    } else {
      setUserRole("anonymous");
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user || !userRole) return;

    if (["anonymous", "student", "mentor"].includes(userRole)) {
      navigate("/resources");
    } else if (["admin", "superadmin"].includes(userRole)) {
      navigate("/admin-dashboard");
    }
  }, [user, userRole, navigate]);

  const handleNavigate = useCallback(() => {
    navigate("/resources/React");
  }, [navigate]);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </main>
    );
  }

  return (
    <div className="h-full flex overflow-hidden flex-col">
      <PageTitle title="" />
      <main className="flex-1 bg-white rounded-xl flex flex-col items-center justify-center mx-6 gap-10 mb-6 text-center">
        <h1 className="font-bold text-3xl">
          ¡Bienvenid@ a la wiki de la IT Academy!
        </h1>
        <div>
          <ButtonComponent onClick={handleNavigate}>
            Ver Recursos
          </ButtonComponent>
        </div>
        <h2>Funcionalidades básicas que te ofrece esta plataforma:</h2>
        <section className="flex flex-col gap-8 items-center md:items-stretch md:flex-row">
          <Card
            number={1}
            imageSource={folder}
            imageAlt="folder"
            title="Guarda tus recursos favoritos"
            text="Ten tus recursos bien organizados"
          />
          <Card
            number={2}
            imageSource={puzzle}
            imageAlt="puzzle"
            title="Colabora con tus compañer@s"
            text="Recursos compartidos"
          />
          <Card
            number={3}
            imageSource={ok}
            imageAlt="ok"
            title="Vota los recursos"
            text="La comunidad decide cuáles son más relevantes"
          />
        </section>
      </main>
    </div>
  );
}
