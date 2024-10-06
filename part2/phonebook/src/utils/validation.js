const validateName = (name) => {
  const trimmedName = name.trim()

  if (trimmedName === '') {
    return 'Name cannot be empty'
  }

  return null
}

const validateNumber = (number) => {
  const trimmedNumber = number.trim()
  const phoneNumberPattern = /^[0-9-\s]+$/

  if (!phoneNumberPattern.test(trimmedNumber)) {
    return 'Invalid phone number'
  }

  return null
}

export const validatePerson = (name, number) => {
  const nameError = validateName(name)
  const numberError = validateNumber(number)

  if (nameError || numberError) {
    return { nameError, numberError }
  }

  return null
}
