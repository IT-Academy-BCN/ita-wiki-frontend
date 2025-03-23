import GitHubLogin from "../components/github-login/GitHubLogin";
import { useUserCtx } from "../hooks/useUserCtx";
import { AddUsersModal } from "../components/resources/AddUserModal";
import ButtonComponent from "../components/atoms/ButtonComponent";
import Page from "../layouts/body/content/page/Page";
import Body from "../layouts/body/Body";
import Hero from "../components/hero/Hero";
import Access from "../components/access/Access";
import { usePermissions } from "../hooks/usePermisions";
import PlatFormServices from "../components/platform_services/PlatformServices";
import { useGlobalCtx } from "../hooks/useGlobalCtx";
import { EnuModalKeys } from "../enums";

export default function ITAcademy() {
  const { signOut, user, signIn, error } = useUserCtx();
  const { userRole, hasPermission } = usePermissions();
  const { modals, closeModal, openModal } = useGlobalCtx();

  return (
    <Body>
      <Page>
        <section className={`bg-white lg:rounded-[15px] w-full p-8`}>
          <Hero>
            <h1 className="font-bold">
              ¡Bienvenid@ a la wiki de la IT Academy!
            </h1>
            <Access>
              {user ? (
                <article
                  id={String(user.id)}
                  className="flex justify-evenly items-center gap-4 mt-4 py-2 px-4 rounded-md bg-black text-white mx-auto"
                >
                  <img
                    src={user.photoURL}
                    alt="Avatar usuario"
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-white"
                  />
                  <div className="flex flex-col divide-y-2">
                    <small
                      className="font-bold"
                      style={{ textTransform: "uppercase" }}
                    >
                      {user.displayName}
                    </small>
                    <small
                      className="font-bold"
                      style={{ textTransform: "uppercase" }}
                    >
                      {user.role}
                    </small>
                  </div>
                  <button
                    className="bg-white text-red-500 text-sm font-bold active:scale-95 py-1 px-4 rounded-sm border-2 border-black"
                    type="button"
                    onClick={signOut}
                  >
                    Exit
                  </button>
                </article>
              ) : (
                <article>
                  <span className="text-[#7E7E7E] text-[16px]">
                    Registrate o haz login para poder subir y votar recursos
                  </span>
                  <div className="flex flex-col max-w-[320px] gap-4">
                    <GitHubLogin onClick={signIn} />
                    {error && (
                      <div className="error-message text-red-500 my-4">
                        {error}
                      </div>
                    )}
                  </div>
                </article>
              )}
            </Access>
          </Hero>
          {hasPermission && (
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
              <ButtonComponent
                onClick={() => openModal(EnuModalKeys.ADD_USER)}
                className="mt-4"
              >
                Añadir Usuario
              </ButtonComponent>
            </div>
          )}
          <PlatFormServices />
        </section>
        {modals.addUser && hasPermission && (
          <>
            <AddUsersModal
              onClose={() => closeModal(EnuModalKeys.ADD_USER)}
              userRole={userRole}
              userID={user.id}
            />
          </>
        )}
      </Page>
    </Body>
  );
}
