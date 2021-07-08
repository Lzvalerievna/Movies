import React from 'react';
import 'antd/dist/antd.css';
import './spin.css';
import { Spin } from 'antd';

export default function Spinner() {
   
    return (
        <div className="example">
               <Spin size="large"/>
        </div>
    )
    
}
