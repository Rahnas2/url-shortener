
import BrandIcon from './BrandIcon'
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import { CustomTextField } from './CustomTextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { login } from '../store/authSlice';
import toast from 'react-hot-toast';
import { CustomButton } from './CustomButton';
import { loginSchema } from '../validation/loginValidatoin';
import { ValidationError } from 'yup';

const LoginForm = () => {

    const dispatch = useDispatch<AppDispatch>()

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState<Partial<typeof data>>({});

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement;

        setData({ ...data, [name]: value })


        try {
            await loginSchema.validateAt(name, { ...data, [name]: value });

            // Clear the error for that field
            setError((prev) => ({
                ...prev,
                [name]: '',
            }));

        } catch (error: any) {
            setError((prev) => ({
                ...prev,
                [name]: error.message,
            }));
        }
    }

    const handleSubmit = async () => {

        try {

            //Validation 
            await loginSchema.validate(data, { abortEarly: false })
            setError({})


            setLoading(true)

            await dispatch(login({ email: data.email.trim(), password: data.password.trim() })).unwrap()
            toast.success('success')
        } catch (error: any) {

            if (error instanceof ValidationError) {
                const fieldErrors: Partial<typeof data> = {};

                error.inner.forEach((err) => {
                    if (err.path) fieldErrors[err.path as keyof typeof data] = err.message;
                });

                setError(fieldErrors);
            } else {
                toast.error(error as string);
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col rounded-md bg-secondary p-5 shadow-sm w-full'>
            {/* Brand Icon */}
            <BrandIcon mode='auth' />

            <div className='text-center'>Welcome back! Login in to continue</div>

            <Box sx={{
                p: 2, display: 'flex', flexDirection: 'column', gap: 3, width: '100%',
            }}>
                <CustomTextField onChange={handleChange} id="email" name='email' label="Email" type='email' value={data.email} variant="outlined" error={!!error?.email} helperText={error.email} />
                <CustomTextField onChange={handleChange} id="password" name='password' label="Password" type='password' value={data.password} autoComplete='off' variant="outlined" error={!!error.password} helperText={error.password} />
            </Box>

            <CustomButton loading={loading} loadingPosition='center' onClick={handleSubmit} sx={{ mx: 2 }}>
                Login
            </CustomButton>

            <p className='text-center mb-2 mt-4'>Don't have an account? <Link to="/register" className='text-accent'>Register</Link></p>
        </div>
    )
}

export default LoginForm