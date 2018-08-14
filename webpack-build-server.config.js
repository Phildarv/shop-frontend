const path = require("path");
const ChildProcess = require("child_process");

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const nodeExternals = require("webpack-node-externals");

require("dotenv").config(); //include env file in here as well

process.traceDeprecation = true; //https://github.com/webpack/loader-utils/issues/56

const context = __dirname;

const PUBLIC_PATH = "/";
const VERSION = ChildProcess.execSync("git rev-parse HEAD")
  .toString()
  .trim();

module.exports = {
  mode: "production",

  target: "node",
  externals: [nodeExternals()],

  context,

  entry: {
    index: path.join(context, "server/index.jsx")
  },

  devtool: "nosources-source-map",

  output: {
    path: path.join(context, "dist/server/"),
    filename: "[name].js",
    publicPath: PUBLIC_PATH
  },

  optimization: {
    splitChunks: {
      chunks: "all"
    },
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          parallel: true,
          sourceMap: true,
          output: {
            comments: false
          },
          compress: {
            unsafe_comps: true,
            properties: true,
            keep_fargs: false,
            pure_getters: true,
            collapse_vars: true,
            unsafe: true,
            warnings: false,
            sequences: true,
            dead_code: true,
            drop_debugger: true,
            comparisons: true,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            if_return: true,
            join_vars: true,
            drop_console: false
          },
          exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }
      })
    ]
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      generateStatsFile: true
    }),
    new CleanWebpackPlugin(["dist/server/*.*"]),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      path: "./.env", // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe),
      systemvars: false
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css"
    })
  ],

  resolve: {
    modules: [path.resolve(context, "src"), "node_modules"],
    extensions: [".js", ".jsx"],
    alias: {
      img: path.resolve(context, "img")
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(context, "src"),
          path.resolve(context, "server")
        ],

        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    targets: {
                      browsers: ["> 1%", "last 2 major versions", "IE 10"]
                    },
                    // for uglifyjs...
                    forceAllTransforms: true
                  }
                ],
                "@babel/preset-react"
              ],
              plugins: [
                "babel-plugin-styled-components",
                ["@babel/plugin-proposal-class-properties", { loose: false }],
                "@babel/plugin-proposal-object-rest-spread",
                "syntax-dynamic-import",
                "universal-import"
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(context, "src"),
          path.resolve(context, "server"),
          path.resolve(context, "node_modules")
        ],

        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { import: false, sourceMap: true, minimize: true }
          },
          { loader: "postcss-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(context, "src"),
          path.resolve(context, "server"),
          path.resolve(context, "node_modules")
        ],

        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { import: false, sourceMap: true, minimize: true }
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          "resolve-url-loader",
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|svg)$/,
        loader: "file-loader"
      }
    ]
  }
};