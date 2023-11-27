const { randomBytes } = require(`crypto`)

const randomString = randomBytes(10)

console.log(randomString.toString(`hex`))