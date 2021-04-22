import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Layout, Sharing, PostCta, PostCard } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location, noImage }) => {
    const post = data.ghostPost;
    const site = data.allGhostSettings.edges[0].node;
    const relatedPosts = data.allGhostPost.edges;
    let postClass = 'post-full';
    if (noImage) {postClass = postClass + ' no-image'};

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
              <div className="outer">
                <div className="inner">
                    <article className={postClass}>
                      <header className="post-full-header">
                        <h1 className="post-full-title">{post.title}</h1>
                        <div className="post-full-byline">
                            <section className="post-full-byline-content">
                                <section className="post-full-byline-meta">
                                    <div className="byline-meta-content">
                                      { post.tags ?
                                          <>
                                            <span className="post-full-tags">
                                                {post.tags.map( (tag) => {
                                                  return (
                                                  <Link to={`/tag/${tag.slug}/`} title={tag.name}>{tag.name}</Link>
                                                )})}
                                            </span>
                                            <span> | </span>
                                          </>
                                      : null }
                                        <span className="byline-meta-date">
                                          {post.created_at_pretty}
                                        </span>
                                        <span> | By: </span>
                                        {post.authors.map( (author, i) => {
                                          if (i > 0) { return <span>, <Link to={`/author/${author.slug}/`} title={author.name}>{author.name}</Link></span> }
                                          else { return <Link to={`/author/${author.slug}/`} title={author.name}>{author.name}</Link> }
                                          })}

                                    </div>
                                </section>
                            </section>
                        </div>
                        <Sharing url={post.url} title={post.title} featuredImage={post.feature_image} />
                      </header>

                      { post.feature_image ?
                          <figure className="post-full-image">
                              <img src={ post.feature_image } alt={ post.title } />
                          </figure> : null }

                      <section className="post-full-content">
                          <section
                              className="post-content load-external-scripts"
                              dangerouslySetInnerHTML={{ __html: post.html }}
                          />
                      </section>
                      <PostCta title={site.title} description={site.description} />
                      <section className="related-posts-container">
                          <h3 className="related-posts-title"><span className="text">You might also like...</span></h3>
                            <div className="post-feed">
                              {relatedPosts.map( ({ node }) => (
                                <PostCard key={node.id} post={node} />
                              ))}
                          </div>
                      </section>
                    </article>
                </div>
              </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query ($slug: String!, $primary_tag: String!) {
        allGhostSettings {
            edges {
                node {
                    ...GhostSettingsFields
                }
            }
        }
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {tags: {elemMatch: {slug: {eq: $primary_tag}}}, slug: {ne: $slug }},
            limit: 2
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
    }
`
