import { ref} from 'vue'
import { defineStore } from 'pinia'

export const useFeatureStore = defineStore('feature', () => {
  const popupDiscount = ref(false)
  function openPopupDiscount() {
	popupDiscount.value=true
  }
  function closePopupDiscount() {
	popupDiscount.value=false
  }

  const warningTimer = ref(false)
  function warningTimerHandler(){
	warningTimer.value=true
  }

  const timeOver = ref(false)
  function timeOverHandler (){
	timeOver.value = true
  }
  return { closePopupDiscount, openPopupDiscount,popupDiscount,warningTimer,warningTimerHandler,timeOver,timeOverHandler }
})
