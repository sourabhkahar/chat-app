import { createPinia,defineStore } from 'pinia';
import { useStorage } from "@vueuse/core"
import { ref } from 'vue'

export const pinia = createPinia();
export const useUserStore = defineStore('user', () => {
  const user = useStorage('user',ref({
    email:null,
    access_token:null,
  }))
  const setUser = (payload) =>{
    user.value.email = payload.email
    user.value.access_token = payload.accessToken
  }
  const logout = () =>{
    user.value.email = null
    user.value.access_token = null
  }

  return { user, setUser,logout }
})

