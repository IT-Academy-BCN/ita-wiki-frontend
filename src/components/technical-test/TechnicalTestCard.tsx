import { TechnicalTest } from "../../types/TechnicalTest";
import XnixCalendar from "../../assets/xnix-calendar.svg";
import { asideContentForTechnicalTest } from "../Layout/aside/asideContent";
import { Link } from "react-router";
import testLevel from "../../assets/tests-level.svg";
import { Clock, Heart } from "lucide-react";

interface TechnicalTestCardProps {
  test: TechnicalTest;
}

const TechnicalTestCard = ({ test }: TechnicalTestCardProps) => {
  const language = asideContentForTechnicalTest.find(
    (item) => item.label === test.language,
  );
  const IconComponent = language?.icon;

  const formattedDate =
    typeof test.updated_at === "string" && isNaN(Date.parse(test.updated_at))
      ? test.updated_at
      : test.updated_at
        ? new Date(test.updated_at).toLocaleDateString("ca-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "Data desconeguda";

  const likeCount = test.like_count ?? 0;

  return (
    <li className="flex flex-col w-full py-4 px-4 rounded-2xl shadow-xs border border-[#7E7E7E]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-1">
          <div>
            <img src={testLevel} alt="Test level" className="mt-1" />
          </div>
          <div className="flex flex-col gap-1">
            <h3>
              <Link to={`/resources/technical-test/${test.id}`}>
                <span className="text-lg font-bold text-black hover:text-primary transition-colors duration-300">
                  {test.title}
                </span>
              </Link>
            </h3>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-500 mt-2 sm:mt-2">
              <span className="flex items-center gap-1">
                <Clock size={16} />
                <span>30 min</span>
              </span>
              <span className="flex items-center gap-1">
                <Heart size={16} />
                <span>{likeCount}</span>
              </span>
              <span className="flex items-center gap-1">
                <img src={XnixCalendar} alt="XnixCalendar" />
                <span>{formattedDate}</span>
              </span>
            </div>
          </div>
        </div>
        {IconComponent && (
          <div className="flex items-center justify-start sm:justify-center w-10 h-10 mt-2 sm:mt-0">
            <IconComponent />
          </div>
        )}
      </div>
    </li>
  );
};

export default TechnicalTestCard;
