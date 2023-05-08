import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import styled from 'styled-components';
import { LightTheme } from '@components/Themes/theme';

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
      // console.log('payload', payload.commentId);
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
      setReCommentList('');
      alert('댓글 추가를 완료하였습니다.');
    },
    onError: (error) => {
      // console.log('error', error.response.data.message);
      if (error.response.data.message == 'Token Error') {
        alert('로그인 후 이용가능합니다 ');
      } else {
        alert(error.response.data.message);
      }
    },
  });

  return (
    <Recomments>
      {reComments ? (
        <div className="Editmode">
          <Input
            type="text"
            placeholder="답글 100글자 이내로 입력해주세요"
            name="content"
            minLength="1"
            maxLength="100"
            required
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
          답글 달기
        </Button>
      )}
    </Recomments>
  );
};

export default AddReComment;
const Recomments = styled.div`
  display: flex;
  gap: 20px;
  .Editmode {
    display: flex;
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${LightTheme.GRAY_400};
  width: 60px;
  cursor: pointer;
  :hover {
    color: ${LightTheme.GRAY_800};
  }
`;
const Input = styled.input`
  font-size: 12px;
  width: 550px;
  ::placeholder {
    color: ${LightTheme.GRAY_200};
  }
`;
