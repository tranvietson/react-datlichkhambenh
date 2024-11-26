import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    async componentDidMount() {

    }
    // console.log('>>>>>>>>> hoidanit channel allDays:', allDays);



    async componentDidUpdate(preProps, prevState, snapshot) {

    }




    render() {
        return (
            <>
                <HomeHeader />
                <div>
                    Hello World from Specialty !!!
                </div>
            </>

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


export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
