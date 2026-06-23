export const STORAGE_KEY_WELCOME = 'code-notebook-welcome-dismissed';

export const WELCOME_TITLE = 'Welcome to Code Notebook';

export const WELCOME_STEPS = [
    'Use **Text** cells for Markdown documentation — click to edit.',
    'Use **Code** cells for JavaScript/JSX — the preview appears on the right after ~1 second.',
    'Call `show(<Component />)` to render React output in the preview.',
    'Use `React.useState` and `React.useEffect` for hooks (React is available globally in the preview).',
    'Code from earlier code cells is available in later ones (cumulative execution).',
];

export const CODE_CELL_TEMPLATE = `function Hello() {
  return <h1>Hello, Code Notebook!</h1>;
}

show(<Hello />);
`;

export interface HelpSection {
    id: string;
    title: string;
    markdown: string;
}

export const HELP_SECTIONS: HelpSection[] = [
    {
        id: 'quick-start',
        title: 'Quick start',
        markdown: `
1. Click **Code** or **Text** to add a cell.
2. Write your content in the editor.
3. For code cells, call \`show(<Component />)\` to render output in the preview panel.
4. Changes are saved automatically to \`notebook.js\`.
`,
    },
    {
        id: 'text-cells',
        title: 'Text cells',
        markdown: `
Text cells support **Markdown**. Click a text cell to open the editor.

Example:

\`\`\`markdown
# My Notebook

Write documentation with **bold**, *italic*, and lists.

- Item one
- Item two
\`\`\`
`,
    },
    {
        id: 'code-cells',
        title: 'Code cells',
        markdown: `
Code cells run JavaScript/JSX in the browser. The preview panel on the right shows the result.

**Important:** defining a component is not enough — you must call \`show()\`:

\`\`\`jsx
function Hello() {
  return <h1>Hello!</h1>;
}

show(<Hello />);
\`\`\`

\`export default function MyComponent()\` also works — \`show()\` is added automatically.

Use **Format** to prettify your code with Prettier.
`,
    },
    {
        id: 'react-hooks',
        title: 'React hooks',
        markdown: `
In the preview iframe, \`React\` and \`ReactDOM\` are available as globals. Use the \`React.\` prefix for hooks:

\`\`\`jsx
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

show(<Counter />);
\`\`\`
`,
    },
    {
        id: 'cumulative-code',
        title: 'Cumulative code',
        markdown: `
Variables and functions from **previous code cells** are available in later code cells (like Jupyter notebooks).

**Cell 1:**

\`\`\`jsx
const message = 'Hello from cell 1';
const user = { name: 'Alex' };
\`\`\`

**Cell 2:**

\`\`\`jsx
function Profile() {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{message}</p>
    </div>
  );
}

show(<Profile />);
\`\`\`
`,
    },
    {
        id: 'npm-imports',
        title: 'npm packages',
        markdown: `
You can import packages from npm via unpkg:

\`\`\`jsx
import axios from 'axios';

function GitHubUser() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    axios.get('https://api.github.com/users/github').then(({ data }) => {
      setUser(data);
    });
  }, []);

  if (!user) return <p>Loading...</p>;

  return <h2>{user.login}</h2>;
}

show(<GitHubUser />);
\`\`\`
`,
    },
    {
        id: 'cell-actions',
        title: 'Cell actions',
        markdown: `
Each cell has an action bar:

- **Up / Down** — reorder cells
- **Delete** — remove the cell

Notebooks are saved automatically to \`notebook.js\` in the working directory.
`,
    },
];
