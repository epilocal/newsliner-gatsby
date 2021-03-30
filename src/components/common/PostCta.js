import React from 'react'
import PropTypes from 'prop-types'

import { SubscribeForm } from '.'


const PostCta = ( { title, description } ) => (
  <section className="post-full-content">
    <div className="post-cta-inner">
      <h3 className="subscribe-form-title-alternate">Subscribe to {title}</h3>
      <p className="subscribe-form-description-alternate">{description ? description : 'Get the latest posts delivered right to your inbox'}</p>
      <SubscribeForm />
    </div>
  </section>
)


PostCta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

export default PostCta
