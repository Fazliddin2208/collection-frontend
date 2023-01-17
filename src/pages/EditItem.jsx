import React,{useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { FormattedMessage } from 'react-intl';

const EditItem = () => {

    const {_id} = useParams()
    const navigate = useNavigate();

    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
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
        formData.append("tegs", tegs);
        formData.append("image", image);
    
        console.log(formData)

        axios.put(`/api/items/${_id}`,formData)
            .then( res =>{
                if(res){
                    if(res.errors){
                        console.log('xato edit item res.errors')
                    }else{
                        setTitle(res.data.title)
                        setDesc(res.data.desc)
                        setTegs(res.data.tegs)
                        setImage(res.data.image)
                        navigate(`/item/${_id}`);
                    }
                }
            }
            )
            .catch( (error) => {
                console.log(error)
            }
            )
    }

    const [items, setItems] = useState();

    useEffect(()=>{
        getItems()
    },[items])

    let arr = []
    const getItems = async()=>{
        await axios.get("/api/items/" + _id)
            .then((res)=>{
                const items = res.data
                arr.push(items)
                setItems(arr)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <div>
            <h1 className='title'><FormattedMessage id="edit.item.head.title" /></h1>
            {items && items.map((item,index)=>(
                <div key={index}>
                    <form onSubmit={(e)=>handleSubmit(e)} encType="multipart/form-data">
                        <div className='col-actions'>
                            <label htmlFor='title'><FormattedMessage id="edit.item.form.title" /> </label><br />
                            <input name='title' id='title' defaultValue={item.title} onChange={(e) => {
                                const {value} = e.target
                                setTitle(value)
                            }} className='form-control' type="text" placeholder='Collection title' /><br />
                            <label htmlFor='desc'><FormattedMessage id="edit.item.form.desc" /></label><br />
                            <textarea name='desc' id='desc' defaultValue={item.desc} onChange={(e) =>{
                                const {value} = e.target
                                setDesc(value)
                            }} cols="50" rows="5"></textarea><br />
                            <label htmlFor='tegs'><FormattedMessage id="edit.item.form.tegs" /></label><br />
                            <input name='tegs' id='tegs' defaultValue={item.tegs} onChange={(e) => {
                                const { value } = e.target
                                setTegs(value)
                            }} type="text" placeholder='teg...' className='form-control' />
                            <br />
                            <input name='image' id='file'
                            onChange={onChangeFile}
                            type="file" />
                            <button type='submit' className='btn btn-outline-success'><FormattedMessage id="edit.item.form.submit" /></button>
                        </div>
                    </form>
                </div>
            ))}
            

        </div>
    );
};


export default EditItem;