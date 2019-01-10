import React, { Component } from 'react';
import './App.css';
import Nav from './Nav'
import {items} from './static-data'
import ItemPage from './ItemPage';
import CartPage from './CartPage';

class App extends Component {
  state = {
    activeTab: 0,
    cart: [],
    cartItems: []
  };

  handleAddToCart = (item) => {
    // ...this.state.cart is ES6 spread operator
    // cart: [1, 3, 1, ...]

    // this.setState({
    //   cart: [...this.state.cart, item.id]
    // });

    this.setState( (prevState, props) => {
      return {
        cart: [...prevState.cart, item.id],
      }
    });

    // this.setState( (prevState, props) => {
    //   return {
    //     cartItems: this.countCartItems()
    //   }
    // });
  }

  handleRemoveFromCart = (item) => {
    // Array.prototype.indexOf - return the index of the first occurance of a value in an array 
    let index = this.state.cart.indexOf(item.id);
    
    // Array.prototype.slice(0, 5) - return a section of an array from position index 0 up to position index 4 (not including position index 5)
    // We’re using the array spread operator twice here, in order to avoid mutating the state. 
    // We’re taking the left half of the array (up to but not including the item we want to remove) 
    // and concatenating it with the right half of the array (everything after the item being removed)
    this.setState({
      cart: [
        ...this.state.cart.slice(0, index),
        ...this.state.cart.slice(index + 1)
      ]
    });
  }

  handleTabChange = (index) => {
    this.setState({
      activeTab: index
    });
  }

  countCartItems = () => {
    // Array.prototype.reduce()
    // The first time it is called, since the “previous iteration” hasn’t happened yet, 
    // it needs an initial value which we supplied as the last argument (the empty object {}). 
    // The initial value is optional though. If you don’t pass one, 
    // reduce will use the array’s first element as the initial value.

    // let a = [1, 2, 3, 4];
    // let total = a.reduce((sum, value) => {
    // return sum + value; }, 0);

    // The arrow function is called 4 times:
    //   (0, 1) => returns 1
    //   (1, 2) => returns 3
    //   (3, 3) => returns 6
    //   (6, 4) => returns 10
    // Then reduce returns the last return value (10)

    // create an object that count how many of each item is in the cart (cart array contains the id of an item)
    // itemCounts initialize to an empty object: {}
    let itemCounts = this.state.cart.reduce( (itemCounts, itemId) => {
      // if the key (the item id) is not in the object initalize to 0, else just assign with the object value
      itemCounts[itemId] = itemCounts[itemId] || 0;
      // increase the count number for the item id
      itemCounts[itemId]++;

      return itemCounts;
      // return the itemCounts object
      // itemId: item count
      // {
      //   1: 2,
      //   3: 1
      // }

    }, {});
    // console.log(itemCounts);

    // create an array of items
    let cartItems = Object.keys(itemCounts).map( itemId => {
      // find the item by its id
      let item = items.find( item => 
        item.id === parseInt(itemId, 10)
      );

      // create a new "item" and add a count property
      return {
          ...item,
          count: itemCounts[item.id]
      };
    });
    // cartItems = [
    //   {id: 1, name: ..., description: ..., price: ..., count: 2},
    //   {id: 3, name: ..., description: ..., price: ..., count: 1}
    // ]

    // console.log(cartItems);
    return cartItems;
  };

  renderContent() {
    switch (this.state.activeTab) {
      default:
      case 0: 
        return (
          <ItemPage 
            items={items} 
            onAddToCart={this.handleAddToCart}
          />      
        );

      case 1: return this.renderCart();
    }
  }

  renderCart() {
    const cartItems = this.countCartItems();
    
    return (
      <CartPage 
        items={cartItems} 
        onAddOne={this.handleAddToCart}
        onRemoveOne={this.handleRemoveFromCart}
      />
    );
  }

  render() {
    let {activeTab, cart} = this.state;
    const cartItems = this.countCartItems();
    // console.log(activeTab);
    return (
      <div className="App">
        <Nav activeTab={activeTab} items={cartItems} onTabChange={this.handleTabChange} />
        <main className="App-content">
          {/* <div>{this.state.cart.length} items</div> */}
          {this.renderContent()}
        </main>
      </div>
    );
  }
}

export default App;
