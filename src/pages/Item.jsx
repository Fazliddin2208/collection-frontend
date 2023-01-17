import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';

const Item = () => {

    const { _id } = useParams();

    const navigate = useNavigate();

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
                // console.log(arr)
                setItems(arr)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    const deleteItem=(elem)=>{
        axios.delete(`/api/items/${elem._id}`)
    }

    return (
        <div>
            <h1 className="title"><FormattedMessage id="item.head.title" /></h1>
            {items && items.map((item, index)=>(
                <div className='container' key={index}>
                        
                        <div className='row my-headers'>
                            <div className='head1'>
                                <img src={item.photo} alt="item photo" />
                            </div>
                            <div className='head2'>
                                <p><strong><FormattedMessage id="item.body.title" />:</strong> {item.title}</p>
                                <p><strong><FormattedMessage id="item.body.desc" />:</strong> {item.desc}</p>
                                <p><strong><FormattedMessage id="item.body.teg" />:</strong> {item.tegs}</p>
                                <div className='row in-actions'>
                                    <button className='btn btn-outline-warning' onClick={()=>navigate(-1)}><FormattedMessage id="item.action.back" /></button>
                                    <Link className='btn btn-outline-success' to={`/edit-item/${_id}`}><FormattedMessage id="item.action.edit" /></Link>
                                    <button className='btn btn-outline-danger' onClick={()=>deleteItem(item)}><FormattedMessage id="item.action.delete" /></button>
                                </div>
                            </div>
                        </div>
                        <div className='comments'>
                            <p>{item.comments}</p>
                        </div>
                </div>
            ))}
        </div>
    );
};


export default Item;