import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from "react-datepicker";
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookApointment } from '../../../../services/userService';
import { toast } from 'react-toastify';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            startDate: new Date(),
            genders: '',
            timeType: ''

        }
    }


    async componentDidMount() {
        this.props.getGenders();
    }
    // console.log('>>>>>>>>> hoidanit channel allDays:', allDays);
    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    async componentDidUpdate(preProps, prevState, snapshot) {
        if (this.props.language !== preProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== preProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== preProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }

    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    setStartDate = (date) => {
        this.setState({
            birthday: date
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        // validate input
        let res = await postPatientBookApointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.state.birthday,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succedd!');
            this.props.closeBookingModal();
        } else {
            toast.error('Booking a new appointment error!')
        }

        console.log('>>>>> hoi dan it channel hit confirm button:', this.state);
    }


    render() {
        //toggle ={}
        let { isOpenModal, closeBookingModal, dataTime, genders } = this.props;
        console.log('>>>>>>> hoi dan it check genders inside bookingModal:', genders)
        let doctorId = '';
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let startDate = this.startDate;
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        // let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        console.log('>>> hoi dan it check state from inside bookingmodal:', this.state);
        return (
            <Modal
                isOpen={isOpenModal}
                className='booking-modal-container'
                size='lg'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span
                            className='right'
                            onClick={closeBookingModal}
                        >
                            <i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body container'>

                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.fullName" />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.email" />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.address" />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.reason" />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.birthday" />
                                </label>
                                <DatePicker
                                    minDate={yesterday}
                                    selected={this.state.birthday}
                                    onChange={(date) => this.setStartDate(date)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.gender" />
                                </label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}

                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button
                            className='btn-booking-confirm'
                            onClick={() => this.handleConfirmBooking()}
                        >
                            <FormattedMessage id="patient.booking-modal.btnConfirm" />
                        </button>
                        <button
                            className='btn-booking-cancel'
                            onClick={closeBookingModal}
                        >
                            <FormattedMessage id="patient.booking-modal.btnCancel" />
                        </button>
                    </div>

                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
