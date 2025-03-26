import { Suspense } from "react";
import Loading from "../components/Loading";

interface PageNotFoundProps {
  label: string;
}

const PageNotFound = ({ label }: PageNotFoundProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">{label}</h1>
        <p className="mt-4 text-lg">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </Suspense>
  );
};

export default PageNotFound;
