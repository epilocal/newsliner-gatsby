import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import config from '../../utils/siteConfig'


const Footer = ({ children, site, facebookUrl, twitterUrl }) => (

    <footer className="site-footer outer">
      <div className="site-footer-content inner">
        <div className="site-footer-social">
            { site.facebook && <a href={ facebookUrl } className="social-link social-link-tw" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /></a>}
            { site.twitter && <a href={ twitterUrl } className="social-link social-link-fb" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /></a>}
            <a className="rss-button" href={ `https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/` } target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/rss.svg" alt="RSS Feed" /></a>
        </div>
        <div className="site-footer-copyright">
          <Link to="/">{site.title}</Link> © 2021 | Powered by <a className="site-foot-nav-item" href="https://ghost.org" target="_blank" rel="noopener noreferrer">Ghost </a>
           with Theme by <a href="https://www.epilocal.com/" target="_blank" rel="noopener noreferrer">Epilocal</a>
        </div>
      </div>
    </footer>
  )

Footer.propTypes = {
    children: PropTypes.node,
    site: PropTypes.object,
    twitterUrl: PropTypes.string,
    facebookUrl: PropTypes.string
}



export default Footer
