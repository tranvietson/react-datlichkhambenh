import actionTypes from './actionTypes';
import { getAllCodeService, getAllDoctorsService, getAllUsers } from '../../services/userService';
import { createNewUserService, deleteUserService, editUserService, getTopDoctorHomeService, saveDetailDoctorService } from '../../services/userService';
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            });
            let res = await getAllCodeService("GENDER");
            // console.log('check >>>>>>>>>> gia tri tra ve tu api:', res)
            if (res && res.errCode === 0) {

                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart error: ', e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            // console.log('check >>>>>>>>>> gia tri tra ve tu api:', res)
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionStart error: ', e);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            // console.log('check >>>>>>>>>> gia tri tra ve tu api:', res)
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log('fetchRoleStart error: ', e);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log('>>>>>>>>>>>check data input value in Action:', data)
            let res = await createNewUserService(data);
            console.log('>>>>>> hoidanit check create user redux:', res)
            if (res && res.errCode === 0) {
                toast.success("Create user successly!!!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log('fetchRoleStart error: ', e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            // let res1 = await getTopDoctorHomeService(5);
            // console.log('>>>>>>> check topDoctorHome value: ', res1);
            // console.log('check >>>>>>>>>> gia tri tra ve tu api:', res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (e) {
            dispatch(fetchAllUserFailed())
            console.log('fetchAllUserFailed error: ', e);
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            // console.log('>>>>>> hoidanit check create user redux:', res)
            if (res && res.errCode === 0) {
                toast.success("Delete user successly!!!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            dispatch(deleteUserFailed())
            console.log('fetchRoleStart error: ', e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            //   console.log('>>>>>> hoidanit check edit user redux:', res)
            if (res && res.errCode === 0) {
                toast.success("Edit user successly!!!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(editUserFailed())
            }
        } catch (e) {
            dispatch(editUserFailed())
            console.log('fetchRoleStart error: ', e);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

export const getTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService();
            console.log('>>>>>>>>> topDoctors from adminAction:', res)
            if (res && res.errCode === 0) {
                dispatch(getTopDoctorsSuccess(res.data));
            } else {
                dispatch(getTopDoctorsFailed())
            }
        } catch (e) {
            dispatch(getTopDoctorsFailed())
            console.log('getTopDoctorsFailed error: ', e);
        }
    }
}

export const getTopDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    topDoctors: data
})

export const getTopDoctorsFailed = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
})

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService();
            console.log('>>>>>>>>> get allDoctor from adminAction:', res)
            if (res && res.errCode === 0) {
                dispatch(getAllDoctorsSuccess(res.data));
            } else {
                dispatch(getAllDoctorsFailed())
            }
        } catch (e) {
            dispatch(getAllDoctorsFailed())
            console.log('getTopDoctorsFailed error: ', e);
        }
    }
}

export const getAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    dataDr: data
})

export const getAllDoctorsFailed = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
})

export const saveDetailDoctor = (data) => {
    console.log('>>>>>>>>>>><<<<<<<<<<<<< du lieu gui sang server:', data);
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            console.log('>>>>>>>>> get allDoctor from adminAction:', res)
            if (res && res.errCode === 0) {
                toast.success("Save infor Detail Doctor succeed! ");
                dispatch(saveDetailDoctorSuccess());
            } else {
                toast.error("Save infor Detail Doctor error!");
                dispatch(saveDetailDoctorFailed())
            }
        } catch (e) {
            dispatch(saveDetailDoctorFailed())
            console.log('saveDetailDoctorFailed error: ', e);
        }
    }
}

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
})

export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
})

export const fetchAllSheduleTimes = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            console.log('>>>>>>>>> get allDoctor from adminAction:', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
            console.log('getTopDoctorsFailed error: ', e);
        }
    }
}

///////////////
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START,
            });
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailed())
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed())
            console.log('fetchRequiredDoctorInforFailed error: ', e);
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    allRequiredData: allRequiredData
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})
















