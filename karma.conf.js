// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', '@angular/cli'],
    plugins: [
      require('mocha'),
      require('chai'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
      require('zone.js/dist/zone.js')
    ],
    files: [
      './**/*.spec.ts'
      // 'node_modules/zone.js/dist/long-stack-trace-zone',
      // 'node_modules/zone.js/dist/proxy.js',
      // 'node_modules/zone.js/dist/sync-test',
      // 'node_modules/zone.js/dist/jasmine-patch',
      // 'node_modules/zone.js/dist/async-test',
      // 'node_modules/zone.js/dist/fake-async-test'
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
