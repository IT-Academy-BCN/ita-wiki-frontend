import { FC } from "react";
import PageTitle from "../components/ui/PageTitle";

const details = [
  {
    title: "TaskForge: forja tu productividad",
    description: `TaskForge es una aplicación web de gestión de tareas que convierte la productividad en una aventura. Cada usuario crea proyectos, completa misiones (tareas) y gana puntos de experiencia, niveles y logros.
                  El objetivo es aprender a trabajar con APIs, bases de datos y sistemas de autenticación mientras se practica diseño de interfaz, gestión de estado y metodologías ágiles.
                  En TaskForge, trabajar en equipo se siente como jugar una partida cooperativa: ¡tu productividad se forja a golpe de código!`,
    roadmap: [
      "Autenticación (F/B) — login, registro, tokens y guardas de ruta.",
      "Gestión de usuarios (B) — modelo, roles y endpoints básicos.",
      "Visualización del dashboard (F) — resumen de tareas, progreso y XP.",
      "CRUD de proyectos (F/B) — crear, listar, editar y eliminar proyectos.",
      "CRUD de tareas (F/B) — operaciones básicas de tareas con estados.",
      "Detalle de tarea (F/B) — vista individual con descripción, estado y comentarios.",
      "Sistema de niveles y experiencia (B) — lógica de puntos y subida de nivel.",
      "Visualización de XP y logros (F) — barra de progreso y badges dinámicos.",
    ],
  },
];

const CodeConnectDetails: FC = () => {
  const { title, description, roadmap } = details[0];

  return (
    <>
      <PageTitle title={title} />
      <div className="w-full max-w-screen-xl px-4 pb-4 mx-auto grow lg:flex-1 gap-x-6 sm:bg-white lg:bg-transparent">
        <div className="flex flex-col lg:flex-row lg:flex-grow lg:overflow-y-auto bg-white lg:rounded-xl px-4 lg:px-8 py-4 sm:py-6">
          <div className="lg:flex-1 overflow-y-auto h-[calc(100vh-90px)] px-4 py-6 lg:pl-8 xl:pl-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <h2 className="text-[26px] font-extrabold text-left mb-10">
                  {title}
                </h2>
<p className="text-[16px] mb-20 whitespace-pre-line">{description}</p>                <h3 className="text-[22px] font-extrabold mb-5">Roadmap</h3>
                <ol className="list-decimal list-inside">
                  {roadmap.map((item, index) => (
                    <li key={index} className="text-[16px] mb-2">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="lg:w-1/3">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeConnectDetails;
