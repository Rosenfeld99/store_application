import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Home from '../pages/Home'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route index element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes