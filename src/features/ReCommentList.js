import React from 'react';
import { useState, useEffect } from 'react';
import { cookies } from '@shared/cookie';
import { useMutation } from '@tanstack/react-query';
import { InputArea } from '@components/Atoms/Input';
import { apis } from '@shared/axios';

const ReCommentList = ({ comment }) => {
  console.log('comment', comment.commentList);
  const comments = comment.commentList;

  const [isEditMode, setIsEditMode] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [userNickName, setUserNickName] = useState('');

  useEffect(() => {
    const nick_name = localStorage.getItem('nick_name');
    setUserNickName(nick_name);
  }, []);

  const handleEdit = (comment) => {
    setIsEditMode(true);
    setCommentId(comment.id);
    setCommentContent(comment.content);
  };

  const handleUpdate = () => {
    const payload = { content: commentContent };
    const comment = comments.find((comment) => comment.id === commentId);
    if (comment) {
      updateContent({ id: comment.id, payload });
    }
  };

  const handleDelete = (id) => {
    deleteComment(id);
  };

  const token = cookies.get('access_token');
  //삭제
  const { mutate: deleteComment } = useMutation({
    mutationFn: async (id) => {
      await apis.delete(`/posts/comments/${id}`, {
        headers: {
          Access_Token: `${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['GET_COMMENTS']);
    },
  });

  //수정
  const { mutate: updateContent } = useMutation({
    mutationFn: async ({ id, payload }) => {
      apis.patch(`/posts/comments/${id}`, payload, {
        headers: {
          Access_Token: `${token}`,
        },
      });
    },
    onSuccess: () => {
      setIsEditMode(false);
      setCommentId(null);
      setCommentContent('');
      queryClient.invalidateQueries(['GET_COMMENTS']);
      window.alert('수정 완료!');
    },
    onError: () => {
      window.alert('수정 오류!');
    },
  });

  return (
    <div>
      {isEditMode ? (
        <>
          <div style={{ display: 'flex' }}>
            <InputArea
              variant="default"
              size="lg"
              type="text"
              name="content"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button className="Button" onClick={handleUpdate}>
              완료
            </button>
          </div>
        </>
      ) : (
        <>
          {comments?.map((comment) => (
            <div key={comment.id}>
              <div>{comment.content}</div>
              <div>{comment.id}</div>
              {userNickName === comment.nickName && (
                <>
                  <button
                    className="Button"
                    onClick={() => handleDelete(comment.id)}
                  >
                    삭제
                  </button>
                  <button
                    className="Button"
                    onClick={() => handleEdit(comment)}
                  >
                    수정
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ReCommentList;
