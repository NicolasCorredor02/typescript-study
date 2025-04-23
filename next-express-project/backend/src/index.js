import 'dotenv/config'
import serverUp from './config/server.js'

const server = await serverUp()
const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
