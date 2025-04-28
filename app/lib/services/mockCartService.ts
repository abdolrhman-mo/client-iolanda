import productsData from "@/app/lib/data/products.json"
import { CartItemType } from "../types/cartTypes"

interface CartItem {
  id: number
  product: any
  quantity: number
  size: {
    size_text: string
  }
  totalOrderItemsPrice: number
}

// Mock API functions
export const fetchCartItemsAPI = async () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
  return cartItems
}

export const addToCartAPI = async (productId: number, size_text: string) => {
  const product = productsData.find(p => p.id === productId)
  if (!product) throw new Error('Product not found')

  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
  const existingItem = cartItems.find((item: CartItemType) => 
    item.product.id === productId && item.size === size_text
  )

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    const newItem: CartItemType = {
      id: cartItems.length > 0 ? cartItems[cartItems.length - 1].id + 1 : 1,
      product,
      quantity: 1,
      size: size_text,
      totalOrderItemsPrice: product.price
    }
    cartItems.push(newItem)
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  return existingItem || cartItems[cartItems.length - 1]
}

export const changeCartItemsQuantityAPI = async (cartItemId: number, newQuantity: number) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
  const item = cartItems.find((item: CartItem) => item.id === cartItemId)
  
  if (item) {
    item.quantity = newQuantity
    item.totalOrderItemsPrice = item.product.price * newQuantity
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }
  
  return { cartItemId, newQuantity }
}

export const removeItemFromCartAPI = async (cartItemId: number) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
  const updatedCartItems = cartItems.filter((item: CartItem) => item.id !== cartItemId)
  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
  return cartItemId
} 