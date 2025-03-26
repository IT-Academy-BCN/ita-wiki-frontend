import { FC } from "react";
import { Main } from "../../layouts/Main";
import Content from "../../layouts/Content";
import { Outlet } from "react-router";

const LayoutResource: FC = () => {
  return (
    <Main>
      <Content>
        <Outlet />
      </Content>
    </Main>
  );
};

export default LayoutResource;
