import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import PageTitle from "../components/ui/PageTitle";
import { getUserRole } from "../api/userApi";
import Container from "../components/ui/Container";
import resourcesSrc from "../assets/resources-items.svg";
import technicalSrc from "../assets/technical-item.svg";
import codeconnectSrc from "../assets/codeconnect-items.svg";
import rankingSrc from "../assets/ranking-items.svg";

export default function HomePage() {
  const { user } = useUserContext();
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
          console.error("Error fetching role:", err, userRole);
          setUserRole("anonymous");
          setLoading(false);
        });
    } else {
      setUserRole("anonymous");
      setLoading(false);
    }
  }, [user, userRole]);

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
      <Container className="!px-6 md:!px-10 xl:!px-20 2xl:!px-6">
        <div className="h-full flex flex-col justify-center">
          <header className="flex justify-center py-9">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-black font-bold text-center">
              Aprèn, pràctica i creix com a professional del desenvolupament
            </h1>
          </header>

          <main className="flex-1 grid grid-cols-1 md:grid-cols-2 w-fit 2xl:w-4/5 mx-auto py-6 md:grid-rows-2 gap-6">
            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center">
              <img
                src={resourcesSrc}
                className="max-h-[75%] w-90 mb-2 ml-3 object-contain transform transition duration-300 hover:scale-110"
              />
              <h2 className="font-semibold text-xl text-black mb-2 text-center">
                Descobreix recursos
              </h2>
              <p className="text-center text-sm text-black">
                Troba vídeos, tutorials i guies per seguir millorant
              </p>
            </section>

            <section className="bg-gray-50 border  border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center">
              <img
                src={technicalSrc}
                className="mb-4 max-h-[75%] w-100 object-contain transform transition duration-300 hover:scale-110"
              />
              <h2 className="font-semibold text-xl text-black mb-2 text-center">
                Entrena amb proves tècniques reals
              </h2>
              <p className="text-center text-sm text-black">
                Posa a prova les teves habilitats amb reptes del món real
              </p>
            </section>

            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center">
              <img
                src={codeconnectSrc}
                className="mb-4 max-h-[75%] w-102 2xl:w-120 object-contain transform transition duration-300 hover:scale-110"
              />
              <h2 className="font-semibold text-xl text-black mb-2 text-center">
                Col·labora en projectes
              </h2>
              <p className="text-center text-sm text-black">
                Uneix-te a equips i crea projectes reals junts
              </p>
            </section>

            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center">
              <img
                src={rankingSrc}
                className=" max-h-[75%] w-110 mb-3 pt-3 object-contain transform transition duration-300 hover:scale-110"
              />
              <h2 className="font-semibold text-xl text-black mb-3 text-center">
                Competeix i millora
              </h2>
              <p className="text-center text-sm text-black">
                Guanya punts, puja al rànquing i diverteix-te aprenent
              </p>
            </section>
          </main>
        </div>
      </Container>
    </>
  );
}
