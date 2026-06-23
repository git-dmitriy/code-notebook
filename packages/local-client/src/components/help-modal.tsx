import {useEffect} from 'react';
import MDEditor from '@uiw/react-md-editor';
import {HELP_SECTIONS} from '../content/notebook-guide';
import './help-modal.css';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({isOpen, onClose}) => {
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal is-active help-modal">
            <button
                type="button"
                className="modal-background"
                aria-label="Close help"
                onClick={onClose}
            />
            <div className="modal-card help-modal__card">
                <header className="modal-card-head">
                    <p className="modal-card-title">How to use Code Notebook</p>
                    <button
                        type="button"
                        className="delete"
                        aria-label="close"
                        onClick={onClose}
                    />
                </header>
                <section className="modal-card-body help-modal__body" data-color-mode="dark">
                    {HELP_SECTIONS.map((section) => (
                        <article key={section.id} className="help-modal__section">
                            <h3 className="title is-5 help-modal__section-title">
                                {section.title}
                            </h3>
                            <MDEditor.Markdown source={section.markdown}/>
                        </article>
                    ))}
                </section>
                <footer className="modal-card-foot">
                    <button type="button" className="button" onClick={onClose}>
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
};
