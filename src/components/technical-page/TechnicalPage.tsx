import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { fetchTechnicalTestById } from "../../api/endPointTechnicalTests";
import CalendarIcon from "../../assets/Calendar.svg";
import JSIcon from "../../assets/javascript.svg";
import PageTitle from "../ui/PageTitle";
import Container from "../ui/Container";
import { ArrowLeftIcon } from "lucide-react";
import ButtonComponent from "../atoms/ButtonComponent";
import UiCheckbox from "../ui/shared-ui/UiCheckbox";
import type { TechnicalTest } from "../../types/TechnicalTest";

const TechnicalPage = () => {

  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const [technicalTest, setTechnicalTest] = useState<TechnicalTest | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data: TechnicalTest = await fetchTechnicalTestById(Number(projectId));;
        if (!data) throw new Error("No data received");
        setTechnicalTest(data);
      } catch (error) {
          console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (projectId) {
      fetchData();
    }
  }, [projectId]);

  return (
    <>
      <PageTitle title="Xifratge Cèsar" />
      <Container className="px-4 py-6 lg:pl-8 xl:pl-6">
        {isLoading && <p>Carregant...</p>}
        {technicalTest && <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-col lg:flex-row justify-between">
              <div>
                <a
                  className="text-[#B91879] cursor-pointer text-sm"
                  onClick={() =>
                    navigate("/resources/technical-test/all-tech-tests")
                  }
                >
                  <ArrowLeftIcon
                    className="inline text-[#B91879] mb-2 me-1"
                    size="16px"
                  ></ArrowLeftIcon>
                  Tornar a Proves Tècniques
                </a>
                <h2 className="text-2xl font-semibold mt-2">{technicalTest.title}</h2>
              </div>
            </div>

            <div className="my-3">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <img src={CalendarIcon} alt="Calendari" className="w-4 h-4" />
                  <span>{technicalTest.created_at}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <img src={JSIcon} alt="JavaScript" className="w-4 h-4" />
                  <span>{technicalTest.language}</span>
                </div>
              </div>
            </div>

            <div className="my-6 flex gap-3">
              {technicalTest.tags.map((tag) =>
                <span 
                  key={tag}
                  className="inline px-2 py-1 rounded-lg border-2 border-gray-300 bg-white text-sm font-medium">
                    {tag}
                </span>)}
            </div>

            <p className="text-[16px] mb-6">
              {technicalTest.description}
            </p>
          
            <div>
              <h2 className="text-xl font-bold mt-8 mb-5">Exercicis</h2>
              <ul>
                {!technicalTest.exercises.length && <p>No hi ha exercicis per mostrar.</p>}
                {technicalTest?.exercises?.map((exercise, index) => 
                <li key={index} className="my-3">
                  <UiCheckbox
                    label={exercise}
                    checked={false}
                    onChange={() => {}}
                  />
                </li>)}
              </ul>
            </div>
          </div>
          <div>
            <div className="border border-gray-500 text-black p-6 rounded-3xl">
              <h3 className="text-xl font-bold">Dificultat</h3>
              <p className="my-5">{technicalTest.difficulty_level || "null"}</p>
              <h3 className="text-xl font-bold">Temps estimat</h3>
              <p className="my-5">{technicalTest.duration?.toString() || "null"} minuts</p>
              <ButtonComponent>Marcar com a fet</ButtonComponent>
            </div>
          </div>
        </div>}
      </Container>
    </>
  );
};

export default TechnicalPage;
