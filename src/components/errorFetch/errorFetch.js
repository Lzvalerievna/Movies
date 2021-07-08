import React from 'react';
import 'antd/dist/antd.css';
import './errorFetch.css';
import PropTypes from "prop-types";
import { Alert } from 'antd';


export default function ErrorFetch({errorMessage,errorMessage2}) {

    ErrorFetch.propTypes = {
        errorMessage: PropTypes.string.isRequired,
        errorMessage2: PropTypes.string.isRequired
      };

    return (
        <div>
           {errorMessage ? 
            <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
            style={{width: 360, margin: 'auto', marginTop: 200, marginBottom: 700, borderRadius:20}}
            /> :
            <Alert 
            description={errorMessage2}
            type="info"
            showIcon 
            style={{width: 360, margin: 'auto', marginTop: 200, marginBottom: 700, borderRadius:20}}
            />
           }
         </div>
    )
}