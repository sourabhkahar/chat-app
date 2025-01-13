<template>
  <!-- <div class="flex flex-col items-center justify-center w-screen max-h-screen bg-gray-100 text-gray-800 p-2"> -->
    <div class="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="flex flex-col flex-grow h-0 p-4 overflow-auto" id="chatdiv">
        <template v-if="chats.length > 0">
          <template v-for="chat in chats" :key="chat.key">
            <div v-if="chat.nickname === nickname" class="flex w-full mt-2 space-x-3 max-w-xs" >
              <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
              <div>
                <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                  <p class="text-sm">{{chat.message}}</p>
                </div>
                <span class="text-xs text-gray-500 leading-none">{{chat.sendDate}}</span>
              </div>
            </div>
            <div v-else class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
              <div>
                <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                  <p class="text-sm">{{chat.message}}</p>
                </div>
                <span class="text-xs text-gray-500 leading-none">{{chat.sendDate}}</span>
              </div>
              <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            </div>
          </template>
        </template>
      </div>
      <div class="bg-gray-300 p-4">
        <form action="" @submit.prevent="onSubmit">
          <input class="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…"  v-model="chatMessage"
                v-bind="chatMessageAttrs">
        </form>
      </div>
    </div>
  <!-- </div> -->
</template>

<script setup>
import { ref,computed, watch } from 'vue'
import firebase  from '../fireBase/index.js'
import { useChatRoomStore } from "../store/chatroom";
const chatRoomStore = useChatRoomStore()
import { useNotification } from "@kyvg/vue3-notification";
import config from '../config.js'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
const props = defineProps(['nickname','roomid'])
const { errors, defineField ,handleSubmit, meta} = useForm({
  validationSchema: yup.object({
    form: yup.object({
      chatMessage: yup.string().required('Room Name is Required')
    }),
  }),
});

const [chatMessage, chatMessageAttrs] = defineField('form.chatMessage');

const nickname = ref(props.nickname)
watch(() => props.roomid,(newval,oldval)=>{
  chatRoomStore.setRoomId(newval)
  chatRoomStore.setChats([])
  firebase.updateChatStatus(oldval);
  firebase.getChats();
},{
  immediate:true
})


const chats = computed(() => {
  chatRoomStore.setRoomId(props.roomid)
  return chatRoomStore.chats.length > 0 ? chatRoomStore.chats:[]
})

let onSubmit = handleSubmit((values)=>{
    sendChat(values.form);
})

const sendChat = (message) =>{
  try {
    var objDiv = document.getElementById("chatdiv");
    objDiv.scrollTop = objDiv.scrollHeight;
    if(!meta.value.valid){
      return
    }
    let payload = {
      type:'newmsg',
      nickname:nickname.value,
      message:message.chatMessage,
      sendDate: Date()
    }
    firebase.sendMessage(payload);
    chatMessage.value = null
  } catch (error) {
      console.log(error)
  }
}
</script>

<style>

</style>