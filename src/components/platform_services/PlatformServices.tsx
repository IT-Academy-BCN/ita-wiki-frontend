import folder from "../../assets/svg/new-folder-dynamic-color.svg";
import puzzle from "../../assets/svg/puzzle-dynamic-color.svg";
import ok from "../../assets/svg/thumb-up-dynamic-color.svg";

const PlatFormServices = () => {
  return (
    <article className="flex flex-col gap-20">
      <h2 className="text-stone-500 text-center">
        Funcionalidades básicas que te ofrece esta plataforma:
      </h2>
      <section className="flex flex-col xl:grid xl:grid-cols-3 xl:items-center xl:justify-items-center gap-20 xl:px-40">
        <article className="flex flex-col items-center justify-center">
          <span>/1</span>
          <img src={folder} alt="folder" width={100} height={100} />
          <h3>Guarda tus recursos favoritos</h3>
          <p>Ten tus recursos bien organizados</p>
        </article>
        <article className="flex flex-col items-center justify-center">
          <span>/2</span>
          <img src={puzzle} alt="puzzle" width={100} height={100} />
          <h3>Colabora con tus compañer@s</h3>
          <p>Recursos compartidos</p>
        </article>
        <article className="flex flex-col items-center justify-center">
          <span>/3</span>
          <img src={ok} alt="ok" width={100} height={100} />
          <h3>Vota los recursos</h3>
          <p>La comunidad decide cuáles son más relevantes</p>
        </article>
      </section>
    </article>
  );
};

export default PlatFormServices;
