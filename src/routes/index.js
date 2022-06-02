import {lazy, Suspense} from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
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
    return(
        <BrowserRouter>
            <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route path="/" element={<LandingPage/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/home" element={<Todo/>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}