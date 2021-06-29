const users = require('../data/users')

exports.signIn = (req, res) => {
  const { username, password } = req.body
  const user = users.find(
    (user) => user.username === username && user.password === password
  )

  if (!user) {
    res.send('Username atau password salah')
    return false
  }

  res.status(200).send({
    data: {
      username: user.username,
      token: '0sdnOJIoinsdo9878IJNBIniiuinINiuYIUY',
    },
  })
}
