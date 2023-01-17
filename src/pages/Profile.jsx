import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie";
import { FormattedMessage } from 'react-intl';

const Profile = () => {

  const [cookies, setCookie, removeCookie] = useCookies([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.jwt) {
          navigate("/me");
        }else{
          navigate("/register")
        }
      }, [cookies, navigate]);

  const [user,setUser]=useState([]);

  const deleteCol=(elem)=>{
    axios.delete(`/api/collections/${elem._id}`)
  }

  useEffect(()=>{
    fetchUser()
  },[user,deleteCol])

  const fetchUser = async() =>{
    const response = await axios.get('/api/users/me')
    const user = await response.data
    setUser(user)
  }

  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.jwt) {
        navigate("/me");
      } else {
        const { data } = await axios.post(
          "https://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };


    return (
        <div>          
          <h4><FormattedMessage id="me.greeting.1" /> {user.name}</h4>
          <h4><FormattedMessage id="me.greeting.2" /> {user.email}</h4>
          <div className="profile-actions">
            <button className="btn btn-dark col col-3" onClick={logOut}><FormattedMessage id="me.action.out" /> <i className="fa-solid fa-right-from-bracket"></i></button>
            {user.isAdmin?
              <button className="btn btn-danger col col-3"><Link to="/admin" className='link-light'><FormattedMessage id="me.action.admin" /></Link></button> : null
            }
            <button className='btn btn-success col col-3 '><Link to="/create-col" className='link-light'><FormattedMessage id="me.action.create" /></Link></button>
          </div>
          <h1 className='text-center'><FormattedMessage id="me.body.title" /></h1>
          <div className="my-cards row" >
            {user.collections && user.collections.map((collection)=>(
              <div className="card my-card sm-3" key={collection._id}>
                <img
                  src={collection.photo}
                  className="card-img-top"
                  alt="This is item's image"
                />
                <div className="card-body">
                  <h5 className="card-title"><Link to={`/collection/${collection._id}`}>{collection.title}</Link></h5>
                  <p className="card-text">
                    {collection.desc}
                  </p>
                  <p>{collection.topic}</p>
                  {collection.tegs.map((teg)=>(
                    <div key={teg._id}>
                      <a href="#" className="my-teg">
                      {teg}
                    </a>
                    </div>
                  ))}
                </div>
                <div className="card-footer">
                  <div className="my-action">
                    <i className="fas fa-heart"></i>
                    <div className="actions">
                      <i onClick={()=>deleteCol(collection)} className='fas fa-trash' title='delete'></i>
                      <Link to={`/edit-col/${collection._id}`}><i className='fas fa-pen-to-square' title='edit'></i></Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          

        </div>
    );
};


export default Profile;