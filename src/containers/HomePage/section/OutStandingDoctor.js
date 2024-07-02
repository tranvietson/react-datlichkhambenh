import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';


class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topDoctors: []
        }
    }

    async componentDidMount() {
        console.log('>>>>>>>>> check chuc nang componentDidMount')
        this.props.getTopDoctors();
        //console.log('>>>>>>>> check gia tri props  sau ham componentDidMount: ', this.props)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //  console.log('>>>>>>>> check gia tri state  sau ham componentDidUpdate: ', this.props)
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                topDoctors: this.props.topDoctorsRedux,
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        //console.log('>>>>>>>>> hoidanit chanel: ', doctor)
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }


    render() {
        console.log('>>>>>>>>>>>>> check gia tri state topDoctors in home:', this.state.topDoctors)
        let topDoctors = this.state.topDoctors;
        let language = this.props.language;
        topDoctors = topDoctors.concat(topDoctors).concat(topDoctors)
        // console.log('>>>>>>>>>>chekc language:', language)
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                topDoctors && topDoctors.length > 0 &&
                                topDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    console.log('>>>>>>>>>>> check imageBase64: ', item.image)
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName}  ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)} >
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />
                                                </div>
                                                <div className='position text-center'>

                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Co xuong khop</div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }


                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getTopDoctors: () => dispatch(actions.getTopDoctors()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
