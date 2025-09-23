import { TechnicalTest } from "../../types/TechnicalTest";
import XnixCalendar from "../../assets/xnix-calendar.svg";
import { asideContentForTechnicalTest } from "../Layout/aside/asideContent";

interface TechnicalTestCardProps {
  test: TechnicalTest;
}

const TechnicalTestCard = ({ test }: TechnicalTestCardProps) => {
  const language = asideContentForTechnicalTest.find(
    (item) => item.label === test.language,
  );
  const IconComponent = language?.icon as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  return (
    <div className="flex flex-col w-full py-4 px-2 rounded-2xl shadow-xs border border-[#7E7E7E]">
      <li className="flex justify-between">
        <div className="flex flex-col gap-2 m-2">
          <h3 className="text-lg font-bold">{test.title}</h3>
          <span className="text-sm text-gray-500">
            <img src={XnixCalendar} alt="XnixCalendar" /> 23 Julio 2025
          </span>
        </div>
        <div className="flex gap-2 m-2">
          <span>
            <IconComponent />
          </span>
        </div>
      </li>
    </div>
  );
};

export default TechnicalTestCard;
