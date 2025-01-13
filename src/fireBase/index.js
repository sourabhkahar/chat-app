import { initializeApp } from "firebase/app";
import { getDatabase, ref, set ,onValue,push,update} from "firebase/database";
import { useChatRoomStore } from "../store/chatroom";
import { getStorage,ref as storageRef, uploadBytes } from "firebase/storage";
const chatRoomStore = useChatRoomStore()

const firebaseConfig = {
    apiKey: "AIzaSyDYtrqMPNvPOfeDuBkvPLckc_UMsOcgUO0",
    authDomain: "sylvan-earth-340013.firebaseapp.com",
    databaseURL: "https://sylvan-earth-340013-default-rtdb.firebaseio.com",
    projectId: "sylvan-earth-340013",
    storageBucket: "sylvan-earth-340013.appspot.com",
    messagingSenderId: "280946890317",
    appId: "1:280946890317:web:5f08f82ab803af4513ae04",
    storageBucket: 'gs://sylvan-earth-340013.appspot.com'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage();
const firebaseStorageRef = storageRef(storage,'DP');
const users = ref(db, 'users/')
const chatRooms = ref(db, 'chatrooms/')

const addchatRooms = async(data)=>{
  try {
    const newChatRoomRef = push(chatRooms);
    set(newChatRoomRef,{roomName:data})
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const getRooms = ()=>{
  try {
    let roomArr = []
    onValue(chatRooms,(snapshot) => {
      roomArr = []
      chatRoomStore.setRoom([])
      snapshot.forEach((doc) => {
          roomArr.push({
            roomName: doc.val().roomName.room ,
            key:doc.key
          })
      });
      chatRoomStore.setRoom(roomArr)
    })
  } catch (error) {
    return roomArr
  }
}

const getChats = () =>{
  let chatArr = []
  chatRoomStore.setChats([])
  const chats = ref(db, 'chatrooms/'+chatRoomStore.roomId+'/chats')
  onValue(chats,(snapshot) => {
    chatArr = []
    snapshot.forEach((doc) => {
        chatArr.push({
          nickname:doc.val().nickname,
          message:doc.val().message,
          sendDate:doc.val().sendDate
        })
    });
    chatRoomStore.setChats(chatArr)
  })
}

const sendMessage = (payload)=>{
  addMessage(payload)
}

const addMessage = (data)=>{
  const chats = ref(db, 'chatrooms/'+chatRoomStore.roomId+'/chats')
  const newChatRef = push(chats);
  set(newChatRef,data)
}

const updateChatStatus = (oldRoomId)=>{
  try {
    // let chatRoomTpUpdate = ref(db, 'chatrooms/'+chatRoomStore.roomId)
    const updates = {};
    if(updates['/chatrooms/' + oldRoomId + '/roomName/status']){
      updates['/chatrooms/' + oldRoomId + '/roomName/status'] = false;
      updates['/chatrooms/' + chatRoomStore.roomId + '/roomName/status'] = true;
      update(ref(db), updates);
    }
  } catch (error) {
    console.log(error)
  }
}

const uploadProfilePic = async(file)=>{
  try {
    // 'file' comes from the Blob or File API
    let getImageUrl = await uploadBytes(firebaseStorageRef, file)
    debugger
    // .then((snapshot) => {
    //   console.log('Uploaded a blob or file!');
    // });
  } catch (error) {
   console.log(error)
  }
}

const signUp = (payload,file) =>{
  return new Promise((resolve,reject)=>{
    try {
      //Note insert user
      const newUser = push(users);
      const newUsersRef = push(users);
      set(newChatRoomRef,{roomName:data})
      return true
      // set(newUser,{roomName:payload})
      // //Note Upload pic
      // let getImageUrl = uploadProfilePic(file)
      // debugger
    } catch (error) {
      console.log('signUp',error)
    }
  })
}

export default{
  onValue,
  addchatRooms,
  getRooms,
  getChats,
  sendMessage,
  updateChatStatus,
  signUp
}
