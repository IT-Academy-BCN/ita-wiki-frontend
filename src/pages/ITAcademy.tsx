import { Main } from "../layouts/Main";
import PlatFormServices from "../components/platform_services/PlatformServices";
import Hero from "../components/hero/Hero";
import Welcome from "../components/welcome/Welcome";
import UserAccesBar from "../components/user/UserAccesBar";
import { Suspense } from "react";
import Loading from "../components/Loading";

export default function ITAcademy() {
  return (
    <Suspense fallback={<Loading />}>
      <Main>
        <section
          className={`h-full lg:rounded-[15px] col-start-1 col-end-4 overflow-x-hidden overflow-y-auto bg-white`}
        >
          <article className="flex flex-col gap-8 min-h-96">
            <Hero>
              <Welcome />
              <UserAccesBar />
            </Hero>
          </article>
          <PlatFormServices />
        </section>
      </Main>
    </Suspense>
  );
}
