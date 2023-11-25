import { ResponseError } from '../error/ResponseError.js'

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next()
    return
  }

  if (err instanceof ResponseError) {
    return res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status,
      },
    })
  } else {
    return res.status(500).json({
      error: {
        message: err.message,
        status: err.status,
      },
    })
  }
}

export { errorMiddleware }
