import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize'
import CommentComponent from './CommentComponent';

const CommentSectionComponent = ({ comments, isAuthenticated, onSubmitComment}) => {
    const [newComment, setNewComment] = useState('');

    const handleInputChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() === '') {
        return; // Не дозволяємо порожні коментарі
        }
        
        onSubmitComment(newComment);
        setNewComment(''); // Очищаємо поле після відправлення
    };

    return (
    <div className="comment-section">
        {isAuthenticated ? (
        <div className="new-comment-form">
            <TextareaAutosize 
            className="event-input-desc"  
            minRows="3" 
            value={newComment}
            onChange={handleInputChange}
            placeholder="Напишіть свій коментар тут..."
             />
          <button className='btn-secondary' onClick={handleCommentSubmit}>Коментувати</button>
        </div>
        ) : (
            <p>Авторизуйтесь, щоб залишити коментар.</p>
        )}

        {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))
      ) : (
        <p>Ще немає коментарів. Будьте першими!</p>
      )}
    
    </div>
  );
};

CommentSectionComponent.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onSubmitComment: PropTypes.func.isRequired,
};

export default CommentSectionComponent;
