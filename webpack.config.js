const path = require('path')
const fs = require('fs')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const srcPath = path.join(process.env.PROJECT_CWD, './develop')
const distPath = path.join(process.env.PROJECT_CWD, './web-ui/assets/js')
const isDevelopment = process.env.NODE_ENV === 'development'
let babelConfig

try {
  fs.accessSync(`${process.env.PROJECT_CWD}/babel.config.js`, fs.constants.R_OK | fs.constants.W_OK)
  babelConfig = `${process.env.PROJECT_CWD}/babel.config.js`
  console.error('use babel project config!')
} catch (err) {
  console.error('use babel package config!')
  babelConfig = `./babel.config.js`
}

/**
 * Resources for lazy loading:
 * https://medium.com/front-end-hacking/webpack-and-dynamic-imports-doing-it-right-72549ff49234
 * https://webpack.js.org/guides/public-path/
 */

module.exports = {
  context: srcPath,

  entry: {
    app: './assets/js/app.js',
    style: './00-globals/03-glb-style/style.glb.scss'
  },

  output: {
    path: distPath,
    chunkFilename: 'jvm-[name].bundle.js',
    filename: 'jvm-[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      base: path.resolve(process.env.PROJECT_CWD),
      dev: path.resolve(process.env.PROJECT_CWD, 'develop/'),
      glb: path.resolve(process.env.PROJECT_CWD, 'develop/00-globals/'),
      functions: path.resolve(process.env.PROJECT_CWD, 'develop/00-globals/04-glb-functions/'),
      objects: path.resolve(process.env.PROJECT_CWD, 'develop/01-objects/'),
      components: path.resolve(process.env.PROJECT_CWD, 'develop/02-components/'),
      modules: path.resolve(process.env.PROJECT_CWD, 'develop/03-modules'),
      styleguide: path.resolve(process.env.PROJECT_CWD, 'develop/05-styleguide'),
    }
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '../css/style.css',
      chunkFilename: isDevelopment ? '../css/[id].css' : '../css/[id].[hash].css'
    })
  ],
  module: {
    rules: [
      // handle modules css
      {
        // test: /\.s[ac]ss$/i,
        test: /\.module\.scss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions', 'IE 11']
                }),
              ]
            }
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              prependData: (loaderContext) => {
                // Inject global scss vars/mixins before each module
                const { rootContext } = loaderContext
                const varsPath = path.resolve(rootContext, './00-globals/00-glb-vars/glb-vars')
                const mixinsPath = path.resolve(rootContext, './00-globals/01-glb-mixins/glb-mixins')
                console.log('@SASS-LOADER prependData', varsPath, mixinsPath)
                return `@import "${varsPath}"; @import "${mixinsPath}";`
              },
              sourceMap: true
            }
          },
        ],
      },
      // handle glb css
      {
        test: /\.glb\.scss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true
            }
          },
          // Add autoprefixer to css
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions', 'IE 11']
                }),
              ]
            }
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sassOptions: () => {
                // we include the src (/develop/assets) path as our base url for file imports in the scss files
                // any url() imports in the css should be set relative to the assets folder  
                return {
                  includePaths: [srcPath + '/assets/']
                }
              },
              sourceMap: true
            }
          },
        ]
      },
      // handle js
      {
        test: /^(?!.*\.config\.js$).*\.js$/,
        exclude: /(node_modules)/,
        /* if you decide to bundle GSAP and not use the umd verion you would need to
         * use include instead of exclude to properly babelify GSAP or it fails on older browsers.
         */
        // include: [
        //     srcPath,
        //     /(node_modules\/gsap)/
        // ],
        use: {
          // https://github.com/babel/babel-loader
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-syntax-dynamic-import'],
            configFile: babelConfig
          }
        }
      }
    ]
  },

  /** Externals
   *  In case you want to include external plugins and they need dependencies that are part of the bundle.
   *  Useful for some GSAP plugins like DrawSVGPlugin which are not yet optimized for Webpack.
   **/
  // externals: {
  //     'TweenLite': 'TweenLite'
  // },
}
