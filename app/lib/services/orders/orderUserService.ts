import { CartItemType } from "../../types/cartTypes"
import { OrderRequest, OrderResponse, OrderType } from "../../types/orderTypes"
import { transformOrderData, transformOrdersList } from "./orderUtility"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Fetch user orders
export const fetchUserOrdersAPI = async () => {
  try {
    const res = await fetch(`${API_URL}/orders/users-view/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('authToken')}`
      }
    })

    if (!res.ok) {
      console.error(`Error fetching orders: ${res.statusText}`)
    }

    const data = await res.json() || []

    // Remove empty orders(orders with no order items)
    const filteredOrders = data.filter((order: OrderType) => order.order_items.length > 0)
  
    const transformedOrder = await transformOrdersList(filteredOrders)

    // Add sizing details(size text instead of size id)
    // const ordersWithDetails = await addDetailsToOrders(filteredOrders)
    
    return transformedOrder

  } catch (error) {
    console.error('Failed to fetch orders:', error)
    throw error // Rethrow the error after logging it
  }
}

export const placeUserOrderAPI = async () => {
  try {
    const res = await fetch(`${API_URL}/orderItems/move-to-orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('authToken')}`
      },
    })

    if (!res.ok) {
      console.error(`Error: ${res.status}`)
    }

    const order = await res.json()

    console.log('order placed')

    const transformedOrder = transformOrderData(order.order_items)
    
    return transformedOrder
  } catch (error) {
    console.error('Error making order:', error)
    throw error
  }
}

export const addOrderDataAPI = async (
  orderId: number,
  orderData: OrderRequest,
) => {
    try {
      const res = await fetch(`${API_URL}/orders/users-view/${orderId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          user: {
            first_name: orderData.user.first_name,
            last_name: orderData.user.last_name
          },
          addressText: orderData.address.address_text,
          city: orderData.address.city,
          country: 'Egypt',
          phone_number: orderData.user.phone_number,
        })
      })
  
      if (!res.ok) {
        console.error(`Error: ${res.status}`)
      }
      
      const order = await res.json()

      console.log('added data to order')

      // console.log('add order data before transformation', order)
      
      const transformedOrder = await transformOrderData(order)

      // console.log('add order data after transformation', transformedOrder)
      
      return transformedOrder
    } catch (error) {
      console.error('Error making order:', error)
      throw error
    }
}

export const createBuyItNowOrderAPI = async (
  product_id: number,
  size_text: string,
) => {
  try {
    let headers: any = {
      'Content-Type': 'application/json',
    }

    let token = localStorage.getItem('authToken')
    if (token) {
      headers['Authorization'] = `Token ${token}`
    }
    
    // const res = await fetch(`${API_URL}/orderItems/buy-it-now/`, {
    const res = await fetch(`${API_URL}/order/`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        product_id,
        size_text,
      })
    })


    if (!res.ok) {
      console.error(`Error: ${res.status}`)
    }
    
    const data = await res.json()

    console.log('data', data)

    const transformedOrder = await transformOrderData(data.order_item)
    
    return transformedOrder
  } catch (error) {
    console.error('Error making order:', error)
    throw error
  }
}

export const createOrderAPI = async (
  orderData: OrderRequest
) => {
  try {
    console.log('aslkdfjla;sd')
    let headers: any = {
      'Content-Type': 'application/json',
    }

    let token = localStorage.getItem('authToken')
    if (token) {
      headers['Authorization'] = `Token ${token}`
    }
    
    // const res = await fetch(`${API_URL}/orderItems/buy-it-now/`, {
    const res = await fetch(`${API_URL}/orders/users-view/`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        order_first_name: orderData.user.first_name,
        order_last_name: orderData.user.last_name,
        addressText: orderData.address.address_text,
        city: orderData.address.city,
        country: 'Egypt',
        phone_number: orderData.user.phone_number,
      })
    })


    if (!res.ok) {
      console.error(`Error: ${res.status}`)
    }
    
    const data = await res.json()

    const transformedOrder = await transformOrderData(data)
    
    console.log('transformed data', transformedOrder)
    
    return transformedOrder
  } catch (error) {
    console.error('Error making order:', error)
    throw error
  }
}

export const createOrderItemAPI = async (
  order: number,
  product_id: number,
  size_text: string
) => {
  console.log('creaeraldfkajslfdsk;j')
  try {
    let headers: any = {
      'Content-Type': 'application/json',
    }

    let token = localStorage.getItem('authToken')
    if (token) {
      headers['Authorization'] = `Token ${token}`
    }
    
    // const res = await fetch(`${API_URL}/orderItems/buy-it-now/`, {
    const res = await fetch(`${API_URL}/orderItems/`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        product_id,
        size_text,
        order,
      })
    })


    if (!res.ok) {
      console.error(`Error: ${res.status}`)
    }
    
    const data = await res.json()

    console.log('order itemmmmm', data)
    
    return data
  } catch (error) {
    console.error('Error making order:', error)
    throw error
  }
}


// Guest functions

export const createGuestOrderAPI = async (
  orderData: OrderRequest
) => {
  try {
    const res = await fetch(`${API_URL}/orders/users-view/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        addressText: orderData.address.address_text,
        city: orderData.address.city,
        country: orderData.address.country,
        phone_number: orderData.user.phone_number,
        order_first_name: orderData.user.first_name,
        order_last_name: orderData.user.last_name,
      })
    })

    if (!res.ok) {
      console.error(`Error: ${res.status}`)
    }
    
    const data = await res.json()

    const transformedData = await transformOrderData(data)

    return transformedData
  } catch (error) {
    console.error('Error making order:', error)
    throw error
  }
}

export const addOrderItemToGuestOrderAPI = async (orderId: number, orderItem: CartItemType) => {
  try {
    const res = await fetch(`${API_URL}/orderItems/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: orderId,
        prdocut: orderItem.product,
        quantity: orderItem.quantity,
        size_text: orderItem.size,
        product_id: orderItem.product.id
      })
    })

    if (!res.ok) {
      console.error(`Error: ${res.status}`)
    }
    
    const data = await res.json()
    console.log('order item added', data)
    return data
  } catch (error) {
    console.error('Error making order:', error)
    throw error
  }
}