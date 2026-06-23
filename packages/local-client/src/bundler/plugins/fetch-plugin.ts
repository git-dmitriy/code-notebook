import type {Loader, OnLoadResult, Plugin} from 'esbuild';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'filecache-v9',
});

function getLoader(path: string): Loader {
    if (path.endsWith('.css')) return 'css';
    if (path.endsWith('.jsx')) return 'jsx';
    return 'js';
}

export const fetchPlugin = (inputCode: string): Plugin => ({
    name: 'fetch-plugin',
    setup(build) {
        build.onLoad({filter: /(^index\.js$)/}, () => ({
            loader: 'jsx',
            contents: inputCode,
        }));

        build.onLoad({filter: /.css$/}, async (args) => {
            const cacheResult = await fileCache.getItem<OnLoadResult>(args.path);
            if (cacheResult) {
                return cacheResult;
            }

            const {data, request} = await axios.get(args.path);

            const escaped = data
                .replace(/\n/g, '')
                .replace(/"/g, '\\"')
                .replace(/'/g, "\\'");
            const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;

            const result: OnLoadResult = {
                loader: 'jsx',
                contents,
                resolveDir: new URL('./', request.responseURL).pathname,
            };

            await fileCache.setItem(args.path, result);
            return result;
        });

        build.onLoad({filter: /.*/}, async (args) => {
            if (args.path === 'index.js') {
                return undefined;
            }

            const cacheResult = await fileCache.getItem<OnLoadResult>(args.path);
            if (cacheResult) {
                return cacheResult;
            }

            const {data, request} = await axios.get(args.path);

            const result: OnLoadResult = {
                loader: getLoader(args.path),
                contents: data,
                resolveDir: new URL('./', request.responseURL).pathname,
            };

            await fileCache.setItem(args.path, result);
            return result;
        });
    },
});
