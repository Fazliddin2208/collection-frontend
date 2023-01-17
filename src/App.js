import React, { useState } from 'react'
import { Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Register from './pages/Register'
import Profile from './pages/Profile'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Main from './pages/Main'
import './styles/style.css'
import CreateCol from './pages/CreateCol'
import Collection from './pages/Collection'
import EditCol from './pages/EditCol'
import CreateItem from './pages/CreateItem'
import Item from './pages/Item'
import EditItem from './pages/EditItem'
import Wrapper from './components/Wrapper'
import Collections from './pages/Collections'
import Items from './pages/Items'

export default function App() {

  return (
      <>
        <Wrapper>
          <Header />
          <div className='container my-container'>
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/admin" element={<Admin />} />
              <Route exact path="/me" element={<Profile />} />
              <Route exact path="/collections" element={<Collections />} />
              <Route exact path="/items" element={<Items />} />
              <Route exact path="/create-col" element={<CreateCol />} />
              <Route exact path="/collection/:_id" element={<Collection />} />
              <Route exact path="/edit-col/:_id" element={<EditCol />} />
              <Route exact path="/create-item/:_id" element={<CreateItem />} />
              <Route exact path="/item/:_id" element={<Item />} />
              <Route exact path="/edit-item/:_id" element={<EditItem />} />
            </Routes>
          </div>
        </Wrapper>
      </>
  )
}