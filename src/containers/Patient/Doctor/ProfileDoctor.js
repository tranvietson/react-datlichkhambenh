import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../services/userService';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment/moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }


    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
        // console.log('Hoi dan it check profile doctor:', res);
    }

    // console.log('>>>>>>>>> hoidanit channel allDays:', allDays);

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }


    async componentDidUpdate(preProps, prevState, snapshot) {
        if (this.props.language !== preProps.language) {

        }
        if (this.props.doctorId !== preProps.doctorId) {
            //this.getInforDoctor(this.props.doctorId);
        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        console.log('hoi dan it check inside renderTimeBooking:', dataTime);
        if (dataTime && !_.isEmpty(dataTime)) {
            //using this case with time format in date format;
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ?
                moment(new Date(dataTime.date)).format('dddd - DD/MM/YYYY')
                :
                moment(new Date(dataTime.date)).locale('en').format('ddd - MM/DD/YYYY')

            // using this case with time format in TimeStamp (number format) using getTime()
            // let date = language === LANGUAGES.VI ?
            //     // + convert string to integer number
            //     moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            //     :
            //     moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')

            return (
                <>
                    <div>{time} - {date}</div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.priceBooking" />
                    </div>
                </>
            )
        }
        return (
            <>
            </>
        )

    }


    render() {

        // console.log('hoi dan it channel check state:', this.state);

        console.log('hoi dan it channel check props:', this.props);
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime } = this.props;
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName}  ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{
                            backgroundImage:
                                `url(${dataProfile.image ? dataProfile.image : ''})`
                        }}
                    >
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {
                                isShowDescriptionDoctor === true ?

                                    <>
                                        {dataProfile && dataProfile.Markdown
                                            && dataProfile.Markdown.description
                                            &&
                                            <span>
                                                {dataProfile.Markdown.description}
                                            </span>
                                        }
                                    </>
                                    :
                                    <>
                                        {this.renderTimeBooking(dataTime)}
                                    </>
                            }

                        </div>
                    </div>

                </div>
                <div className='price'>  <FormattedMessage id="patient.booking-modal.price" />:
                    {
                        dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI &&
                        < NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />

                    }
                    {
                        dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN &&

                        < NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'USD'}
                        />

                    }
                </div>
            </div>
        )
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


export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
