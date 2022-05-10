
export type ValidatorFieldType = 'email' | 'password'

const inputValidator = (value: string, type: ValidatorFieldType): string => {
    switch (type) {
        case 'email':
            return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ? '' : 'Invalid email'
        case 'password':
            return /^[a-zA-Z0-9!@#$%^&*]{6,16}$/i.test(value) ? '' : 'Invalid password'
        default:
            return ''
    }
}

export default inputValidator