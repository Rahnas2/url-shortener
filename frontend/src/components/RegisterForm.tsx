
import Box from '@mui/material/Box';
import BrandIcon from "./BrandIcon"
import { Link } from "react-router-dom";
import { CustomTextField } from "./CustomTextField";
import { useState } from "react";
import { CustomButton } from "./CustomButton";
import { registerSchema } from '../validation/registerValidation';
import { ValidationError } from 'yup';
import toast from 'react-hot-toast';
import { registerApi } from '../apis/authApis';


const RegisterForm = () => {

    const initialData = {
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    };

    const [data, setData] = useState(initialData)

    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState<Partial<typeof data>>({})

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })

        try {

            await registerSchema.validateAt(name, { ...data, [name]: value })

            setError(prev => ({
                ...prev,
                [name]: ''
            }))

        } catch (error: any) {
            setError((prev) => ({
                ...prev,
                [name]: error.message,
            }));

            console.error('error ', error)
        }
    }

    const handleSubmit = async () => {
        try {
            await registerSchema.validate(data, { abortEarly: false })
            setError({})

            setIsLoading(true)
            const result = await registerApi(data.name.trim(), data.email.trim(), data.mobile.trim(), data.password.trim())
            toast.success(result.message)
            setData(initialData)

        } catch (error: any) {

            if (error instanceof ValidationError) {
                const fieldErrors: Partial<typeof data> = {};

                error.inner.forEach((err) => {
                    console.error('error ', err)
                    if (err.path) fieldErrors[err.path as keyof typeof data] = err.message;
                });

                setError(fieldErrors);
            } else {   
                console.error('error register ', error)  
                toast.error(error?.response?.data?.message || 'something went wrong');
            }

        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="flex flex-col rounded-md bg-secondary p-5 shadow-sm">
            {/* Brand Icon */}
            <BrandIcon mode="auth" />

            <div className='text-center'>Create your account to get started</div>

            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 3, width: '400px' }}>
                <CustomTextField onChange={handleChange} id="name" name='name' label="Name" type='text' value={data.name} variant="outlined" error={!!error.name} helperText={error.name} />
                <CustomTextField onChange={handleChange} id="email" name='email' label="Email" type='email' value={data.email} variant="outlined" error={!!error.email} helperText={error.email} />
                <CustomTextField onChange={handleChange} id="mobile" name='mobile' label="Mobile" type='text' value={data.mobile} variant="outlined" error={!!error.mobile} helperText={error.mobile} />
                <CustomTextField onChange={handleChange} id="password" name='password' label="Password" type='password' value={data.password} variant="outlined" error={!!error.password} helperText={error.password} />
                <CustomTextField onChange={handleChange} id="confirm-password" name='confirmPassword' label="Confirm Password" type='password' value={data.confirmPassword} variant="outlined" error={!!error.confirmPassword} helperText={error.confirmPassword} />
            </Box>

            <CustomButton loading={isLoading} onClick={handleSubmit} sx={{ mx: 2 }} >Register</CustomButton>

            <p className='text-center mb-2 mt-4'>Already have an account? <Link to="/login" className="text-accent">Login</Link></p>

        </div>
    )
}

export default RegisterForm