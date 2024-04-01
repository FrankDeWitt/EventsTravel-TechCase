import dayjs from 'dayjs'

export const useValidations = () => {
  const emailValidation = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const phoneValidation = (phone: string) => {
    let result = true
    const strongRegex = new RegExp('^[0-9]{3}-[0-9]{6}$')
    result = strongRegex.test(phone)
    return result
  }

  const dateOfBirthValidation = (dateOfBirth: string | undefined) => {
    if (typeof dateOfBirth === 'undefined') {
      return false
    }
    const dateRegex = new RegExp('^([0-2]?[0-9]|3[0-1])/(0?[1-9]|1[0-2])/(19[0-9]{2}|20[0-1][0-9]|202[0-2])$')
    if (!dateRegex.test(dateOfBirth)) {
      return false
    }

    const parts = dateOfBirth.split('/')
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10)
    const year = parseInt(parts[2], 10)

    const currentYear = new Date().getFullYear()

    if (year < 1900 || year > currentYear) {
      return false
    }

    const date = new Date(year, month - 1, day)
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      return false
    }

    return true
  }

  const calculateAge = (birthdate: string) => {
    const formattedDate = birthdate.split('/').reverse().join('-')
    const formattedBirthDate = dayjs(formattedDate)
    const age = dayjs().diff(formattedBirthDate, 'year')
    if (dayjs(formattedBirthDate).isValid()) {
      return age
    }
  }
  return {
    emailValidation,
    phoneValidation,
    dateOfBirthValidation,
    calculateAge,
  }
}
