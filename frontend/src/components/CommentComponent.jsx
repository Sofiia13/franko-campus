import React from 'react';
import PropTypes from 'prop-types';
import '../css/comment.css';

const CommentComponent = ({ comment }) => {
    const { username, firstName, lastName, text } = comment;

    const displayName = firstName && lastName
        ? `${firstName} ${lastName}`
        : username;

    return (
        <div className="comment">
            <div className='comment-name'>
                <strong>{displayName}</strong>
                {firstName && lastName && (
                    <p className='subtext'>@{username}</p>
                )}
            </div>
            <p>{text}</p>
        </div>
    );
};

CommentComponent.propTypes = {
  comment: PropTypes.shape({
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentComponent;
