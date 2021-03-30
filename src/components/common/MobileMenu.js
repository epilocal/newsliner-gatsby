import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { Navigation, SubscribeForm } from '.'


const MobileMenu = ({ children, site, active, menuType }) => {
  let navClass = "site-nav-mobile-menu";
  if (active) { navClass += " active" };

  if (menuType === "subscribe") {
    return (
      <nav id="site-nav-mobile" className={navClass}>
        <div className="site-nav-mobile-menu-content">
            <h1 className="subscribe-form-title-alternate" style={{paddingBottom: '1rem'}}>Subscribe to {site.title}</h1>
            <p className="subscribe-form-description-alternate">{site.description ? site.description : 'Get the latest posts delivered right to your inbox'}</p>
            <SubscribeForm customStyles={{margin: 'auto', paddingTop: 0}} />
        </div>
      </nav>

    )
  }


  return (
    <nav id="site-nav-mobile" className={navClass}>
      <div className="site-nav-mobile-menu-content">
          <h1 className="site-logo-title">
            {site.logo ?
                <Link to="/"><img class="site-logo" src={site.logo} alt={site.title} /></Link>
                : <Link to="/">{site.title}</Link>
            }
          </h1>
          { site.navigation && <Navigation data={site.navigation} navclassName="site-nav-item" /> }
      </div>
    </nav>
  )
}

MobileMenu.propTypes = {
    children: PropTypes.node,
    site: PropTypes.object,
    active: PropTypes.bool
}



export default MobileMenu
