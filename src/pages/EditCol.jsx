import React,{useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { FormattedMessage } from 'react-intl';

const EditCol = () => {

    const {_id} = useParams()
    const navigate = useNavigate();

    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const [topic, setTopic] = useState()
    const [tegs, setTegs] = useState([])
    const [image, setImage] = useState()
    
    const onChangeFile=(e)=>{
        setImage(e.target.files[0])
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const formData = new FormData()
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("topic", topic);
        formData.append("tegs", tegs);
        formData.append("image", image);
    
        console.log(formData)

        axios.put(`/api/collections/${_id}`,formData)
            .then( res =>{
                if(res){
                    if(res.errors){
                        console.log('error in here')
                    }else{
                        setTitle(res.data.title)
                        setDesc(res.data.desc)
                        setTegs(res.data.tegs)
                        setImage(res.data.image)
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

    const [collections, setCollections] = useState();

    useEffect(()=>{
        getCollections()
    },[collections])

    let arr = []
    const getCollections = async()=>{
        await axios.get("/api/collections/" + _id)
            .then((res)=>{
                const collections = res.data
                arr.push(collections)
                setCollections(arr)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <div>
            <h1 className='title'><FormattedMessage id="edit.col.head.title" /></h1>
            {collections && collections.map((collection,index)=>(
                <div key={index}>
                    <div className="action-form">
                        <form onSubmit={(e)=>handleSubmit(e)} encType="multipart/form-data">
                            <div className='col-actions'>
                                <label htmlFor='title'><FormattedMessage id="edit.col.form.title" /> </label><br />
                                <input name='title' id='title' defaultValue={collection.title} onChange={(e) => {
                                    const {value} = e.target
                                    setTitle(value)
                                }} className='form-control' type="text" placeholder='Collection title' /><br />
                                <label htmlFor='desc'><FormattedMessage id="edit.col.form.desc" /></label><br />
                                <textarea name='desc' id='desc' defaultValue={collection.desc} onChange={(e) =>{
                                    const {value} = e.target
                                    setDesc(value)
                                }} cols="50" rows="5"></textarea><br />
                                <label htmlFor='topic'><FormattedMessage id="edit.col.form.topic" /></label><br />
                                <select name='topic' defaultValue={collection.topic} id='topic' onChange={(e) => {
                                    const { value } = e.target
                                    setTopic(value)
                                }} className='form-select'>
                                    <option value="" selected disabled>Select topic</option>
                                    <option value="book">Book</option>
                                    <option value="silwervare">Silwervare</option>
                                    <option value="stamp">Post stamps</option>
                                </select><br />
                                <label htmlFor='tegs'><FormattedMessage id="edit.col.form.tegs" /></label><br />
                                <input name='tegs' id='tegs' defaultValue={collection.tegs} onChange={(e) => {
                                    const { value } = e.target
                                    setTegs(value)
                                }} type="text" placeholder='teg...' className='form-control' />
                                <br />
                                <input name='image' id='file'
                                onChange={onChangeFile}
                                type="file" />
                                <button type='submit' className='btn btn-outline-success'><FormattedMessage id="edit.col.form.submit" /></button>
                            </div>
                        </form>
                    </div>
                </div>
            ))}
            

        </div>
    );
};


export default EditCol;
