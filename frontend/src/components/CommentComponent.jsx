import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/comment.css';
import useIconDescription from './useIconDescription'; 

const CommentComponent = ({ comment,  onDelete }) => {
    const { id, username, firstName, lastName, text } = comment;
    const { iconDescription, handleMouseEnter, handleMouseLeave } = useIconDescription();
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    
    const handleDelete = () => {
        if (onDelete) {
          onDelete(id); // передаємо ID коментаря
        }
      };
    
    // це для icon description
    const handleMouseMove = (event) => {
        // Встановлюємо позицію підказки біля курсору
        setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    const displayName = firstName && lastName
        ? `${firstName} ${lastName}`
        : username;

    return (
        <div className="comment" onMouseMove={handleMouseMove}>
            <div className='comment-header'>
                <div className='comment-name'>
                    <strong>{displayName}</strong>
                    {firstName && lastName && (
                        <p className='subtext'>@{username}</p>
                    )}
                </div>
                {/* ось тут кнопочка видалити коментар */}
                <span 
                    className='delete' 
                    onClick={handleDelete}
                    onMouseEnter={() => handleMouseEnter('Видалити коментар')} 
                    onMouseLeave={handleMouseLeave}
                >
                    &times;
                </span>
            </div>
            <p>{text}</p>
            
            {/* це для icon description */}
            {iconDescription && (
                <div
                    className="icon-description"
                    style={{
                    top: tooltipPosition.y + 30, // Відступ від курсору
                    left: tooltipPosition.x - 100, // Відступ від курсору
                    }}
                >
                    {iconDescription}
                </div>
            )}
        </div>
    );
};

CommentComponent.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default CommentComponent;
