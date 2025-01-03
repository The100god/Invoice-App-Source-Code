import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  // new CopyWebpackPlugin({
  //   patterns: [
  //     {
  //       from: 'src/public', // Source folder containing splash.html and other static assets
  //       to: 'public', // Destination folder in the output directory
  //       noErrorOnMissing: true,
  //     },
  //   ],
  // }),
];
