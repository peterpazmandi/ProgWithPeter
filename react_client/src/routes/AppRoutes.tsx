import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import ProfilePage from '../pages/profile/ProfilePage'
import TutorialPage from '../pages/tutorial/TutorialPage'
import ProtectedRoutes from './ProtectedRoutes'
import PublicRoutes from './PublicRoutes'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tutorial/:slug' element={<TutorialPage />} />

            {/* Protected Routes */}
            <Route path='/' element={<ProtectedRoutes />} >
            </Route>

            {/* Public Routes */}
            <Route path='/' element={<PublicRoutes />} >
                <Route path='/profile' element={<ProfilePage />} />
            </Route>

        </Routes>
    )
}

export default AppRoutes