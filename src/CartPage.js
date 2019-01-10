import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import './CartPage.css';

const totalCost = (items) => {
    let totalCost = 0;

    items.forEach(item => {
        // console.log(`Price: ${item.price} Count: ${item.count}`);
        // console.log(item.price * item.count);
        totalCost += item.price * item.count;
    });

    return totalCost.toFixed(2);
};

function CartPage({items, onAddOne, onRemoveOne}) {
    let contentRender;

    if (items.length) {
        contentRender = 
            <React.Fragment>
                <ul className="cartpage-items">
                    {items.map( item => 
                        <li key={item.id} className="cartpage-item">
                            <Item item={item}>
                                <div className="cartItem-controls">
                                    <button
                                        className="cartItem-removeOne"
                                        onClick={() => onRemoveOne(item)}
                                    >
                                        &ndash;
                                    </button>
                                    <span className="cartItem-count">{item.count}</span>
                                    <button
                                        className="cartItem-addOne"
                                        onClick={() => onAddOne(item)}
                                    >
                                        +
                                    </button>
                                </div>
                            </Item>
                        </li>    
                    )}
                </ul>
                <div className="cartpage-totalCost">
                    {items.length > 0 && `Total: $${totalCost(items)}`}
                </div>
            </React.Fragment>

    } else {
        contentRender = 
            <div className="cartpage-empty">
                <p>Your cart is empty.</p>
                <p>Why not add some product to it?</p>
            </div>
    }

    return (
        contentRender
    );
}

CartPage.propTypes = {
    items: PropTypes.array.isRequired,
    onAddOne: PropTypes.func.isRequired,
    onRemoveOne: PropTypes.func.isRequired
};

export default CartPage;