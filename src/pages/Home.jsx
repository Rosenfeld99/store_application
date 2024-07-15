import React from 'react'
import Layout from '../components/layout/Layout'
import CatList from '../components/categories/CatList'
import ProdList from '../components/products/ProdList'
import StrengthPoint from '../components/strengthPoint/StrengthPoint'
import Footer from '../components/footer/Footer'

const Home = () => {
  return (
    <div>
      <Layout/>
      <StrengthPoint/>
      <CatList/>
      <ProdList/>
      <Footer/>
    </div>
  )
}

export default Home