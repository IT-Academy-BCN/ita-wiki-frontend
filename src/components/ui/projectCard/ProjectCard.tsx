interface ProjectCardProps {
  logoSrc?: string;
  avatarSrc?: string;
}
function ProjectCard({ logoSrc, avatarSrc }: ProjectCardProps) {
  return (
    <div className="relative flex flex-col border items-start w-64 lg:w-52 xl:w-78 px-5 rounded-3xl py-4">
      <h1 className="font-bold text-lg text-start">
        TaskForge: forja tu productividad
      </h1>
      <span className="text-sm font-bold text-gray-500">Duración: 1 mes</span>
      <div className="flex mt-5">
        <div className="grid grid-cols-2 gap-2 justify-items-center border-r border-gray-300">
          <div>
            <h2 className="text-sm font-bold">Frontend</h2>
          </div>
          <div>
            <img className="w-6" src={logoSrc} alt="Logo" />
          </div>
          <figure className="">
            <img src={avatarSrc} alt="Logo" />
            <figcaption className="text-xs font-bold text-gray-500">Natasha</figcaption>
          </figure>
          <figure className="">
            <img src={avatarSrc} alt="Logo" />
            <figcaption className="text-xs font-bold text-gray-500">Natasha</figcaption>
          </figure>
          <figure className="">
            <img src={avatarSrc} alt="Logo" />
            <figcaption className="text-xs font-bold text-gray-500">Natasha</figcaption>
          </figure>
        </div>
        <div className="grid grid-cols-2 justify-items-center border-l border-gray-300 gap-3">
          <div>
            <h2 className="text-sm font-bold">Backend</h2>
          </div>
          <div>
            <img className="w-6" src={logoSrc} alt="Logo" />
          </div>
          <figure className="">
            <img src={avatarSrc} alt="Logo" />
            <figcaption className="text-xs font-bold text-gray-500">Natasha</figcaption>
          </figure>
          <figure className="">
            <img src={avatarSrc} alt="Logo" />
            <figcaption className="text-xs font-bold text-gray-500">Natasha</figcaption>
          </figure>
          <figure className="">
            <img src={avatarSrc} alt="Logo" />
            <figcaption className="text-xs font-bold text-gray-500">Natasha</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
