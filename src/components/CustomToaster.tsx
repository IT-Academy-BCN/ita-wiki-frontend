import { Toaster } from "sonner";
const CustomToaster: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Toaster
        richColors
        toastOptions={{
          style: {
            padding: "2rem",
            fontSize: "1rem",
          },
        }}
      />
      {children}
    </>
  );
};

export default CustomToaster;
