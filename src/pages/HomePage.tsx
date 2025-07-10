import folder from "../assets/new-folder-dynamic-color.svg";
import puzzle from "../assets/puzzle-dynamic-color.svg";
import ok from "../assets/thumb-up-dynamic-color.svg";
import { useUserContext } from "../context/UserContext";
import { useCallback, useEffect, useState } from "react";
import ButtonComponent from "../components/atoms/ButtonComponent";
import Card from "../components/ui/Card";
import { useNavigate } from "react-router";
import PageTitle from "../components/ui/PageTitle";
import { getUserRole } from "../api/userApi";
import Container from "../components/ui/Container";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const DEFAULT_CATEGORY = "React";

  useEffect(() => {
    if (user && user.id) {
      getUserRole(user.id)
        .then((role) => {
          setUserRole(role || "anonymous");
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching role:", err, userRole);
          setUserRole("anonymous");
          setLoading(false);
        });
    } else {
      setUserRole("anonymous");
      setLoading(false);
    }
  }, [user, userRole]);

  const handleNavigate = useCallback(() => {
    navigate(`/resources/${DEFAULT_CATEGORY}`);
  }, [navigate]);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </main>
    );
  }

  return (
    <>
      <PageTitle title="" />
      <Container className="!px-6">
        <div className="flex flex-col gap-10 justify-center items-center h-full text-center">
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
        </div>
      </Container>
    </>
  );
}
