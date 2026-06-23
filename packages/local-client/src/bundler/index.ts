import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin, globalStubPlugin} from './plugins/unpkge-path-plugin';
import {fetchPlugin} from './plugins/fetch-plugin';

let initialized = false;

async function ensureEsbuild() {
    if (!initialized) {
        await esbuild.initialize({
            wasmURL: '/esbuild.wasm',
        });
        initialized = true;
    }
}

const bundle = async (rawCode: string) => {
    await ensureEsbuild();

    try {
        const result = await esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            format: 'iife',
            plugins: [unpkgPathPlugin(), globalStubPlugin(), fetchPlugin(rawCode)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            },
            jsx: 'transform',
            jsxFactory: 'React.createElement',
            jsxFragment: 'React.Fragment',
        });

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
