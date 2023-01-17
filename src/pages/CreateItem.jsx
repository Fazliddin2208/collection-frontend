import React, {useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { FormattedMessage } from 'react-intl';

const CreateItem = () => {

    const { _id } = useParams();

    const navigate = useNavigate();
    
    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const [tegs, setTegs] = useState([])
    const [image, setImage] = useState()
    const [collectionId, setCollectionId] = useState(_id)
    
    const handleSubmit = async(e)=>{
        e.preventDefault();

        const formData = new FormData()
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("tegs", tegs);
        formData.append("image", image);
        formData.append("collectionId", collectionId);
        

        console.log(formData)

        axios.post("/api/items/create",formData)
            .then( res =>{
                if(res){
                    if(res.errors){
                        console.log('error in here')
                    }else{
                        navigate("/collection/"+ _id);
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
        <div>
            <h1 className='title'><FormattedMessage id="create.item.head.title" /></h1>
            <div className="action-form">
                <form onSubmit={(e)=>handleSubmit(e)} encType="multipart/form-data">
                    <div className='col-actions'>
                        <label htmlFor='title'><FormattedMessage id="create.item.form.title" /> </label><br />
                        <input name='title' id='title' required onChange={(e) => {
                            const {value} = e.target
                            setTitle(value)
                        }} className='form-control' type="text" placeholder='Collection title' /><br />
                        <label htmlFor='desc'><FormattedMessage id="create.item.form.desc" /></label><br />
                        <textarea name='desc' id='desc' required onChange={(e) =>{
                            const {value} = e.target
                            setDesc(value)
                        }} cols="50" rows="5"></textarea><br />
                        <label htmlFor='tegs'><FormattedMessage id="create.item.form.tegs" /></label><br />
                        <input name='tegs' id='tegs' onChange={(e) => {
                            const { value } = e.target
                            setTegs(value)
                        }} type="text" placeholder='teg...' className='form-control' />
                        <br />
                        <input name='image' id='file' required onChange={(e) => {
                            const image = e.target.files[0]
                            setImage(image)
                        }} type="file" />
                        <button type='submit' className='btn btn-success'><FormattedMessage id="create.item.form.submit" /></button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default CreateItem;