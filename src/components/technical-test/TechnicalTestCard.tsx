import { TechnicalTest } from "../../types/TechnicalTest";
import XnixCalendar from "../../assets/xnix-calendar.svg";
import { asideContentForTechnicalTest } from "../Layout/aside/asideContent";
import { Link } from "react-router";
import testLevel1 from "../../assets/testsLevel.svg";
import testLevel2 from "../../assets/testsLevel2.svg";
import testLevel3 from "../../assets/testsLevel3.svg";
import { Clock, Heart } from "lucide-react";

interface TechnicalTestCardProps {
  test: TechnicalTest;
}

const getLevelIcon = (title: string) => {
  const hash = Array.from(title).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );

  const level = (hash % 3) + 1;

  if (level === 1) return testLevel1;
  if (level === 2) return testLevel2;
  return testLevel3;
};

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

  const levelIcon = getLevelIcon(test.title);

  return (
    <Link to={`/resources/technical-test/${test.id}`}>
      <li className="flex flex-col w-full py-4 px-4 rounded-2xl shadow-xs border border-[#7E7E7E] hover:bg-gray-100 transition-colors duration-100">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-1">
            <div>
              <img src={levelIcon} alt="Test level" className="mt-1" />
            </div>
            <div className="flex flex-col gap-1">
              <h3>
                <span className="text-lg font-bold text-black">
                  {test.title}
                </span>
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
    </Link>
  );
};

export default TechnicalTestCard;
