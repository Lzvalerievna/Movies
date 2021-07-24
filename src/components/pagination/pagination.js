
import React from 'react';
import 'antd/dist/antd.css';
import './pagination.css';
import { Pagination } from 'antd';
import PropTypes from "prop-types";

export default function PaginationMovies({termSearch,totalPage,nextPage,currentPage}) {

        PaginationMovies.propTypes = {
        totalPage: PropTypes.number.isRequired,
        nextPage: PropTypes.func.isRequired,
        currentPage: PropTypes.number.isRequired,
        termSearch: PropTypes.string.isRequired
        };
        
           
        return (
                <div className="pagination">  
                    <Pagination
                    defaultCurrent={1}
                    current = {currentPage}
                    onChange = {(page) => nextPage(page, termSearch)}
                    total={totalPage}
                    />
                </div>
        )
       
}
