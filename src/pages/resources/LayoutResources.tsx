import { FC } from "react";
import { Main } from "../../layouts/Main";
import Content from "../../layouts/Content";
import { Outlet } from "react-router";

import ResourceCtxProvider from "../../context/providers/ResourcesCtxProvider";
const LayoutResource: FC = () => {
  return (
    <ResourceCtxProvider>
      <Main>
        <Content>
          <Outlet />
        </Content>
      </Main>
    </ResourceCtxProvider>
  )
}


export default LayoutResource;