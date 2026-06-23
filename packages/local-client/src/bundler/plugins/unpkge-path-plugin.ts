import type {Plugin} from 'esbuild';

export const unpkgPathPlugin = (): Plugin => ({
    name: 'unpkg-path-plugin',
    setup(build) {
        build.onResolve({filter: /(^index\.js$)/}, () => ({
            path: 'index.js',
            namespace: 'a',
        }));

        build.onResolve({filter: /^react$/}, () => ({
            path: 'react-global',
            namespace: 'global-stub',
        }));

        build.onResolve({filter: /^react-dom$/}, () => ({
            path: 'react-dom-global',
            namespace: 'global-stub',
        }));

        build.onResolve({filter: /^\.+\//}, (args) => ({
            namespace: 'a',
            path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href,
        }));

        build.onResolve({filter: /.*/}, (args) => ({
            namespace: 'a',
            path: `https://unpkg.com/${args.path}`,
        }));
    },
});

export const globalStubPlugin = (): Plugin => ({
    name: 'global-stub-plugin',
    setup(build) {
        build.onLoad({filter: /react-global/, namespace: 'global-stub'}, () => ({
            contents: `
        var react = window.React;
        module.exports = react;
        module.exports.default = react;
      `,
            loader: 'js',
        }));

        build.onLoad({filter: /react-dom-global/, namespace: 'global-stub'}, () => ({
            contents: `
        var reactDom = window.ReactDOM;
        module.exports = reactDom;
        module.exports.default = reactDom;
      `,
            loader: 'js',
        }));
    },
});
