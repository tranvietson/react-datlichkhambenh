import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getExtraInforDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }


    async componentDidMount() {

    }
    // console.log('>>>>>>>>> hoidanit channel allDays:', allDays);



    async componentDidUpdate(preProps, prevState, snapshot) {
        if (this.props.language !== preProps.language) {

        }

        if (this.props.doctorIdFromParent !== preProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            console.log('>>>>>>><<<<<<< hoidanit channel dulieu data:', res)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

        }
    }

    showHideDetailInfor = (state) => {
        this.setState({
            isShowDetailInfor: state
        })
    }


    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let language = this.props.language;
        console.log('>>>>>>>> gia tri cua extrainfor state:', extraInfor);
        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id="patient.extra-infor-doctor.text-address" /></div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>

                    {
                        isShowDetailInfor === false ?
                            <div className='short-infor'>
                                <FormattedMessage id="patient.extra-infor-doctor.price" />
                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                    &&
                                    < NumberFormat
                                        className='currency'
                                        value={extraInfor.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                }

                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                    &&
                                    < NumberFormat
                                        className='currency'
                                        value={extraInfor.priceTypeData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'USD'}
                                    />
                                }
                                <span className='detail' onClick={() => this.showHideDetailInfor(true)} >
                                    <FormattedMessage id="patient.extra-infor-doctor.detail" />
                                </span>
                            </div>
                            :
                            <>
                                <div className='title-price'><FormattedMessage id="patient.extra-infor-doctor.price" /></div>
                                <div className='detail-infor'>
                                    <div className='price'>
                                        <span className='left'><FormattedMessage id="patient.extra-infor-doctor.price" /></span>
                                        <span className='right'>
                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                                &&
                                                < NumberFormat
                                                    className='currency'
                                                    value={extraInfor.priceTypeData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                />
                                            }

                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                                &&
                                                < NumberFormat
                                                    className='currency'
                                                    value={extraInfor.priceTypeData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'USD'}
                                                />
                                            }
                                        </span>
                                    </div>
                                    <div className='note'>
                                        {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                    </div>
                                    <div className='payment'><FormattedMessage id="patient.extra-infor-doctor.payment" /> </div>
                                    {
                                        extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI ? extraInfor.paymentTypeData.valueVi : ''
                                    }
                                    {
                                        extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN ? extraInfor.paymentTypeData.valueEn : ''
                                    }
                                    <div className='hide-price'>
                                        <span onClick={() => this.showHideDetailInfor(false)}><FormattedMessage id="patient.extra-infor-doctor.hide-price" /></span>
                                    </div>
                                </div>

                            </>
                    }



                </div>
            </div >
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


export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
