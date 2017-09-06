const path = require('path');

module.exports = (config) => {
  const tests = 'tests/*.test.js';

  process.env.BABEL_ENV = 'karma';

  config.set({
    singleRun: true,
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],

    files: [{
      pattern: tests
    }],

    // Preprocess through webpack
    preprocessors: {
      [tests]: ['webpack']
    },

    webpack: require('./webpack.parts').loadJavaScript({
      include: path.join(__dirname, 'tests')
    }),
    reporters: ['coverage'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html' },
        { type: 'lcov' }
      ]
    }
  });
};
