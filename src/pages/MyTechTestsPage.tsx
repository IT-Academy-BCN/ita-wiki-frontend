import { useEffect, useState } from "react";
import "../../public/technical-tests-mock.json";
import { useLocation } from "react-router";

function MyTechTestsPage() {
  const location = useLocation();

  const [techTests, setTechTests] = useState<TechTest[]>([]);

  interface TechTest {
    id: string;
    title: string;
    lanuage: string;
    description: string;
    tags: Array<string>;
  }

  const getTechTestListMock = async () => {
    try {
      const response = await fetch("/technical-tests-mock.json");

      if (!response) throw new Error(`could not fetch tech-tests mock data`);

      const data = await response.json();
      console.log(data);

      return data;
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    getTechTestListMock().then((data) => {
      setTechTests((prev) => [...prev, ...data.data]);
    });
  }, [location.key]);

  return (
    <div
      className="
        flex
        flex-col
        m-4 p-4
        w-fit bg-gray-50
        rounded shadow-xl
        "
    >
      <ul>
        {techTests.map((test: TechTest) => (
          <li key={test.id}>- {test.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyTechTestsPage;
