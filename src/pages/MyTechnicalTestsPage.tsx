import useTechnicalTests from "../hooks/useTechnicalTests";

function MyTechnicalTestsPage() {
  const { technicalTests, isLoading, error } = useTechnicalTests();

  if (isLoading) {
    return <p className="m-4">Cargando pruebas técnicas...</p>;
  }

  if (error) {
    return <p className="m-4 text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="flex flex-col m-4 p-4 w-fit bg-gray-50 rounded shadow-xl">
      <ul>
        {technicalTests.map((test) => (
          <li key={test.id}>- {test.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyTechnicalTestsPage;
