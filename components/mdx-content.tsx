import * as runtime from "react/jsx-runtime";

type MDXComponents = Record<string, React.ComponentType<unknown>>;

function evalMDX(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default as React.ComponentType<{
    components?: MDXComponents;
  }>;
}

export function MDXContent({
  code,
  components,
}: {
  code: string;
  components?: MDXComponents;
}) {
  const Component = evalMDX(code);
  return <Component components={components} />;
}
