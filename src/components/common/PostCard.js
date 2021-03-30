import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

const PostCard = ({ post, large, hideTags }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)
    let postCardClasses = 'post-card';
    if (!post.feature_image) {postCardClasses = postCardClasses + ' no-image'};
    if (large) {postCardClasses = postCardClasses + ' post-card-large' }

    return (
      <article className={postCardClasses} >
        {post.feature_image &&
          <Link className="post-card-image-link" to={url}>
              <img className="post-card-image"
                  src={post.feature_image}
                  alt={post.title}
              />
          </Link>
        }

        <div className='post-card-content'>
          <Link to={url} className='post-card-content-link' >
              <header className="post-card-header">
                  {hideTags ? null : post.tags && <div className="post-card-primary-tag"> <Tags post={post} visibility="public" autolink={false} /></div>}
                  <h2 className="post-card-title">{post.title}</h2>
              </header>
              <section className="post-card-excerpt">{post.excerpt}</section>
              <footer className="post-card-meta">
                <div className="post-card-byline-content">
                    <span className="post-card-byline-date"> {post.published_at_pretty} <span className="bull">&bull;</span> {readingTime}</span>
                </div>
              </footer>
          </Link>

        </div>


      </article>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
    }).isRequired,
}

export default PostCard
