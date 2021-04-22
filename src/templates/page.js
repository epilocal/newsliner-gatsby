import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const Page = ({ data, location, noImage }) => {
    const page = data.ghostPage;
    let pageClass = 'post-full';
    if (noImage) {pageClass = pageClass + ' no-image'};

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
            />
            <Helmet>
                <style type="text/css">{`${page.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
              <div className="outer">
                <div className="inner">
                  <article className={pageClass}>
                    <header className="post-full-header">
                      <h1 className="post-full-title">{page.title}</h1>
                      <div className="post-full-byline"></div>
                    </header>

                    { page.feature_image ?
                        <figure className="post-full-image">
                            <img src={ page.feature_image } alt={ page.title } />
                        </figure> : null }

                      {/* The main page content */}
                      <div className="post-full-content">
                        <section
                            className="post-content load-external-scripts"
                            dangerouslySetInnerHTML={{ __html: page.html }}
                        />
                      </div>
                  </article>
                </div>

              </div>

            </Layout>
        </>
    )
}

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Page

export const postQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`
