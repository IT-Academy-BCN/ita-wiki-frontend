import { TechnicalTest } from "../../types/TechnicalTest";
import Angular from "../../assets/angular.svg";
import Java from "../../assets/logo-java 1.svg";

interface TechnicalTestCardProps {
  test: TechnicalTest;
}

const TechnicalTestCard = ({ test }: TechnicalTestCardProps) => {
  return (
    <div className="flex flex-col w-full py-4 px-2 rounded-2xl shadow-xs border border-[#7E7E7E]">
      <li className="flex justify-between">
        <div className="flex flex-col gap-2 m-2">
          <h3 className="text-lg font-bold">{test.title}</h3>
          <span className="text-sm text-gray-500">🗓️ 23 Julio 2025</span>
        </div>
        <div className="flex gap-2 m-2">
          <span>
            <img src={Angular} alt="Angular" />
          </span>
          <span>
            <img src={Java} alt="Java" />
          </span>
        </div>
      </li>
    </div>
  );
};

export default TechnicalTestCard;
