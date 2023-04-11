import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { apis } from '../shared/axios';
import { useMutation } from '@tanstack/react-query';
import { cookies } from '../shared/cookie';

const AddComment = () => {
  const router = useRouter();
  const { query } = useRouter();
  console.log('query', query);

  const [commentList, setCommentList] = useState('');

  const changeInputHandler = (e) => {
    const { value, name } = e.target;
    setCommentList((pre) => ({ ...pre, [name]: value }));
  };

  //create!
  const token = cookies.get('refresh_token');
  const { mutate, isLoading, isSuccess, isIdle } = useMutation({
    mutationFn: async (payload) => {
      const data = await apis.post(`/posts/${query.id}/comments`, payload, {
        headers: {
          refresh_token: `${token}`,
        },
      });
      console.log('payload', payload);
    },
    onSuccess: () => {
      alert('댓글 추가를 완료하였습니다.');
      setCommentList({ content: '' });
    },
  });
  return (
    <div>
      AddContent
      <input
        type="text"
        value={commentList.content}
        name="content"
        onChange={changeInputHandler}
      />
      <button
        disabled={isLoading}
        onClick={() => {
          mutate(commentList);
        }}
      >
        {isLoading ? '등록중' : ' ✅'}
      </button>
    </div>
  );
};

export default AddComment;
