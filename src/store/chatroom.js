import { createPinia,defineStore } from 'pinia';
import { useStorage } from "@vueuse/core"
import { ref } from 'vue'
export const pinia = createPinia();

export const useChatRoomStore = defineStore('chatroom', () => {
    const roomList = useStorage('room',ref([]))
    const chats = useStorage('chats',ref([]))
    const roomId = useStorage('roomId',ref(null))
    const setRoom = (payload) =>{
      roomList.value = payload
    }
    const setRoomId = (payload) =>{
      roomId.value = payload
    }
    const setChats = (payload) =>{
      chats.value = payload
    }
    return { roomList, setRoom ,roomId, setRoomId ,chats, setChats}
  })
