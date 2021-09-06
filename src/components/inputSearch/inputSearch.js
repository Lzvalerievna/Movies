import React from 'react';
import {Input} from 'antd';
import './inputSearch.css';
import PropTypes from "prop-types";

export default function InputSearch({handleOnChange}) {
    
  InputSearch.propTypes = {
    handleOnChange: PropTypes.func.isRequired
  };

  return (
    <div>
        <form>
              <Input placeholder="Type to search..." 
                onChange={handleOnChange}
              />
        </form>
    </div>
  )
}