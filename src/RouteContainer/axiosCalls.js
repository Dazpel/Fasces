import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  //? (baseURL = 'here should be your production endpoint')
  ? (baseURL = window.location.origin)
  : (baseURL = 'http://localhost:5000');

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get('/is-logged-in')
  },
  signUp: async (user) => {
    return await service.post('/signup', user)
  },
  logIn: async (user) => {
    return await service.post('/login', user)
  },
  imageList: async () => {
    return await service.get('/imageList')
  },
  triggerEmail: async (userArr) => {
    return await service.post('/sendEmail', userArr)
  },
  uploadToDB: async (img) => {
    return await service.post('/addImg', img)
  },
  uploadToCD: async (img) => {
    return await service.post('/createUrl', img)
  }
};

export default actions;