declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}

// Creado para importar SVGs como módulos en TypeScript
declare module "*.svg" {
  const content: string;
  export default content;
}
