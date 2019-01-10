import React from 'react';
import PropTypes from 'prop-types'
import './Item.css';

function Item ({item, children}) {
    return (
        <div className="item">
            <div className="item-left">
                <div className="item-image">
                    <img className="item-img" src={item.image} />
                </div>
                <div className="item-name">
                    {item.name}
                </div>
                <div className="item-description">
                    {item.description}
                </div>
            </div>
            <div className="item-right">
                <div className="item-price">
                    ${item.price}
                </div>
                {children}
            </div>
        </div>
    );
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    // onAddToCart: PropTypes.func.isRequired
    children: PropTypes.node
}

export default Item;