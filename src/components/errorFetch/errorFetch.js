import React from 'react';
import 'antd/dist/antd.css';
import './errorFetch.css';
import PropTypes from "prop-types";
import { Alert } from 'antd';


export default function ErrorFetch({errorMessage}) {

    ErrorFetch.propTypes = {
        errorMessage: PropTypes.string.isRequired,

      };

    return (
        <div>
            <Alert 
            description={errorMessage}
            type="info"
            showIcon 
            style={{width: 300, margin: 'auto', marginTop: 200, marginBottom: 700, borderRadius:20}}
            />
         </div>
    )
}