import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES, dateFormat } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getScheduleDoctorByDate } from '../../../services/userService';
import BookingModal from './Modal/BookingModal';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).add(i, 'days').format('DD/MM');
                    let toDay = `Hôm nay - ${ddMM}`;
                    object.label = toDay;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }

            }
            else
                if (i === 0) {
                    let ddMM = moment(new Date()).add(i, 'days').format('DD/MM');
                    let toDay = `Today - ${ddMM}`;
                    object.label = toDay;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            let value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            let newValue = moment(value).format(dateFormat.SEND_TO_SERVER);
            console.log('gia tri cua value:', value);
            console.log('gia tri cua newDAte:', newValue);
            object.value = newValue;
            arrDate.push(object);
        }
        return arrDate;
        // console.log('arrDate:', arrDate)

    }


    async componentDidMount() {
        //let newDate = moment(date).format(dateFormat.SEND_TO_SERVER);
        let { language } = this.props;
        //  console.log('moment vie:', moment(new Date()).format('dddd - MM/DD'));
        //  console.log('moment en:', moment(new Date()).locale('en').format('ddd - DD/MM'));
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays,
        })
    }
    // console.log('>>>>>>>>> hoidanit channel allDays:', allDays);



    async componentDidUpdate(preProps, prevState, snapshot) {
        if (this.props.language !== preProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })

        }

        if (this.props.doctorIdFromParent !== preProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allDays: allDays,
                allAvailableTime: res.data ? res.data : []
            })
        }
    }
    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            console.log('gia tri cua doctorId va date:', date);
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
            console.log('gia tri tra ve cua schedule', res);

        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
        console.log('gia tri cua time:', time);
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        let { language } = this.props;
        console.log('gia tri cuas dataScheduleTimeModal', this.state);
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)} >
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index} >
                                            {item.label}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'>
                                <span>
                                    <FormattedMessage id='patient.detail-doctor.schedule' />
                                </span></i>
                        </div>
                        <div className='time-content'>
                            {
                                allAvailableTime && allAvailableTime.length > 0 ?
                                    <>
                                        <div className='time-content-btns'>
                                            {allAvailableTime.map((item, index) => {
                                                let timeDisplay = language === LANGUAGES.VI ?
                                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                                return (
                                                    <button
                                                        className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}
                                                        key={index}
                                                        onClick={() => this.handleClickScheduleTime(item)}
                                                    >{timeDisplay}</button>
                                                )
                                            })
                                            }
                                        </div>
                                        <div className='book-free'>
                                            <span><FormattedMessage id="patient.detail-doctor.choose" />
                                                <i class='far fa-hand-point-up'></i>
                                                <FormattedMessage id="patient.detail-doctor.book-free" /></span>
                                        </div>

                                    </>

                                    :
                                    <div className='no-schedule' ><FormattedMessage id='patient.detail-doctor.no-schedule' /></div>

                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTimeModal}
                />
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
