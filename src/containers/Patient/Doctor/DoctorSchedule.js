import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES, dateFormat } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
        }
    }

    setArrDays = async (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            let value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            let newValue = moment(value).format(dateFormat.SEND_TO_SERVER);
            console.log('gia tri cua value:', value);
            console.log('gia tri cua newDAte:', newValue);
            object.value = newValue;

            arrDate.push(object);
        }

        console.log('arrDate:', arrDate)
        this.setState({
            allDays: arrDate,
        })
    }

    componentDidMount() {
        //let newDate = moment(date).format(dateFormat.SEND_TO_SERVER);
        let { language } = this.props;
        console.log('moment vie:', moment(new Date()).format('dddd - MM/DD'));
        console.log('moment en:', moment(new Date()).locale('en').format('ddd - DD/MM'));
        this.setArrDays(language);
    }

    componentDidUpdate(preProps, prevState, snapshot) {
        if (this.props.language !== preProps.language) {
            this.setArrDays(this.props.language);
        }
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            console.log('gia tri cua doctorId va date:', date);
            let res = await getScheduleDoctorByDate(doctorId, date);
            console.log('gia tri tra ve cua schedule', res);

        }
    }

    render() {
        let { allDays } = this.state;
        return (
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

                </div>
            </div>
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
