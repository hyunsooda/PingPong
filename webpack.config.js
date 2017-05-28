// webpack version

module.exports = {
    entry : __dirname+'/js/Main.js',
    output : {
        path : __dirname+'/js/',
        filename : 'convert_main.js'
    },
    module : {
        rules : [{
            test : /\.js$/,
            exclude : /node_modules/,
            use : [{
                loader : 'babel-loader',
                options : {
                    presets : ['es2017']
                }
            }]        
        }]
    },
    devServer : {
        inline : true,
        port : 7777,
        contentBase : __dirname
    }
}