const APIURL = "http://192.168.50.52:3000";
const axios = require("axios");


export const getAllUsers = () => {
  return axios.get(`${APIURL}/user/contacts`, {
    headers: {
      authorization: `${localStorage.getItem("token")}`
    }
  })
}
export const getChatRooms = () => axios.get(`${APIURL}/chatroom/chatrooms`);
export const getChatRoomMessages = chatRoomName =>
  axios.get(`${APIURL}/chatroom/chatroom/messages/${chatRoomName}`);
export const joinRoom = room =>
  axios.post(`${APIURL}/chatroom/chatroom`, { room });