import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, groupedComments, setComments }) => {
    return comments.map(comment => <Comment key={comment.id} {...comment} groupedComments={groupedComments} setComments={setComments} />);
};

export default CommentList;
