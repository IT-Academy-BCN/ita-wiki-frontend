import PageTitle from "../components/ui/PageTitle";
import Container from "../components/ui/Container";
import CodeConnectFormCreate from "../components/code-connect/CodeConnectFormCreate";

const CodeConnectCreatePage = () => {
  return (
    <>
      <PageTitle title="Afegir un projecte CodeConnect" />
      <Container>
        <CodeConnectFormCreate />
      </Container>
    </>
  );
};

export default CodeConnectCreatePage;
