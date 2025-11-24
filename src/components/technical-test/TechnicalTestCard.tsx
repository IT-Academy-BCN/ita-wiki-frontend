import { TechnicalTest } from "../../types/TechnicalTest";
import XnixCalendar from "../../assets/xnix-calendar.svg";
import { asideContentForTechnicalTest } from "../Layout/aside/asideContent";
import { Link } from "react-router";

interface TechnicalTestCardProps {
  test: TechnicalTest;
}

const TechnicalTestCard = ({ test }: TechnicalTestCardProps) => {
  const language = asideContentForTechnicalTest.find(
    (item) => item.label === test.language,
  );
  const IconComponent = language?.icon;

  return (
    <li className="flex flex-col w-full py-4 px-2 rounded-2xl shadow-xs border border-[#7E7E7E]">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 m-2">
          <h3 className="text-lg font-bold">
            <Link to={`/resources/technical-test/${test.id}`}>
              {test.title}
            </Link>
          </h3>
          <span className="text-sm text-gray-500 flex items-center gap-2">
            <img src={XnixCalendar} alt="XnixCalendar" />
            <p>{test.created_at}</p>
          </span>
        </div>
        {IconComponent && (
          <div className="flex gap-2 m-2">
            <span>
              <IconComponent />
            </span>
          </div>
        )}
      </div>
    </li>
  );
};

export default TechnicalTestCard;
