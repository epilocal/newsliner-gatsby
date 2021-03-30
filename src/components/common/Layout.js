import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import { Header, Footer, MobileMenu } from '.';

// Styles
import '../../styles/app.css';

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null
    const [ mobileMenuActive, setMobileMenuActive ] = useState(false);
    const [ mobileMenuType, setMobileMenuType ] = useState("mobile");
    let mobileMenuClass = "site-nav-mobile";
    if (mobileMenuActive) { mobileMenuClass += " active" };

    const toggleMobileMenu = (menuType) => {
      if (!mobileMenuActive) {
        setMobileMenuType(menuType);
      }
      setMobileMenuActive(!mobileMenuActive);
    }

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" />
                {/*
                <script defer src="https://unpkg.com/@tryghost/portal@latest/umd/portal.min.js" data-ghost="https://cloud.epilocal.com/epilocal"></script>
                */}
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">

                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <div className='site-header'>
                      <Header site={site} twitterUrl={twitterUrl} facebookUrl={facebookUrl} labs={null} toggleMobileMenu={toggleMobileMenu} />
                    </div>

                    <MobileMenu site={site} active={mobileMenuActive} menuType={mobileMenuType} />
                    {/* The mobile menu hamburger button */}
                    <div className={mobileMenuClass} onClick={() => toggleMobileMenu("mobile") }>
                      <span></span>
                    </div>

                    <main className="site-main" id="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>

                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <Footer site={site} twitterUrl={twitterUrl} facebookUrl={facebookUrl} />

                </div>
            </div>

        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
