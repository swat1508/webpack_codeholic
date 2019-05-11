const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports={
mode:'development',

    entry:[
        './src/app.js'
    ],
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
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Webpack starter project',
            template: path.resolve('./src/index.html')
          }),
          new webpack.HotModuleReplacementPlugin()  //needed for hot reload
    ],
    module:{
        rules:[
        {                       //rule 1
            test : /\.scss$/,   //when matches scss file , then use below style-loader etc
            use:[
                'style-loader',
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