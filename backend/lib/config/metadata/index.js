module.exports = dependencies => ({
  rights: {
    padmin: 'rw',
    admin: 'rw',
    user: 'r'
  },
  configurations: {
    instanceURL: require('./instance-url')(dependencies)
  }
});
