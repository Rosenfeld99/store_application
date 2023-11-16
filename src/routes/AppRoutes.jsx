import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Home from '../pages/Home'
import ProdOverviews from '../pages/ProdOverviews'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route index element={<Home />} />
                <Route path='/product/:id' element={<ProdOverviews />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes