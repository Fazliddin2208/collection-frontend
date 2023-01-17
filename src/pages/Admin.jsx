import React,{useEffect,useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import {useCookies} from 'react-cookie'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import { FormattedMessage } from "react-intl"

export default function Main() {

  const [check, setCheck] = useState({status:''})

  const del=(elem)=>{
    axios.delete(`/api/users/${elem._id}`)
  }

  const updateStatus=async(elem)=>{
      if(elem.isActive===true){
          check.isActive=false
      }else{
          check.isActive=true
      }
      await axios.put(`/api/users/${elem._id}`, check)
  }

  const [admin, setAdmin] = useState({role:''})
  
  const updateAdmin=(elem)=>{
    if(elem.isAdmin===false){
        admin.isAdmin=true
    }else{
        admin.isAdmin=true
    }
    
    axios.put(`/api/users/admin/${elem._id}`, admin)
  }

  const [users,setUsers]=useState([]);

  useEffect(()=>{
    fetchUsers()
  },[users,del,updateStatus,updateAdmin])

  const fetchUsers = async() =>{
    const response = await axios.get('/api/users')
    const users = await response.data
    setUsers(users)
  }

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
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
    <>
      <div className="container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th> <FormattedMessage id="admin.col.head1" /> </th>
                <th> <FormattedMessage id="admin.col.head2" /> </th>
                <th> <FormattedMessage id="admin.col.head3" /> </th>
                <th> <FormattedMessage id="admin.col.head4" /> </th>
                <th> <FormattedMessage id="admin.col.head5" /> </th>
                <th> <FormattedMessage id="admin.col.head6" /> </th>
                
              </tr>
            </thead>
            {users.map((user,index) => (
              <tbody key={user._id}>
                <tr>
                  <td>{index+1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isActive ? 
                        <h6 className='text-success'><FormattedMessage id="admin.user.status1" /></h6>
                        : <h6 className='text-dark'><FormattedMessage id="admin.user.status2" /></h6>
                      }
                  </td>

                  <td>
                    <button onClick={()=>updateStatus(user)} className={user.isActive ? 'btn btn-dark':'btn btn-success'}>
                        {
                            user.isActive ? <FormattedMessage id="admin.user.action1.1" /> : <FormattedMessage id="admin.user.action1.2" />
                        }
                    </button>
                    <button className='btn btn-danger mx-2' onClick={()=>del(user)}><FormattedMessage id="admin.user.action1.3" /></button>
                  </td>

                  <td>{user.isAdmin ? 
                        <h6 className='text-success'><FormattedMessage id="admin.admin.status1" /></h6>
                        : <h6 className='text-dark'><FormattedMessage id="admin.admin.status2" /></h6>
                      }
                  </td>

                  <td>
                    <button onClick={()=>updateAdmin(user)} className={user.isAdmin ? 'btn btn-primary':'btn btn-success'}>
                        {
                            user.isAdmin ? <FormattedMessage id="admin.admin.action1.1" /> : <FormattedMessage id="admin.admin.action1.2" />
                        }
                    </button>
                    
                  </td>

                </tr>
              </tbody>

            ))}
          </table>
        <ToastContainer />
      </div>
    </>
  )
}