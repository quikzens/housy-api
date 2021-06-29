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

exports.signUp = (req, res) => {
  const newUser = req.body
  const user = users.find((user) => user.username === newUser.username)

  if (user) {
    res.send('Gunakan username yang lain')
    return false
  }

  users.push({ ...newUser })

  res.send({
    data: {
      username: newUser.username,
      token: '0sdnOJIoinsdo9878IJNBIniiuinINiuYIUY',
    },
  })
}
