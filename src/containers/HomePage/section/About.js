import React, { Component } from 'react';
import { connect } from 'react-redux';
class About extends Component {
    render() {


        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyen thong noi ve channel Hoi Dan IT
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/o9vXE_UUyCk?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                            title="#53 Customize Header Admin Hiển Thị Đa Ngôn Ngữ | Redux và React.JS cho Người Mới Bắt Đầu" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Tieng suoi trong nhu tieng hat xa . Trang long co thu bong long hoa. Canh khuya nhu ve nguoi chua ngu
                        </p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
