module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/steps/**/*.ts', 'tests/support/**/*.ts'],
    paths: ['tests/features/**/*.feature'],
    format: ['summary', 'progress-bar'],
    publishQuiet: true,
  },
};