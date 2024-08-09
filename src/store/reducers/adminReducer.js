import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTimes: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            // console.log('hoi dan it fire fetch gender start:', action);
            return {
                ...copyState

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            //  console.log('hoi dan it fire fetch gender suscess:', action);
            let copyState1 = { ...state };
            copyState1.genders = action.data;
            copyState1.isLoadingGender = false;
            // console.log('hoi dan it fetch gender success with copyState:', copyState1);
            return {
                ...copyState1
            }
        case actionTypes.FETCH_GENDER_FAILED:
            // console.log('hoi dan it fire fetch gender failed:', action);
            let copyState2 = { ...state };
            copyState2.isLoadingGender = false;
            copyState2.genders = [];
            return {
                ...copyState2,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.topDoctors;
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTimes = action.dataTime;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTimes = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfor = action.allRequiredData;
            console.log(">>>>>>>> hoidanit channel: fetch required doctor data action:", action);
            return {
                ...state,
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;