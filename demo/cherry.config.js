const mockMiddleware = require('@nfe/mock-middleware');

const map = require('./mock/map');

console.log('map:', map);

const mock = mockMiddleware({
    'map': 'mock/map.js'
})

module.exports = {
    root: './src',
    ext: '.md',
    category: [
        "utils", "Comp"
    ],
    server: {
        port: 9001,
        middleware: [mock]
    }
}