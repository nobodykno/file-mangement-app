import { useState } from 'react'
import  Header from './components/layout/header/header'
import Login from './components/login/login'
import './App.css'
import React from 'react'
import Footer from './components/layout/footer/footer'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard/dashboard'
import AuthGuard from './guard/auth.guard'
import Sidebar from './components/layout/sidebar/sidebar'
import Projects from './components/Project/projects'
function App() {

  return (
    <>
    <Header /> 

    <Sidebar />

    <Routes>

{/* 1. Public Routes — anyone can access */}
<Route path="/login" element={<Login />} />



<Route element={<AuthGuard />}>
    <Route path="/dashboard" element={<Projects />} />
  </Route>
</Routes>
    <Footer />

       </>
  )
}

export default App
