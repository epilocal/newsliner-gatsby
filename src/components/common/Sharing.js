import React from 'react';
import PropTypes from 'prop-types';

//All sharing icons from Font Awesome CDN.  Boxes with colors hard-coded in CSS
const Sharing = ( { url, title, featuredImage }) => {
  const encodedTitle = encodeURI(title);
  return (
    <>
    <div className="share">

       <a className="share-item share-facebook"
           href={`https://www.facebook.com/sharer.php?u=${url}`} target="_blank" rel="noreferrer"><i className="fa fa-facebook" ariaHidden="true" aria-label="Share on Facebook"></i></a>
       <a className="share-item share-twitter"
           href={`https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`} target="_blank" rel="noreferrer"><i
               className="fa fa-twitter" ariaHidden="true" aria-label="Share on Twitter"></i></a>
       <a className="share-item share-pinterest"
           href={`https://pinterest.com/pin/create/button/?url=${url}&media=${featuredImage}&description=${encodedTitle}`}
           target="_blank" data-pin-do="none" rel="noreferrer"><i className="fa fa-pinterest-p" ariaHidden="true" aria-label="Share on Pinterest"></i></a>

       <a className="share-item share-linkedin"
           href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodedTitle}`}
           target="_blank" rel="noreferrer"><i className="fa fa-linkedin" ariaHidden="true" aria-label="Share on LinkedIn"></i></a>
       <a className="share-item share-reddit"
           href={`https://reddit.com/submit?url=${url}&title=${encodedTitle}`} target="_blank" rel="noreferrer"><i
               className="fa fa-reddit-alien" ariaHidden="true" aria-label="Share on Reddit"></i></a>
       <a className="share-item share-tumblr"
           href={`https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&title=${encodedTitle}`}
           target="_blank" rel="noreferrer"><i className="fa fa-tumblr" ariaHidden="true" aria-label="Share on Tumblr"></i></a>
       <a className="share-item share-pocket u-hover-item" href={`https://getpocket.com/edit?url=${url}`}
           target="_blank" rel="noreferrer"><i className="fa fa-get-pocket" ariaHidden="true" aria-label="Save to Pocket"></i></a>
    </div>
  </>
  )
}


Sharing.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired
}

export default Sharing
