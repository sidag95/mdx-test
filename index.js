import React from 'react';
import { render } from 'react-dom';
import MDXContent from './dev-mdx/content/routes/RandomContent/index.md';

const root = document.getElementById('root');

function Callout({ children }) {
  return (
    <div>
      <h2>Callout!</h2>
      <p>{children}</p>
    </div>
  );
}

function Component() {
  return (
    <section>
      <h1>Hello!</h1>
      <p>This works</p>
      <MDXContent components={{ callout: Callout }} />
    </section>
  );
}

render(<Component />, root);
