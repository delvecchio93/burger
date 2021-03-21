import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            activeClassName={classes.active} //Klasa NavLinka je po defaultu active, posto mi imamo a.active u nasem css-u nece se ovde aktivirati active class, zato ovde mozemo da stavimo activeclassname da bude classes.active
            exact={props.exact} //Ovo smo stavili jer na Orders oba svetle jer je za BurgerBuilder link samo / i gleda se kao prefiks pa se stavlja exact
            to={props.link}>{props.children}</NavLink>
    </li>
)

export default navigationItem;