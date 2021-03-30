import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Hero } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges;
    const site = data.allGhostSettings.edges[0].node;
    //Get two latest Featured posts
    const featuredPosts = posts.filter(function(post) {
      if (this.count < 2 && post.node.featured === true) {
        this.count++;
        return true;
      }
      return false;
    }, {count: 0});
    //Get 4 latest non-Featured posts
    const otherPosts = posts.filter(function(post) {
      if (this.count < 4 && post.node.featured === false) {
        this.count++;
        return true;
      }
      return false;
    }, {count: 0});
    const firstOtherPosts = otherPosts.slice(0, 2);
    const secondOtherPosts = otherPosts.slice(2);

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <Hero site={site}/>
                <div className="outer">
                    <section className="inner posts">
                      <div className="post-feed">
                        <PostCard key={featuredPosts[0].node.id} post={featuredPosts[0].node} large />
                        {firstOtherPosts.map(({ node }) => (
                            <PostCard key={node.id} post={node} />
                        ))}
                        <PostCard key={featuredPosts[1].node.id} post={featuredPosts[1].node} large />
                        {secondOtherPosts.map(({ node }) => (
                            <PostCard key={node.id} post={node} />
                        ))}

                      </div>

                    </section>
                </div>
            </Layout>
        </>
    )
}

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: $limit,
        skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
    allGhostSettings {
        edges {
            node {
                ...GhostSettingsFields
            }
        }
    }

  }
`
