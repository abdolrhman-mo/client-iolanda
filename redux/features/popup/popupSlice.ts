import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ActivePopupType = 
  | null 
  // Shipping Rate
  | 'shippingRateForm' | 'deleteShippingRate' | 'resetShippingRate' | 'deleteLastRateError' 
  // Cart
  | 'navCart' | 'mobileNav' 
  // Order
  | 'orderLoading'

interface SetActivePopupPayload {
  activePopup: ActivePopupType
  popupPayload?: number
}



interface PopupState {
  isOverlayVisible: boolean
  activePopup: ActivePopupType
  popupPayload: any
}

const initialState: PopupState = {
  isOverlayVisible: false,
  activePopup: null,
  popupPayload: null
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showBackgroundShadow: state => {
      state.isOverlayVisible = true
    },
    hideBackgroundShadow: state => {
      state.isOverlayVisible = false
    },
    setActivePopup: (state, action: PayloadAction<SetActivePopupPayload>) => {
      const { activePopup, popupPayload } = action.payload
      // console.log('activePopup', activePopup)
      state.activePopup = activePopup
      state.isOverlayVisible = true

      if (popupPayload) {
        state.popupPayload = popupPayload
      }
    },
    hidePopup: state => {
      state.activePopup = null
      state.isOverlayVisible = false
    }
  }
})


export const { showBackgroundShadow, hideBackgroundShadow, setActivePopup, hidePopup } = popupSlice.actions

export const selectBackgroundShadow = (state: any) => state.popup.isOverlayVisible

export default popupSlice.reducer