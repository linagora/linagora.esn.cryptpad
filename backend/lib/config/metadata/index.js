module.exports = dependencies => ({
  rights: {
    admin: 'rw',
    user: 'r'
  },
  configurations: {
    instanceURL: require('./instance-url')(dependencies)
  }
});
