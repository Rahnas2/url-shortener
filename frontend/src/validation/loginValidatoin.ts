
import { object, string } from 'yup'

export const loginSchema = object({
    email: string().trim().email('Invalid Email').required('Required'),
    password: string().trim().required('Required')
})