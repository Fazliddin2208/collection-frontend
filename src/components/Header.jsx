import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Context } from './Wrapper'
import { Stack, Autocomplete, TextField  } from '@mui/material';

const Header = (props) => {
  const context = useContext(Context)

  const [theme, setTheme] = useState(1)

  function changeTheme(){
    if(theme === 0){
      setTheme(theme+1)
    }else setTheme(theme-1)
  }

  const [collections,setCollections] = useState([])

  useEffect(()=>{
    fetchCollections()
  },[collections])

  const fetchCollections = async() =>{
    await axios.get('/api/collections')
        .then(res=>{
            const collections = res.data
            setCollections(collections)
        })
        .catch(err=>{
            console.log(err)
        })
  }

  const [searchTerm, setSearchTerm] = useState('')

  const handleClick = () =>{
    searchTerm = ""
  }
  

  return (
    <div>
      <header>        
        <nav className="navbar navbar-expand-md navbar-dark bg-primary" style={{opacity:"0.98"}}>
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              <h1>Lib</h1>
            </Link>
            
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="navbar-collapse collapse"
              id="navbarCollapse"
              style={{}}
            >
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link
                    to="/collections"
                    className="d-flex align-items-center nav-link mb-2 mb-lg-0 text-light text-decoration-none"
                  >
                    <FormattedMessage id="header.menu.link1" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/items"
                    className="d-flex align-items-center nav-link mb-2 mb-lg-0 text-light text-decoration-none"
                  >
                    <FormattedMessage id="header.menu.link2" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/about"
                    className="d-flex align-items-center nav-link mb-2 mb-lg-0 text-light text-decoration-none"
                  >
                    <FormattedMessage id="header.menu.link3" />
                  </Link>
                </li>
              </ul>
              <div className="me-2">
                <input type="text" className="form-control search-bar" defaultValue="" placeholder="Search..." onChange={(e)=>{
                  setSearchTerm(e.target.value)
                }} />
                {collections && collections.filter((collection)=>{
                  if(searchTerm == ""){
                    return
                  }else if (collection.title.toLowerCase().includes(searchTerm.toLowerCase())){
                      return collection
                  }
                }).map((collection,index) =>(
                  <div className="search-result" key={index}>
                    <Link onClick={handleClick} to={`/collection/${collection._id}`}>{collection.title}</Link>
                    <p>{collection.desc}</p>
                  </div>
                ))}
              </div>
              <div className="header-actions">
                <i onClick={changeTheme} style={{fontSize:"25px", color:"#fff"}} className={theme ? 'fas fa-sun me-3' : 'fas fa-moon me-3'}></i>

                <select className="form-control" style={{maxWidth:"70px"}} value={context.locale} onChange={context.selectLang}>
                  <option value="en-US">Eng</option>
                  <option value="uz-UZ">Uzb</option>
                </select>

                <Link to="/me" className="me" title="Profile"><i className="fas fa-user ms-3" style={{fontSize:"25px", color:"#fff"}}></i></Link>
              </div>
            </div>
            
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
