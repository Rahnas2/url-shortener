import type { ReactNode } from "react"
import type React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import type { RootState } from "../store"


type Props = {
    children: ReactNode
}

const PublicRoute: React.FC<Props> = ({ children }) => {

    const { accessToken } = useSelector((state: RootState) => state.auth)

    if (accessToken) {
        return <Navigate to="/" replace/>
    }
    return children
}

export default PublicRoute