import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
class HandBook extends Component {
    render() {


        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cam Nang</span>
                        <button className='btn-section'>xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='cover'>
                                    <div className='bg-image section-handbook' />
                                    <div>Co xuong khop 1</div>
                                </div>

                            </div>
                            <div className='section-customize'>
                                <div className='cover'>
                                    <div className='bg-image section-handbook' />
                                    <div>Co xuong khop 2</div>
                                </div>

                            </div>
                            <div className='section-customize'>
                                <div className='cover'>
                                    <div className='bg-image section-handbook' />
                                    <div>Co xuong khop 3</div>
                                </div>

                            </div>
                            <div className='section-customize'>
                                <div className='cover'>
                                    <div className='bg-image section-handbook' />
                                    <div>Co xuong khop 4</div>
                                </div>

                            </div>
                            <div className='section-customize'>
                                <div className='cover'>
                                    <div className='bg-image section-handbook' />
                                    <div>Co xuong khop 51</div>
                                </div>

                            </div>
                            <div className='section-customize'>
                                <div className='cover'>
                                    <div className='bg-image section-handbook' />
                                    <div>Co xuong khop 6</div>
                                </div>

                            </div>

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

    };
};

const mapDispatchToProps = dispatch => {
    return {
        //fire action of redux has name: changeLanguageApp

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
