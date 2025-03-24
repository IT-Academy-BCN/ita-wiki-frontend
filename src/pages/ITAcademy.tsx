import { useUserCtx } from "../hooks/user/useUserCtx";
import { useState, useEffect } from "react";
import { AddUsersModal } from "../components/resources/AddUserModal";
import ButtonComponent from "../components/atoms/ButtonComponent";
import { getRole } from "../api/endPointRoles";
import { Main } from "../layouts/Main";
import PlatFormServices from "../components/platform_services/PlatformServices";
import Hero from "../components/hero/Hero";
import Welcome from "../components/welcome/Welcome";
import UserAccesBar from "../components/user/UserAccesBar";

export default function ITAcademy() {
  const { user } = useUserCtx();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.id) {
      getRole(user.id)
        .then((roleData) => {
          setUserRole(roleData?.role || null);
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

  return (
    <Main>
      <section
        className={`h-full lg:rounded-[15px] col-start-1 col-end-4 overflow-x-hidden overflow-y-auto bg-white`}
      >
        <article className="flex flex-col gap-8 min-h-96">
          <Hero>
            <Welcome />
            <UserAccesBar />
          </Hero>
          {hasPermission && (
            <ButtonComponent onClick={openModal} className="mt-4">
              Añadir Usuario
            </ButtonComponent>
          )}
        </article>
        <PlatFormServices />
      </section>
      {isModalOpen && hasPermission && (
        <AddUsersModal
          onClose={closeModal}
          userRole={userRole}
          userID={user.id}
        />
      )}
    </Main>
  );
}
