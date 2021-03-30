import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { Navigation, MobileMenu } from '.'
import config from '../../utils/siteConfig'


const Header = ({ children, site, facebookUrl, twitterUrl, labs, toggleMobileMenu }) => {

  return (
    <div className="outer site-nav-main">
        <div className="inner">
          <div className="site-nav-main-container">
            <div className="site-nav-container-small">
              <div className="site-nav-left">
                  {site.secondary_navigation.length > 0 ?
                    <Navigation data={site.secondary_navigation} />
                      :
                      <>
                      <div className="social-links">
                        { site.facebook && <a href={ facebookUrl } className="social-link social-link-tw" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /></a>}
                        { site.twitter && <a href={ twitterUrl } className="social-link social-link-fb" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /></a>}
                      </div>
                        <a className="rss-button" href={ `https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/` } target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/rss.svg" alt="RSS Feed" /></a>
                      </>
                  }
              </div>
            </div>
            <div className="site-nav-container-large">
              <h1 className="site-logo-title">
                <Link to="/">
                    {site.logo ?
                        <img className="site-logo" src={site.logo} alt={site.title} />
                        : <span>{site.title}</span>
                    }
                </Link>
              </h1>
            </div>
            <div className="site-nav-container-small">
              <div className="site-nav-right">
                {labs ?
                  <>{labs.members ? <a className="subscribe-button" href="#/portal/signin">Login</a> : <a className="subscribe-button" href="#/portal" >{`Member email`}</a>}</>
                  : <a className="subscribe-button" href="#" onClick={() => toggleMobileMenu("subscribe")}>Subscribe</a>
                 }
              </div>
            </div>
          </div>
          <div className="site-nav-container">
            <nav className="site-nav">
                <div className="site-nav-center-wrapper">
                    <div className="site-nav-center">
                        <div className="site-nav-content">
                          {site.navigation && <Navigation data={site.navigation} navclassName="site-nav-item" />}
                        </div>
                    </div>
                </div>
            </nav>

          </div>
        </div>
    </div>
)
}

Header.propTypes = {
    children: PropTypes.node,
    site: PropTypes.object,
    twitterUrl: PropTypes.string,
    facebookUrl: PropTypes.string
}



export default Header
