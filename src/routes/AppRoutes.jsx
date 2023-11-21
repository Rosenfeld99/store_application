import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Home from '../pages/Home'
import ProdOverviews from '../pages/ProdOverviews'
import Dashboard from '../auth/admin/Dashboard'
import SiderLayout from '../auth/comps/siderLayout/SiderLayout'
import ProdAdmin from '../auth/admin/ProdAdmin'
import ProdAdminDetail from '../auth/admin/ProdAdminDetail'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/*' element={<Navbar />} />
                <Route path='admin/*' element={<SiderLayout />} />
            </Routes>
            {/* User */}
            <Routes>
                <Route index element={<Home />} />
                <Route path='/product/:id' element={<ProdOverviews />} />
            </Routes>
            {/* Admin */}
            <Routes>
                <Route path='/admin' element={<Dashboard />} />
                <Route path='/admin/products' element={<ProdAdmin />} />
                <Route path='/admin/products/:id' element={<ProdAdminDetail />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes