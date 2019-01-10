import React from 'react';

const Nav = ({ activeTab, items, onTabChange }) => { 
    const [totalItems, totalCost] = items.reduce( (total, item) => {
        total[0] = total[0] || 0;
        total[0] += item.count;
        total[1] = total[1] || 0;
        total[1] += item.price * item.count;

        return total;
    }, []);

    return (
        <nav className="App-nav">
            <ul>
                <li className={`App-nav-item ${activeTab === 0 && 'selected'}`}>
                    {/* 
                        // passing a function this way always create a new function everytime a component is re-render
                        // it is a bad for performance
                        <a onClick={() => onTabChange(0)}>Items</a> 
                    */}
                    {/* // one way to avoid create a new function to prop */}
                    <NavLink index={0} onClick={onTabChange}>Item</NavLink>
                </li>
                <li className={`App-nav-item ${activeTab === 1 && 'selected'}`}>
                    {/* <a onClick={() => onTabChange(1)}>Cart</a> */}
                    <NavLink index={1} onClick={onTabChange}>Cart</NavLink>
                </li>
            </ul>
            {totalItems && 
            <div className="app-nav-itemCount">
                <NavLink index={1} onClick={onTabChange}>
                    <i className="fas fa-shopping-cart"></i> {totalItems} items (${totalCost.toFixed(2)})
                </NavLink>
            </div>
            }
        </nav>
    );
};

class NavLink extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.index);
    }

    render() {
        return (
            <a onClick={this.handleClick}>
                {this.props.children}
            </a>
        );
    }
}

export default Nav;