module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwincss'),
                require('autoprefixer'),
            ],
        },
    },
}