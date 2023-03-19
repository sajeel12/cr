import React, { Component } from 'react'
import SendMail from './SendMail'

export class SendMailWrapper extends Component {
    render() {
        return (
            <>
                <SendMail {...this.props} />
            </>
        )
    }
}

export default SendMailWrapper