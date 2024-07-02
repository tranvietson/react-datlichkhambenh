import React, { Component } from 'react';
import { connect } from 'react-redux';
class HomeFooter extends Component {
    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2023 Hoi Dan IT.More Information, please visit our channel
                    <a target='_blank' href='https://www.youtube.com/watch?v=147SkAVXEqM&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI&index=62'>
                        &#8594; Click here &#8592;
                    </a></p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        //fire action of redux has name: changeLanguageApp

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
