import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate} from 'react-router-dom'
import { FormattedMessage } from 'react-intl';

const Collection = () => {

    const { _id } = useParams();

    const navigate = useNavigate();

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
                console.log(err, 'here')
            })
    }

    const deleteCol=(elem)=>{
        axios.delete(`/api/collections/${elem._id}`)
    }
    const deleteItem=(elem)=>{
        axios.delete(`/api/items/${elem._id}`)
    }

    return (
        <div>
            <h1 className='title'><FormattedMessage id="collection.head.title" /></h1>
            <div className="my-cards row" >
                {collections && collections.map((collection, index)=>(
                    <div className='container'>
                        
                        <div className='row my-headers'>
                            <div className='head1'>
                                <img src={collection.photo} alt="collection photo" />
                            </div>
                            <div className='head2'>
                                <p><strong><FormattedMessage id="collection.body.title" /></strong> {collection.title}</p>
                                <p><strong><FormattedMessage id="collection.body.desc" /></strong> {collection.desc}</p>
                                <p><strong><FormattedMessage id="collection.body.topic" /></strong> {collection.topic}</p>
                                <p><strong><FormattedMessage id="collection.body.teg" /></strong> {collection.tegs}</p>
                                <div className='row in-actions'>
                                    <button className='btn btn-outline-warning ' onClick={()=>navigate(-1)}><FormattedMessage id="collection.action.back" /></button>
                                    <Link className='btn btn-outline-success ' to={`/edit-col/${_id}`}><FormattedMessage id="collection.action.edit" /></Link>
                                    <button className='btn btn-outline-danger ' onClick={()=>deleteCol(collection)}><FormattedMessage id="collection.action.delete" /></button>
                                    <Link className='btn btn-outline-success ' to={`/create-item/${collection._id}`}><FormattedMessage id="collection.action.create" /></Link>
                                
                                </div>
                            </div>
                        </div>
                        <div className='my-body my-cards row'>
                            <h1 className='title'><FormattedMessage id="collection.items.title" /></h1>
                            {collection.items.map((item,index)=>(
                                <div className="card my-card sm-3" key={index}>
                                
                                    <img
                                        src={item.photo}
                                        className="card-img-top"
                                        alt="This is item's image"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title"><Link to={`/item/${item._id}`}>{item.title}</Link></h5>
                                        <p className="card-text">
                                            {item.desc}
                                        </p>
                                        {item.tegs.map((teg)=>(
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
                                                <i onClick={()=>deleteItem(item)} className='fas fa-trash' title='delete'></i>
                                                <Link to={`/edit-item/${item._id}`}><i className='fas fa-pen-to-square' title='edit'></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    </div>                    
                ))}
            </div>
        </div>
    );
};


export default Collection;