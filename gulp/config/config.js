module.exports = {
    paths: {
        app: './app/',
        scripts: './app/assets/js/main.js',
        scss: './app/assets/scss/',
        css: './app/assets/css/',
        jade: './app/*.jade'
    },
    browsersync: {
        server: {
            baseDir: './app',
            proxy: '127.0.0.1:8010',
        },
        options: {
            stream: true
        }
    },
    sass: {
        options: {
            sourceMap: true,
            outputStyle: 'compressed'
        },
        rename: {
            basename: 'style',
            suffix: '.min'
        }
    },
    autoprefixer: {
        browsers: [
            'last 2 versions',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
          ],
        cascade: true
    }
};
