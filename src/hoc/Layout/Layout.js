import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        return setShowSideDrawer(!showSideDrawer);
    };

    return(
        <React.Fragment>
            <Toolbar 
                drawerToggleClicked={sideDrawerToggleHandler}
                isAuth={props.isAuthenticated}/>
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={showSideDrawer} 
                closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}> 
                {props.children}
            </main>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null 
    };
};

export default connect(mapStateToProps) (Layout);