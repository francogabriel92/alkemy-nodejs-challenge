module.exports = (name, type, field, message) => {
  const error = new Error(message)
  error.name = name
  error.type = type
  error.field = field
  error.message = message
  return error
}