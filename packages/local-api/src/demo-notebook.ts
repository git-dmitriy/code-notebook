export interface DemoCell {
    id: string;
    type: 'text' | 'code';
    content: string;
}

export const DEMO_NOTEBOOK: DemoCell[] = [
    {
        id: 'demo-intro',
        type: 'text',
        content: `# Welcome to Code Notebook

A browser-based notebook for **JavaScript** and **React** — edit the cells below and watch the live preview on the right.

- **Text cells** — Markdown notes (like this one)
- **Code cells** — runnable JSX with instant preview
- **Cumulative execution** — variables from earlier code cells are available later
- **npm imports** — packages load from [unpkg](https://unpkg.com) in the browser
- **Demo mode** — edits are saved locally in your browser only

Try the **Increment** button below, or edit any cell to explore the notebook.`,
    },
    {
        id: 'demo-hello',
        type: 'code',
        content: `function Hello() {
  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        padding: '1.25rem',
        borderRadius: 12,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '1.75rem' }}>Hello, Code Notebook!</h1>
      <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>
        Your code runs entirely in the browser.
      </p>
    </div>
  );
}

show(<Hello />);`,
    },
    {
        id: 'demo-counter',
        type: 'code',
        content: `function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        padding: '1rem',
        border: '1px solid #e8e8e8',
        borderRadius: 12,
        maxWidth: 280,
      }}
    >
      <p style={{ margin: '0 0 0.75rem', color: '#555' }}>Interactive preview</p>
      <p style={{ margin: '0 0 1rem', fontSize: '2rem', fontWeight: 700 }}>
        {count}
      </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '8px 16px',
          borderRadius: 8,
          border: 'none',
          background: '#3273dc',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Increment
      </button>
    </div>
  );
}

show(<Counter />);`,
    },
    {
        id: 'demo-theme',
        type: 'code',
        content: `// Shared state for the next cell (cumulative execution)
const accent = '#3273dc';
const tagline = 'Markdown notes + live React previews';`,
    },
    {
        id: 'demo-showcase',
        type: 'code',
        content: `function FeatureShowcase() {
  const features = ['Monaco editor', 'esbuild in browser', 'Auto-save'];

  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        padding: '1.25rem',
        borderRadius: 12,
        border: \`2px solid \${accent}\`,
        maxWidth: 360,
      }}
    >
      <h2 style={{ margin: '0 0 0.5rem', color: accent }}>Built for tinkering</h2>
      <p style={{ margin: '0 0 1rem', color: '#666' }}>{tagline}</p>
      <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#444' }}>
        {features.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

show(<FeatureShowcase />);`,
    },
    {
        id: 'demo-github',
        type: 'code',
        content: `import axios from 'axios';

function GitHubCard() {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get('https://api.github.com/users/git-dmitriy')
      .then(({ data }) => setUser(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p style={{ color: 'crimson' }}>Could not load profile: {error}</p>;
  }

  if (!user) {
    return <p style={{ color: '#888' }}>Loading GitHub profile…</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        fontFamily: 'system-ui, sans-serif',
        padding: '1rem',
        borderRadius: 12,
        background: '#f6f8fa',
        maxWidth: 360,
      }}
    >
      <img
        src={user.avatar_url}
        alt=""
        width={64}
        height={64}
        style={{ borderRadius: '50%' }}
      />
      <div>
        <h3 style={{ margin: 0 }}>
          <a
            href="https://github.com/git-dmitriy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {user.name}
          </a>
        </h3>
        <p style={{ margin: '4px 0 0', color: '#666' }}>
          <a
            href="https://github.com/git-dmitriy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#3273dc' }}
          >
            @{user.login}
          </a>
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: '#888' }}>
          npm import via unpkg
        </p>
      </div>
    </div>
  );
}

show(<GitHubCard />);`,
    },
];
