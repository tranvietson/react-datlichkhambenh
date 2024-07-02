import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './TableManageUser.scss';
import { toast } from "react-toastify";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
        // console.log('>>>>>>>> gia tri prop action tu cha:', this.props.action)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('>>>>>>>>> preProps : ', prevProps.listUsers);
        //a  console.log('>>>>>>>>> this props: ', this.props.listUsers);
        if (prevProps.listUsers !== this.props.listUsers) {

            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser = (user) => {
        // console.log('>>>>>>> check item info from delete user: ', user);
        this.props.deleteAUser(user.id);

    }

    handleEditUser = (user) => {
        //  console.log('>>>>>>> check item info  from edit user: ', user);
        this.props.handleEditUserFromParent(user);
    }


    render() {
        let arrUsers = this.state.userRedux;
        //  console.log('hoidanit check all users: ', this.props.listUsers);
        console.log('>>>>>> check state from TableMangeUser: ', this.state.userRedux);
        return (
            <>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                        {
                            arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td >{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleEditUser(item)}
                                                className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                            <button
                                                onClick={() => this.handleDeleteUser(item)}
                                                className='btn-delete'><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </>
        )

    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUser: (userId) => dispatch(actions.deleteAUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
