
import BrandIcon from './BrandIcon'
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { logout } from '../store/authSlice';
import { CustomButton } from './CustomButton';

const Navbar = () => {

    const dispatch = useDispatch<AppDispatch>()

    const [isLogouting, setIsLogouting] = useState(false)

    const handleLogout = async() => {
        try {
            setIsLogouting(true)
            await dispatch(logout())
        } catch (error) {
            console.error('error logouting ', error)
        } finally {
            setIsLogouting(false)
        }
    }
    return (
        <div className='bg-secondary flex justify-between items-center px-5 py-3 fixed top-0 left-0 right-0 z-50'>
            <BrandIcon />
            <CustomButton onClick={handleLogout} loading={isLogouting} sx={{px: 2}} startIcon={<LogoutIcon />}>
                Logout
            </CustomButton>
        </div>
    )
}

export default Navbar