import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
   return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
   // template string
   return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
   console.log('check data 66666666 from service: ', data);
   return axios.put('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
   // return axios.delete('/api/delete-user', { id: userId })
   return axios.delete('/api/delete-user', {
      data: {
         id: userId
      }
   });
}

const editUserService = (inputData) => {
   return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
   return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
   return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorsService = () => {
   return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
   return axios.post('/api/save-infor-doctor', data)
}

const getDetailInfoDoctor = (inputId) => {
   return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
   return axios.post('/api/bulk-create-schedule', data);
}

export {
   handleLoginApi, getAllUsers, createNewUserService,
   deleteUserService, editUserService, getAllCodeService,
   getTopDoctorHomeService, getAllDoctorsService, saveDetailDoctorService,
   getDetailInfoDoctor, saveBulkScheduleDoctor
}