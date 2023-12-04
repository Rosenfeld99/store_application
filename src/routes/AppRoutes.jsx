import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Home from '../pages/Home'
import ProdOverviews from '../pages/ProdOverviews'
import Dashboard from '../auth/admin/Dashboard'
import SiderLayout from '../auth/comps/siderLayout/SiderLayout'
import ProdAdmin from '../auth/admin/ProdAdmin'
import ProdAdminDetail from '../auth/admin/ProdAdminDetail'
import Regisetr from '../pages/Regisetr'
import Login from '../pages/Login'

const AppRoutes = () => {

    return (
        <BrowserRouter>
            {/* Menus */}
            <Routes>
                <Route path='/*' element={<Navbar />} />
                <Route path='admin/*' element={<SiderLayout />} />
            </Routes>
            {/* Auth */}
            <Routes>
                <Route path='/register' element={<Regisetr />} />
                <Route path='/login' element={<Login />} />
            </Routes>
            {/* User */}
            <Routes>
                <Route index element={<Home />} />
                <Route path='/products/:id' element={<ProdOverviews />} />
            </Routes>
            {/* Admin */}
            <Routes>
                <Route path='/admin' element={<Dashboard />} />
                <Route path='/admin/products' element={<ProdAdmin />} />
                <Route path='/admin/products/:id' element={<ProdAdminDetail />} />
                <Route path='/admin/users' element={<ProdAdmin />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes