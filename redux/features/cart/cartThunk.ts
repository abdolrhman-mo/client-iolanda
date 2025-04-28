import { createAsyncThunk } from "@reduxjs/toolkit"
import { addToCartAPI, changeCartItemsQuantityAPI, fetchCartItemsAPI, removeItemFromCartAPI } from "@/app/lib/services/mockCartService"
import { setActivePopup } from "@/redux/features/popup/popupSlice"
import { RootState } from "@/redux/store"
import productsData from "@/app/lib/data/products.json"
import { CartItemType } from "@/app/lib/types/cartTypes"
import { ProductType } from "@/app/lib/types/productTypes"

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
  const data = await fetchCartItemsAPI()
  return data
})

export const fetchBuyItNowItem = createAsyncThunk('cart/fetchBuyItNowItem', async ({
  buyItNowId,
  buyItNowSize,
}: {
  buyItNowId: number
  buyItNowSize: string
}) => {
  const product = productsData.find((item: ProductType) =>
      Number(item.id) === Number(buyItNowId)
  )
  if (!product) throw new Error('Product not found')
  
  const buyItNowItem: CartItemType = {
      id: 0,
      product,
      quantity: 1,
      size: buyItNowSize,
      totalOrderItemsPrice: product.price,
  }
  
  return buyItNowItem
})

export const addItemToCart = createAsyncThunk('cart/addToCart', async (
    { product, size_text }: { product: ProductType; size_text: string },
    { dispatch, getState }
) => {
    const productSizeQuantity = product.sizes.find((size) => size.size_text === size_text)?.quantity || 0
    
    const state = getState() as RootState
    const { items } = state.cart
    if (items.length === 0) dispatch(fetchCartItems())

    const existingItem = items.find((item) => 
      item.product.id === product.id && item.size === size_text
    )

    let changeQuantity = false
    let cartItem: CartItemType | null = null

    if (productSizeQuantity > 0) {
      if (existingItem) {
        if (existingItem.quantity < productSizeQuantity) {
          const response = await addToCartAPI(product.id, size_text)
          cartItem = response
          changeQuantity = true
        }
      } else {
        const response = await addToCartAPI(product.id, size_text)
        cartItem = response
      }
    }
    
    dispatch(setActivePopup({ activePopup: 'navCart' }))

    return { cartItem, changeQuantity }
})

export const changeCartItemQuantity = createAsyncThunk('cart/changeCartItemQuantity', async (
    { cartItemId, newQuantity }: { cartItemId: number; newQuantity: number },
    { dispatch }
) => {
    if (newQuantity > 0) {
      await changeCartItemsQuantityAPI(cartItemId, newQuantity)
    } else {
      await removeItemFromCartAPI(cartItemId)
    }
    return { cartItemId, newQuantity }
})

export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (
  { cartItemId }: { cartItemId: number },
  { dispatch }
) => {
  await removeItemFromCartAPI(cartItemId)
  return cartItemId
})

