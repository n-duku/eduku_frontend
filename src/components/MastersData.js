import React, { Component } from 'react';
import axios from 'axios';

class MastersData extends Component {
    constructor(){
        super();
        this.deleteMaster = this.deleteMaster.bind(this);
    }

    async deleteMaster(){
        try {
            const {data, status} = await axios.delete(`http://localhost:3001/api/v1/user/${this.props.user_id}`, {headers: {'Authorization': sessionStorage.getItem('token')}})
        if(status === 200){
            console.log(data)
        }
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <>
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.password}</td>
                <td>
                    <button onClick={this.deleteMaster} className='delete-btn' data-id={this.props.user_id}>
                            Delete
                    </button>
                </td>
            </tr>
        </>
        );
    }
}

export default MastersData;
