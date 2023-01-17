import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { FormattedMessage } from 'react-intl';

const CreateCol = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const [topic, setTopic] = useState()
    const [tegs, setTegs] = useState()
    const [image, setImage] = useState()
    
    const handleSubmit = async(e)=>{
        e.preventDefault();

        const formData = new FormData()
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("topic", topic);
        formData.append("tegs", tegs);
        formData.append("image", image);

        axios.post("/api/collections/create",formData)
            .then( res =>{
                if(res){
                    if(res.errors){
                        console.log('error in here')
                    }else{
                        navigate("/me");
                    }
                }
            }
            )
            .catch( (error) => {
                console.log(error)
            }
            )
    }

    

    return (
        <>

            <h1 className='title'><FormattedMessage id="create.col.head.title" /></h1>  
            <div className="action-form">
                <form onSubmit={(e)=>handleSubmit(e)} encType="multipart/form-data">
                    <div className='col-actions'>
                        <label htmlFor='title'><FormattedMessage id="create.col.form.title" /> </label><br />
                        <input name='title' id='title' required onChange={(e) => {
                            const {value} = e.target
                            setTitle(value)
                        }} className='form-control' type="text" placeholder='Collection title' /><br />
                        <label htmlFor='desc'><FormattedMessage id="create.col.form.desc" /></label><br />
                        <textarea name='desc' id='desc' required onChange={(e) =>{
                            const {value} = e.target
                            setDesc(value)
                        }} cols="50" rows="5"></textarea><br />
                        <label htmlFor='topic'><FormattedMessage id="create.col.form.topic" /></label><br />
                        <select name='topic' id='topic' required onChange={(e) => {
                            const { value } = e.target
                            setTopic(value)
                        }} className='form-control'>
                            <option value="" selected disabled>Select topic</option>
                            <option value="book">Book</option>
                            <option value="silwervare">Silwervare</option>
                            <option value="stamp">Post stamps</option>
                        </select><br />
                        <label htmlFor='tegs'><FormattedMessage id="create.col.form.tegs" /></label><br />
                        <input name='tegs' id='tegs' onChange={(e) => {
                            const { value } = e.target
                            setTegs(value)
                        }} type="text" placeholder='teg...' className='form-control' />
                        <br />
                        <input name='image' id='file' required onChange={(e) => {
                            const image = e.target.files[0]
                            setImage(image)
                        }} type="file" />
                        <button type='submit' className='from-control btn btn-success'><FormattedMessage id="create.col.form.submit" /></button>
                    </div>
                </form>
            </div>
          
        </>
    );
};


export default CreateCol;