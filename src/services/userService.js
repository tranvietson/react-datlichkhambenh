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

const getScheduleDoctorByDate = (doctorId, date) => {
   return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctorById = (doctorId) => {
   return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorById = (doctorId) => {
   return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postPatientBookApointment = (data) => {
   return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookApointment = (data) => {
   return axios.post('/api/verify-book-appointment', data)
}

const createNewSpecialty = (data) => {
   return axios.post('/api/create-new-specialty', data)
}

const getAllSpecialty = () => {
   return axios.get(`/api/get-specialty`)
}

export {
   handleLoginApi, getAllUsers, createNewUserService,
   deleteUserService, editUserService, getAllCodeService,
   getTopDoctorHomeService, getAllDoctorsService, saveDetailDoctorService,
   getDetailInfoDoctor, saveBulkScheduleDoctor, getScheduleDoctorByDate,
   getExtraInforDoctorById, getProfileDoctorById, postPatientBookApointment,
   postVerifyBookApointment, createNewSpecialty, getAllSpecialty
}