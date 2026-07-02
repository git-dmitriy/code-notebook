import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
  <html>
    <head>
      <style>html {background-color: #fff}</style>
      <script crossorigin src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML =
            '<div style="color:red"><h1>Runtime Error</h1><pre>' + (err?.stack || err) + '</pre></div>';
          console.error(err);
        };
        window.addEventListener("error", (event) => {
          event.preventDefault();
          handleError(event.error);
        });
        window.addEventListener("message", (event) => {
          if (!event.data) return;
          try {
            eval(event.data);
          } catch (err) {
            handleError(err);
          }
        }, false);
        window.parent.postMessage('preview-ready', '*');
      </script>
    </body>
  </html>
`;

export const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<HTMLIFrameElement | null>(null);
  const codeRef = useRef(code);
  const iframeReady = useRef(false);

  codeRef.current = code;

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframe.current?.contentWindow) return;
      if (event.data !== 'preview-ready') return;

      iframeReady.current = true;
      if (codeRef.current) {
        iframe.current?.contentWindow?.postMessage(codeRef.current, '*');
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    if (!code || !iframeReady.current) return;
    iframe.current?.contentWindow?.postMessage(code, '*');
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        title='preview'
        ref={iframe}
        sandbox='allow-scripts allow-same-origin'
        srcDoc={html}
      />
      {err && <div className='preview-err'>{err}</div>}
    </div>
  );
};
