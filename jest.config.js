module.exports = {
    testEnvironment: 'jest-environment-jsdom-global',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.js?$': 'babel-jest',
        '^.+\\.firebase.js$': '<rootDir>/firebase-transform.js',
        '^.+\\.js$': 'babel-jest',
    },

    transformIgnorePatterns: ['/node_modules/'],
};
