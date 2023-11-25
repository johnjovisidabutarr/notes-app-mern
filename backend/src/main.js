import { app } from './application/app.js'
import { logger } from './application/logging.js'

const PORT = 5000

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}...`)
})
