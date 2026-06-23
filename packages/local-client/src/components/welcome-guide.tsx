import MDEditor from '@uiw/react-md-editor';
import {WELCOME_STEPS, WELCOME_TITLE} from '../content/notebook-guide';
import './welcome-guide.css';

interface WelcomeGuideProps {
    onDismiss: () => void;
    onOpenHelp: () => void;
}

const welcomeMarkdown = WELCOME_STEPS.map((step, index) => `${index + 1}. ${step}`).join(
    '\n'
);

export const WelcomeGuide: React.FC<WelcomeGuideProps> = ({
                                                              onDismiss,
                                                              onOpenHelp,
                                                          }) => {
    return (
        <div className="welcome-guide" data-color-mode="dark">
            <div className="message is-info welcome-guide__message">
                <div className="message-header">
                    <p>{WELCOME_TITLE}</p>
                </div>
                <div className="message-body welcome-guide__body">
                    <MDEditor.Markdown source={welcomeMarkdown}/>
                    <div className="welcome-guide__actions">
                        <button
                            type="button"
                            className="button is-small is-info is-light"
                            onClick={onOpenHelp}>
                            View full guide
                        </button>
                        <button
                            type="button"
                            className="button is-small is-text"
                            onClick={onDismiss}>
                            Don&apos;t show again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
