import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

/**
* Navigation component
*
* The Navigation component takes an array of your Ghost
* navigation property that is fetched from the settings.
* It differentiates between absolute (external) and relative link (internal).
* You can pass it a custom class for your own styles, but it will always fallback
* to a `site-nav-item` class.
*
*/
const Navigation = ({ data, navClass }) => {
    return (
    <ul className="nav">
        {data.map((navItem, i) => {
            let shortUrl = navItem.url.substring(navItem.url.indexOf("/") + 1);
            if (navItem.url.match(/^\s?http(s?)/gi)) {
                return <li key={i}><a className={navClass} href={navItem.url} target="_blank" rel="noopener noreferrer">{navItem.label}</a></li>
            } else {
                return <li  key={i}><Link className={navClass} to={`/${shortUrl}`}>{navItem.label}</Link></li>
            }
        })}
    </ul>
  )
}

Navigation.defaultProps = {
    navClass: `site-nav-item`,
}

Navigation.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    navClass: PropTypes.string,
}

export default Navigation
