import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Home from '../pages/Home'
import ProdOverviews from '../pages/ProdOverviews'
import Dashboard from '../auth/admin/Dashboard'
import SiderLayout from '../auth/comps/siderLayout/SiderLayout'
import Regisetr from '../pages/Regisetr'
import Login from '../pages/Login'
import TabelListUsers from '../auth/admin/users/TabelListUsers'
import ProdAdmin from '../auth/admin/pages/ProdAdmin'
import ProdAdminDetail from '../auth/admin/pages/ProdAdminDetail'
import CatAdmin from '../auth/admin/pages/CatAdmin'
import CatAdminDetail from '../auth/admin/pages/CatAdminDetail'
import useAuth from '../hooks/useAuth'
import CollectionAdmin from '../auth/admin/pages/CollectionAdmin'
import CollectionAdminDetail from '../auth/admin/pages/CollectionAdminDetail'
import SingleProdCat from '../pages/SingleProdCat'

const AppRoutes = () => {
    const { currentUser } = useAuth()
    // console.log(currentUser);

    return (
        <BrowserRouter>
            {/* Menus */}
            <Routes>
                <Route path='/*' element={<Navbar />} />
                {currentUser?.role === "admin" && <Route path='admin/*' element={<SiderLayout />} />}
            </Routes>
            {/* User (free routes) */}
            <Routes>
                {/* Auth */}
                <Route path='/register' element={<Regisetr />} />
                <Route path='/login' element={<Login />} />
                {/* Store */}
                <Route index element={<Home />} />
                <Route path='/products/:id' element={<ProdOverviews />} />
                <Route path='/category/:id' element={<SingleProdCat />} />
                {/* Not found */}
                <Route path='/*' element={<h2>Page 404</h2>} />
            </Routes>
            {/* Admin (routes protected!)*/}
            {currentUser?.role === "admin" && <Routes>
                <Route path='/admin' element={<Dashboard />} />
                <Route path='/admin/products' element={<ProdAdmin />} />
                <Route path='/admin/products/:id' element={<ProdAdminDetail />} />
                <Route path='/admin/categories' element={<CatAdmin />} />
                <Route path='/admin/categories/:id' element={<CatAdminDetail />} />
                <Route path='/admin/collections' element={<CollectionAdmin />} />
                <Route path='/admin/collections/:id' element={<CollectionAdminDetail />} />
                <Route path='/admin/users' element={<TabelListUsers />} />
                <Route path='/admin/*' element={<h2 className=' ml-16 md:ml-44 px-5 py-20 md:px-10 md:py-28'>Page 404 admin</h2>} />
            </Routes>}
        </BrowserRouter>
    )
}

export default AppRoutes