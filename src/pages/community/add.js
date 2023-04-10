import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { cookies } from '../../shared/cookie';
import { apis } from '../../shared/axios';
const AddPostForm = () => {
  const router = useRouter();
  const token = cookies.get('refresh_token');
  const [post, setPost] = useState({
    storename: '',
    title: '',
    description: '',
  });
  const changeInputHandler = (e) => {
    const { value, name } = e.target;
    setPost((pre) => ({ ...pre, [name]: value }));
  };
  const { mutate, isSuccess, onMutate, onSuccess } = useMutation({
    mutationFn: async (payload) => {
      const data = await apis.post('/posts', payload, {
        headers: {
          refresh_token: `${token}`,
        },
      });
      console.log('dataAdd------------>', data);
      return data;
    },
    onSuccess: (data) => {
      router.push('/community');
    },
  });

  return (
    <div>
      <h4>술집명</h4>
      <input
        type="text"
        value={post.storename}
        name="storename"
        onChange={changeInputHandler}
      />
      <h4>제목</h4>
      <input
        type="text"
        value={post.title}
        name="title"
        onChange={changeInputHandler}
      />
      <h4>설명</h4>
      <input
        type="text"
        value={post.description}
        name="description"
        onChange={changeInputHandler}
      />
      <button
        // disabled={isLoading}
        onClick={() => {
          mutate(post);
        }}
      >
        등록중
      </button>
    </div>
  );
};

export default AddPostForm;
