import { FC, Suspense, useEffect, useState } from "react";
import { getRole } from "../../../api/endPointRoles";
import { useUserCtx } from "../../../hooks/user/useUserCtx";
import ButtonComponent from "../../../components/atoms/ButtonComponent";
import { AddUsersModal } from "../../../components/resources/AddUserModal";
import { useRedirectTo } from "../../../hooks/useRedirectTo";
import Loading from "../../../components/Loading";

const DashBoard: FC = () => {
  const { goTo } = useRedirectTo();
  const { user } = useUserCtx();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const hasPermission = userRole
    ? ["superadmin", "admin", "mentor"].includes(userRole)
    : false;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (user && user.id) {
      getRole(user.id)
        .then((roleData) => {
          setUserRole(roleData?.role || null);
        })
        .catch((err) => {
          console.error("Error fetching role:", err);
          setUserRole(() => null);
        });
    } else {
      setUserRole(() => null);
    }
    if (user.role! !== "admin") {
      goTo("/");
    }
  }, [user]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-8 min-h-96">
        <h1 className="text-2xl font-bold">DashBoard</h1>
        <p className="text-lg">Welcome to the dashboard!</p>
        {hasPermission && user.role! === "admin" && (
          <ButtonComponent onClick={openModal} className="mt-4">
            Añadir Usuario
          </ButtonComponent>
        )}
        {isModalOpen && hasPermission && (
          <AddUsersModal
            onClose={closeModal}
            userRole={userRole}
            userID={user.id}
          />
        )}
      </div>
    </Suspense>
  );
};
export default DashBoard;
