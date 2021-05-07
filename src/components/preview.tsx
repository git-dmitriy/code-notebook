import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener("message", (event) => {
          try {
            eval(event.data);
          } catch (err) {
            let root = document.querySelector('#root');
            root.innerHTML =
              '<div style="color:red"><h1>Runtime Error</h1><div>' + err + '</div></div>';
            console.error(err);
          }
        }, false);
      </script>
    </body>
  </html>
`;

export const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <iframe
      style={{ backgroundColor: '#fff' }}
      title='preview'
      ref={iframe}
      sandbox='allow-scripts'
      srcDoc={html}
    />
  );
};
