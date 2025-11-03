import { FC } from "react";
import PageTitle from "../components/ui/PageTitle";
import moockData from "../moock/projectDetails.json";
import ProjectTeam from "../components/ui/projectTeam/ProjectTeam";

import react from "../assets/react.svg";
import php from "../assets/logo-php 1.svg";
import avatar1 from "../assets/project-avatar.svg";
import avatar2 from "../assets/project-avatar2.svg";
import avatar3 from "../assets/project-avatar3.svg";

const CodeConnectDetails: FC = () => {
  const { title, description, roadmap } = moockData.details[0];
  return (
    <>
      <PageTitle title={title} />
      <div className="w-full px-4 pb-4 grow lg:flex-1 gap-x-6 sm:bg-white lg:bg-transparent">
        <div className="flex flex-col lg:flex-row w-full lg:flex-grow lg:overflow-y-auto bg-white lg:rounded-xl px-4 lg:px-8 py-4 sm:py-6">
          <div className="lg:flex-1 overflow-y-auto h-[calc(100vh-90px)] px-4 py-6 lg:pl-8 xl:pl-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <h2 className="text-[26px] font-extrabold text-left mb-10">
                  {title}
                </h2>
                <p className="text-[16px] mb-20 whitespace-pre-line">
                  {description}
                </p>{" "}
                <h3 className="text-[22px] font-extrabold mb-5">Roadmap</h3>
                <ol className="list-decimal list-inside">
                  {(roadmap || []).map((item, index) => (
                    <li key={index} className="text-[16px] mb-2">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="lg:w-1/3">
                <ProjectTeam
                  logoFront={react}
                  logoBack={php}
                  avatarSrc={avatar1}
                  avatarSrc2={avatar2}
                  avatarSrc3={avatar3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeConnectDetails;
