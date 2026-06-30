import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin, globalStubPlugin} from './plugins/unpkge-path-plugin';
import {fetchPlugin} from './plugins/fetch-plugin';

let initPromise: Promise<void> | null = null;
let buildQueue: Promise<unknown> = Promise.resolve();

function ensureEsbuild(): Promise<void> {
    if (!initPromise) {
        initPromise = esbuild
            .initialize({
                wasmURL: '/esbuild.wasm',
            })
            .catch((err) => {
                initPromise = null;
                throw err;
            });
    }
    return initPromise;
}

function enqueueBuild<T>(fn: () => Promise<T>): Promise<T> {
    const run = buildQueue.then(fn);
    buildQueue = run.catch(() => {});
    return run;
}

const bundle = async (rawCode: string) => {
    try {
        await ensureEsbuild();

        const result = await enqueueBuild(() =>
            esbuild.build({
                entryPoints: ['index.js'],
                bundle: true,
                write: false,
                format: 'iife',
                plugins: [
                    unpkgPathPlugin(),
                    globalStubPlugin(),
                    fetchPlugin(rawCode),
                ],
                define: {
                    'process.env.NODE_ENV': '"production"',
                    global: 'window',
                },
                jsx: 'transform',
                jsxFactory: 'React.createElement',
                jsxFragment: 'React.Fragment',
            })
        );

        const outputFile = result.outputFiles?.[0];
        return {
            code: outputFile?.text ?? '',
            err: '',
        };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Bundle failed';
        return {
            code: '',
            err: message,
        };
    }
};

export default bundle;
