import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

// Special react syntax for importing SVG images
import { ReactComponent as Logo } from '../../assets/crown.svg';


import './header.style.scss';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className="className" />
        </Link>
        <div className="options">
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className="option" to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option'
                onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            }
            <CartIcon />
        </div>
        {
            hidden ? null : <CartDropdown />
        }
    </div>
)

// mapStateToProps, with the use of connect, allow us to give this element
// the power to access the state.user.currentUser state from the user.Reducer
// This element will receive it as a prop, but it will be from the store, not from the 
// parent. So no prop drilling needed anymore. 
const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header)