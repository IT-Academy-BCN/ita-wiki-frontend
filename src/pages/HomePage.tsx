import folder from "../assets/new-folder-dynamic-color.svg";
import puzzle from "../assets/puzzle-dynamic-color.svg";
import ok from "../assets/thumb-up-dynamic-color.svg";
import { useCtxUser } from "../hooks/useCtxUser";
import { useCallback } from "react";
import ButtonComponent from "../components/atoms/ButtonComponent";
import Card from "../components/ui/Card";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useCtxUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.id) {
      getUserRole(user.id)
        .then((roleData) => {
          setUserRole(roleData || null);
        })
        .catch((err) => {
          console.error("Error fetching role:", err);
          setUserRole(null);
        });
    } else {
      setUserRole(null);
    }
  }, [user]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const hasPermission = userRole
    ? ["superadmin", "admin", "mentor"].includes(userRole)
    : false;

  const handleNavigate = useCallback(() => {
    navigate("/resources/React");
  }, []);

  return (
    <>
      <PageTitle title="" />
      <main className="bg-white rounded-xl flex flex-col items-center justify-center w-full gap-10 mx-6 p-10 mb-6 text-center">
        <h1 className="font-bold text-3xl">
          ¡Bienvenid@ a la wiki de la IT Academy!
        </h1>
        <section>
          <article className="flex flex-col p-1">
            {hasPermission && (
              <ButtonComponent onClick={openModal} className="mt-4">
                Añadir Usuario
              </ButtonComponent>
            )}
          </article>
          <div>
            <div className="w-full flex flex-col items-center justify-center gap-10">
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
          </div>
        </section>
      </main>
    </>
  );
}
