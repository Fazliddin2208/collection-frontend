import React,{useState, useEffect} from "react" 
import { Link, useNavigate } from "react-router-dom"
import {ToastContainer, toast} from 'react-toastify'
import { useCookies } from "react-cookie";
import axios from 'axios'
import '../styles/style.css'
import { FormattedMessage } from "react-intl";

export default function Register() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
    });

    const [cookies] = useCookies([]);

    useEffect(() => {
        if (cookies.jwt) {
          navigate("/");
        }
      }, [cookies, navigate]);

    const generateError = (err) => 
        toast.error((err),{
            position: 'bottom-right',
        })

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post("/api/users/register",{
                ...values,
            },
            {
                withCredentials: true
            });
            if(data){
                if(data.errors){
                    const { name, email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                    else if (name) generateError(name);
                }else{
                    navigate("/");
                    console.log(data)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="my-block">
        <div className="container my-form">
            <h2><FormattedMessage id="reg.head.sign" /></h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"><FormattedMessage id="reg.form.name" /></label>
                    <input 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        placeholder="Name"
                        onChange={(e) => setValues({...values, [e.target.name]: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"><FormattedMessage id="reg.form.email" /></label>
                    <input 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        placeholder="Email"
                        onChange={(e) => setValues({...values, [e.target.name]: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"><FormattedMessage id="reg.form.password" /></label>
                    <input 
                        type="password" 
                        name="password" 
                        className="form-control" 
                        placeholder="Password"
                        onChange={(e) => setValues({...values, [e.target.name]: e.target.value})} />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary form-control" type="submit">Sign up</button>
                </div>
                <div className="mb-3">
                    <p><FormattedMessage id="reg.footer.yes" /> <Link to="/login"><FormattedMessage id="reg.footer.log" /></Link></p>
                    <p><FormattedMessage id="reg.go.home" /> <Link to="/"><FormattedMessage id="reg.go.home.link" /></Link></p>
                </div>
            </form>
        </div>
        <div className="shape"></div>
        <ToastContainer />
    </div>
    
  )
}