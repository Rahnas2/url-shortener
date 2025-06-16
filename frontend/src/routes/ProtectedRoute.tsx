
import React, { type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '../store'

type Props = {
    children: ReactNode
}

const ProtectedRoute: React.FC<Props> = ({children }) => {

    const { accessToken } = useSelector((state: RootState) => state.auth)

    if (!accessToken) return <Navigate to="/login" replace />

    return children
}

export default ProtectedRoute