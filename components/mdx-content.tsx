import * as runtime from "react/jsx-runtime";

// MDX components map: HTML elements get prop-typed overrides; using `any` here
// because each element has a different prop shape and MDX dispatches by name.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponents = Record<string, React.ComponentType<any>>;

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
