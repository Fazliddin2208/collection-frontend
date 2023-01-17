import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import { FormattedMessage } from "react-intl";

const Collections = () => {

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

    return (
        <div>
            <h1 className='title'><FormattedMessage id="collections.head.title" /></h1>
            <div className="my-cards row" >
                {collections && collections.map((collection,index)=>(
                    <div className="card my-card sm-3" key={index}>
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
                        {collection.tegs.map((teg)=>(
                            <a href="#" className="my-teg">
                            {teg}
                            </a>
                        ))}
                        </div>
                </div>
                ))}
            </div>
        </div>
    );
};


export default Collections;