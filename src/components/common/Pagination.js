import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Pagination = ({ pageContext }) => {
    const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext

    return (
        <nav className="pagination-container" role="navigation">
            <div className="pagination-left">
                {previousPagePath && (

                    <Link className="pagination-newer-posts" to={previousPagePath} rel="prev">
                          <span>{'<< Previous'}</span>
                    </Link>

                )}
            </div>
            {numberOfPages > 1 && <span className="pagination-page-number">Page {humanPageNumber} of {numberOfPages}</span>}
            <div className="pagination-right">
                {nextPagePath && (

                    <Link className="pagination-older-posts" to={nextPagePath} rel="next">
                          <span>{'Next >>'}</span>  
                    </Link>
                )}
            </div>
        </nav>
    )
}

Pagination.propTypes = {
    pageContext: PropTypes.object.isRequired,
}

export default Pagination
