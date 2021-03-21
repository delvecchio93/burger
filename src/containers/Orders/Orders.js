import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/order';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props => {

    const {onFetchOrders} = props;
    useEffect(() => {
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders]);
    
    let orders = <Spinner />;
    if(!props.loading){
        if(props.orders.length != 0){
            orders = props.orders.map(order => {
                console.log(order.id)
                return <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            });
        }else{
            orders = <p style={{textAlign:'center'}}><strong>There is no orders yet...</strong></p>;
        };
    };
    return orders;
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders, 
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(action.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));