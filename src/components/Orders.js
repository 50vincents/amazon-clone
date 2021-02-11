import React, { useState, useEffect } from 'react'
import '../styles/Orders.css';
import { db } from '../firebase';
import Order from './Order';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function Orders() {
  const user = useSelector(selectUser);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db
      .collection('users')
      .doc(user?.uid)
      .collection('orders')
      .orderBy('created', 'desc')
      .onSnapshot(snapshot => (
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))
    } else {
      setOrders([])
    }
 
  }, [user])

  return (
    <div className='orders'>
      <h1>Your Orders</h1>

      <div className='orders-order'>
        {orders?.map(order => (
          <Order order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders
