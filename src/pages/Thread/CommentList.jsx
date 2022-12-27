import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments }) => {
    return comments.map(comment => <Comment key={comment.id} {...comment} />);
};

export default CommentList;
