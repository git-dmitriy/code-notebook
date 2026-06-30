import './demo-mode-banner.css';

export const DemoModeBanner: React.FC = () => {
    return (
        <div className="demo-mode-banner notification is-info is-light">
            <p>
                <strong>Portfolio demo</strong> — This notebook runs in demo mode. Your
                edits are stored only in this browser&apos;s local storage and are not
                saved to the server or visible to other visitors.
            </p>
        </div>
    );
};
