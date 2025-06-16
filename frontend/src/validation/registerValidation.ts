import { object, ref, string } from "yup";

const phoneRegExp = /^[0-9]{10}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const registerSchema = object({
    name: string().trim().required('Required'),
    email: string().trim().email('Invalid').required('Required'),
    mobile: string().trim().matches(phoneRegExp, 'Phone number is not valid'),
    password: string().trim().matches(passwordRegex,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    ).required('Required'),
    confirmPassword: string().trim()
    .oneOf([ref('password'), undefined], "Passwords must match")
    .required("Required"),
})