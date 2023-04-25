import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import styled from 'styled-components';

const AddReComment = (comment) => {
  const [reComments, setReComments] = useState(false);
  const [reCommentList, setReCommentList] = useState('');

  const changeInputHandler = (e) => {
    const { value, name } = e.target;
    setReCommentList((pre) => ({ ...pre, [name]: value }));
  };

  const token = cookies.get('access_token');

  const { mutate, isLoading, isSuccess, isIdle } = useMutation({
    mutationFn: async (payload) => {
      console.log('payload', payload.commentId);
      const data = await apis.post(
        `/posts/comments/${payload.commentId}`,
        {
          content: payload.content,
        },
        {
          headers: {
            Access_Token: `${token}`,
          },
        },
      );
    },
    onSuccess: () => {
      alert('댓글 추가를 완료하였습니다.');
    },
    onError: (error) => {
      console.log('error', error.response.data.message);
      alert(error.response.data.message);
    },
  });

  return (
    <div>
      {reComments ? (
        <div>
          <input
            type="text"
            placeholder="답글 입력"
            name="content"
            value={reCommentList.content}
            onChange={changeInputHandler}
          />
          <Button
            onClick={() => {
              mutate({
                commentId: comment.comment.id,
                content: reCommentList.content,
              });
              setReComments(false);
            }}
          >
            완료
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => {
            setReComments(true);
          }}
        >
          답글달기
        </Button>
      )}
    </div>
  );
};

export default AddReComment;

const Button = styled.button`
  border: none;
  background-color: transparent;
`;
