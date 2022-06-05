import {lazy, Suspense} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import Loader from '../components/Loader'

const LandingPage = lazy(() => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(import('../pages/LandingPage')), 0)
    })
})
const Login = lazy(() => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(import('../pages/Login')), 0)
    })
})
const Todo = lazy(() => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(import('../pages/Todo')), 0)
    })
})

export const MyRoutes = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    return(
        <BrowserRouter>
            <Suspense fallback={<Loader/>}>
                <Routes>
                    {isLoggedIn !== 'true' && <Route path="/" element={<LandingPage/>} />}
                    {isLoggedIn !== 'true' && <Route path="/login" element={<Login/>} />}
                    {isLoggedIn === 'true' && <Route path="/home" element={<Todo/>} />}
                    <Route path="*" element={isLoggedIn === 'true' ? <Navigate to="/home" replace /> : <Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}