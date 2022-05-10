
export type RegistrationValidatorFieldType = 'email' | 'password' | 'password2'

const registrationInputValidator = (type: RegistrationValidatorFieldType, value: string, password1?: string ): string => {
    switch (type) {
        case 'email':
            return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ? '' : 'Invalid email'
        case 'password':
            return /^[a-zA-Z0-9!@#$%^&*]{6,16}$/i.test(value) ? '' : 'Invalid password'
        case 'password2':
            return value === password1 ? '' : 'Please make sure your passwords match'
        default:
            return ''
    }
}

export default registrationInputValidator
