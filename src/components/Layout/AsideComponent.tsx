import { Link, useLocation } from "react-router";
import classNames from "classnames";

type AsideItem = {
  icon: string;
  label: string;
};

type AsideComponentProps = {
  asideContent: AsideItem[];
};

const AsideComponent: React.FC<AsideComponentProps> = ({ asideContent }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="flex p-6 items-center justify-center lg:block lg:w-55 lg:h-screen lg:max-h-[calc(100vh-90px)] lg:mt-36">
      <ul className="space-y-6">
        {asideContent.map((item, index) => {
          const path = `/resources/${item.label}`;
          const isActive =
            currentPath === `/resources/${encodeURIComponent(item.label)}`;

          return (
            <li key={index} className="flex items-center space-x-3">
              <img src={item.icon} alt={item.label} className="w-6 h-6" />
              <Link
                to={path}
                className={classNames("transition-colors", {
                  "!text-[#b91879] !font-bold": isActive,
                  "text-gray-700 ": !isActive,
                })}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AsideComponent;
