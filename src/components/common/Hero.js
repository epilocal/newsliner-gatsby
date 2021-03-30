import React from 'react'
import PropTypes from 'prop-types'
import { SubscribeForm } from '.'


const Hero = ({ children, site }) => {
  return (
    <div
       className="site-header-background responsive-header-img"
       style={{backgroundImage: `url(${site.cover_image})`}}
       >
       <div className="site-hero">
         <div className="site-hero-overlay">
           <div className="site-hero-content">
               <h1 className="site-description">
                   {site.description}
               </h1>
               <SubscribeForm />
           </div>
         </div>
       </div>
     </div>
  )

}

Hero.propTypes = {
    children: PropTypes.node,
    site: PropTypes.object
}



export default Hero
