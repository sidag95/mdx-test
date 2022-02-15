import path from 'path';
import remarkFrontmatter from 'remark-frontmatter';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import remarkIncludePlugin from './plugins/remarkIncludePlugin.js';
import remarkLinkAttributePlugin from './plugins/remarkLinkAttributePlugin.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const buildPath = path.join(__dirname, 'build');
const publicPath = 'http://localhost:8000';
const partialAbsolutePath = path.join(__dirname, './dev-mdx/content/partials');
const assetsPublicPath = `http://localhost:8080/build/browser/`;

const mdxLoaderRule = {
  test: /\.mdx?$/,
  use: [
    'babel-loader',
    {
      loader: '@mdx-js/loader',
      options: {
        format: 'mdx',
        mdxExtensions: ['.mdx', '.md'],
        remarkPlugins: [
          [
            remarkLinkAttributePlugin,
            { assetsPublicPath, publicPath: `${publicPath}/` },
          ],
          [remarkIncludePlugin, { partialFolderPath: partialAbsolutePath }],
          remarkFrontmatter,
        ],
      },
    },
  ],
};

const config = {
  mode: 'development',

  entry: {
    main: './index.js',
  },

  output: {
    path: buildPath,
    publicPath,
    filename: `js/[name].js`,
    chunkFilename: `js/[name].js`,
  },

  plugins: [new HtmlWebpackPlugin({ template: 'index.html' })],

  resolve: {
    modules: ['node_modules'],
    // support code sharing capabilities based on extension. A web(.desktop.js, .web.js) and native app(.native.js handled by metro bundler) codebase can co-exist together
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.json', '.mdx'],
  },
  module: {
    // we use require.resolve to get the absolute path of the loader
    // this is important because it ensures that loaders get resolved correctly irrespective of their position in the node_modules dependency tree
    // Checkout the PR: https://github.com/razorpay/frontend-universe/pull/573 description for more details
    rules: [
      {
        test: /\.(m?js|ts|tsx|c?js)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(svg|gif|png|jpe?g|ico|webp|woff(2)?|ttf|otf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/[path][name].[ext]',
              emitFile: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      mdxLoaderRule,
    ],
  },

  optimization: {
    moduleIds: 'named',
    splitChunks: {
      // include all types of chunks(sync and async) for optimisation
      chunks: 'all',
    },
    runtimeChunk: 'single',
  },

  devtool: 'inline-source-map',

  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/offline.html/,
          to: `${publicPath}/offline.html`,
        },
        {
          from: /./,
          to: publicPath,
        },
      ],
    },
    port: 8000,
    compress: true,
    hot: true,
    headers: {
      // Handle CORS for SSR where webpack dev server runs on a different port
      'Access-Control-Allow-Origin': '*',
    },
  },
};

export default config;
