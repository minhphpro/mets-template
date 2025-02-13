class CustomError extends Error {
  status: number

  constructor() {
    super()
    this.status = 0
  }
}

export const createError = (status: number, message: string) => {
  const err = new CustomError()
  err.status = status
  err.message = message
  return err
}
