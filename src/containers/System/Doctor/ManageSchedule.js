import React, { useState, Component } from "react";
//import React, { Component, } from 'react';
//import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import * as actions from "../../../store/actions";
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
//import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';


class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: {},
            rangeTime: [],
            startDate: new Date(),
        }
    }


    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllSheduleTimes();
    }

    buildDataInputSelect = (inputData) => {
        console.log('check datainput: ', inputData)
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            console.log('check dataselect: ', dataSelect)
            this.setState({
                listDoctors: dataSelect
            })

        }

        if (prevProps.allScheduleTimes !== this.props.allScheduleTimes) {
            // console.log('>>>>>>>>>> check gia tri rangeTiem: ', this.props.allScheduleTimes);
            let data = this.props.allScheduleTimes;
            if (data && data.length > 0) {
                // data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            // console.log('check gia tri rangeTime moi:', data);
            this.setState({
                rangeTime: data
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            console.log('check dataselect: ', dataSelect)
            this.setState({
                listDoctors: dataSelect
            })

        }
    }


    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption
        })
        //  console.log('>>>>>>>> bac si da chon:', selectedOption);
        // console.log('>>>>>>>> gia tri ban dau:', this.state.selectedDoctor);
    };

    // handleOnchangeDatePicker = (date) => {
    //     console.log('gia tri ngay chon:', date[0])
    //     let abc = moment(date[0]).format(dateFormat.SEND_TO_SERVER);
    //     // let formatDate = moment(currentDate).unix();
    //     //let abc = new Date(date[0]).getTime();
    //     console.log('abc:', abc)
    //     this.setState({
    //         currentDate: abc
    //     })
    //     console.log('gia tri khoi tao date 1:', this.state.currentDate)
    // }

    setStartDate = (date) => {
        let newDate = moment(date).format(dateFormat.SEND_TO_SERVER);
        // let formatDate = moment(currentDate).unix();
        //let abc = new Date(date[0]).getTime();
        console.log('>>>>>>>>>>> selected date is:', newDate);
        console.log('>>>>>>>>>>> type of the selected date is:', typeof newDate);

        this.setState({
            startDate: date
        })
    }

    handleClickBtnTime = (time) => {
        // console.log('>>>>> check gia tri item click:', time);
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
        }
        this.setState({
            rangeTime: rangeTime
        })
        // console.log('>>>>>>>>>> gia tri moi sau khi duoc click:', rangeTime);
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, startDate } = this.state;
        console.log('rangTime-selecteDoctor,startDate ', rangeTime, selectedDoctor, startDate)
        let result = [];
        console.log('startDate: ', this.state.startDate)
        if (!startDate) {
            toast.error('Invalid date!!!');
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid selected doctor!')
        }
        let formatDate = moment(startDate).format(dateFormat.SEND_TO_SERVER);
        // let formatDate = moment(currentDate).unix();
        // let formatDate = new Date(currentDate).getTime();
        console.log('gia tri cua currentDAte 2:', this.state.startDate);
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    console.log('>>>>>>>>>> check gia tri schedule, index, selecedDoctor:',
                        schedule, index, selectedDoctor);
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatDate;
                    //object.date = startDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                    console.log(">>>>>value of new result object:", result);
                })
            } else {
                toast.error('invalid selected time!');
                return;
            }
        }
        // console.log('>>>>>>>>> gia tri cua selectedDoctor:', selectedDoctor)
        // console.log('>>>>>>>>> gia tri cua date:', startDate)
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatDate
        });
        console.log('>>>>>>>>>>> check gia tri cuar result tra ve:', res);
        console.log('>>>>>>>>>>> check gia tri cuar result:', result);

        // console.log('>>>>>>>>>> check gia tri currentDate:', moment(currentDate).format('DD/MM/YYYY'))

    }




    render() {
        // console.log('hoi dan it check state:', this.state);
        // console.log('hoi dan it check props:', this.props);
        let { language } = this.props;
        let { rangeTime, startDate } = this.state;
        // const [startDate, setStartDate] = useState(new Date());

        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                //value={this.state.selectedDoctor}
                                onChange={(selectedOption) => this.handleChangeSelect(selectedOption)}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            {/* <DatePicker
                                className='form-control'
                                onChange={this.handleOnchangeDatePicker}
                                value={this.state.currentDate}
                                minDate={new Date()}
                            /> */}
                            <DatePicker minDate={new Date()} selected={startDate} onChange={(date) => this.setStartDate(date)} />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    //   console.log('>>>>>>> gia tri cua item.isSelected:', item.isSelected, index);
                                    return (

                                        <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule '}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTimes: state.admin.allScheduleTimes,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllSheduleTimes: () => dispatch(actions.fetchAllSheduleTimes()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
