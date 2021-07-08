
import React from 'react';
import 'antd/dist/antd.css';
import './pagination.css';
import { Pagination } from 'antd';
import PropTypes from "prop-types";

export default function PaginationMovies({totalPage,nextPage,currentPage}) {

        PaginationMovies.propTypes = {
        totalPage: PropTypes.number.isRequired,
        nextPage: PropTypes.func.isRequired,
        currentPage: PropTypes.number.isRequired
        };
        
           
        return (
            <div> 
               <Pagination
               current={currentPage}
               pageSize={6}
               onChange={nextPage}
               total={totalPage}
            />
            </div>
        )
       
}

PaginationMovies.propTypes = { 
    totalPage: PropTypes.number.isRequired,
    currentPage:PropTypes.number.isRequired,
    nextPage:PropTypes.func.isRequired
  };