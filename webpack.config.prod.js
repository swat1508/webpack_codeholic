const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');  //production
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //production
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //production

module.exports={
// mode:'development',
   mode:'production',

    entry:[
        './src/app.js'
    ],
/* not needed for production 
    watch:true,
    watchOptions:{
        aggregateTimeout : 500,
        poll:1000,
        ignored: /node_modules/
    },

    devtool:'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        watchContentBase: true,
        hot: true,   //no browser reload requires
        open: true,  // open the page when start server
        inline: true //need to inject styles and js
      },
      */
     optimization: {                   //production
        minimizer: [
          new OptimizeCSSAssetsPlugin()
        ]
      }
      ,
    plugins:[
//        new CleanWebpackPlugin(['dist']),  //production
          new CleanWebpackPlugin(),  //above does not work so tried this - production
        new HtmlWebpackPlugin({
            title: 'Webpack starter project',
            template: path.resolve('./src/index.html')
          }),
          new MiniCssExtractPlugin({     //production
            filename: "[name].css",
            chunkFilename: "[id].css"
          })
/* not needed for production 
          new webpack.HotModuleReplacementPlugin()  //needed for hot reload  */
    ],
    module:{
        rules:[
        {                       //rule 1
            test : /\.scss$/,   //when matches scss file , then use below style-loader etc
            use:[
//production    'style-loader',
                MiniCssExtractPlugin.loader,  //production
                'css-loader',
                'sass-loader'
            ]
        },
        {                                     //rule 2
            test : /\.m?js$/,
            exclude : /{node_module|bower_components}/,
            use : {
                loader : 'babel-loader',
                options:{
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test:/\.(jpg|jpeg|gif|png|svg)$/,
            use : {
                loader : "file-loader",
                options : {
                    outputPath: './images',
                    name : "[name].[ext]"
                },
            },
        },
            {
                test: /\.html$/,
                use : {
                    loader : 'html-loader',
                }
            },


    ]      //rules-closed

}

};