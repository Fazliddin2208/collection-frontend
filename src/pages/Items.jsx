import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';


const Items = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, [items]);
  const getItems = async () => {
    const response = await axios.get("/api/items/");
    const items = response.data;
    const item = items.item;
    setItems(item);
  };

    return (
        <div>
            <h1 className='title'><FormattedMessage id="items.head.title" /></h1>
            <div className="my-cards row" >
                {items && items.sort((a,b)=>(a.time > b.time ? -1: 1)).map((item, index) => (
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


export default Items;