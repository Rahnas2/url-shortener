
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { useEffect, useState } from 'react'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store'
import { refreshToken } from '../store/authSlice'
import EmailVerification from '../pages/EmailVerification'
import Spinner from '../components/Spinner'


const AppRoute = () => {

    const dispatch = useDispatch<AppDispatch>()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                setIsLoading(true)
                await dispatch(refreshToken()).unwrap()
            } catch (error) {
                console.error('error check authorized ', error)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuthentication()
    }, [])

    if(isLoading) return <div className='flex justify-center mt-50'><Spinner/></div>

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/login' element={<PublicRoute ><Login /></PublicRoute>} />
                <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
                 <Route path='/email-verified' element={<EmailVerification />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute