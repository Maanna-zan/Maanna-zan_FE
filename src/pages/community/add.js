import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { cookies } from '../../shared/cookie';
import { apis } from '../../shared/axios';
const AddPostForm = () => {
  const router = useRouter();
  const refresh_token = cookies.get('refresh_token');
  const access_token = cookies.get('access_token');

  const [post, setPost] = useState({
    storename: '',
    title: '',
    description: '',
    apiId: '',
  });

  const changeInputHandler = (e) => {
    const { value, name } = e.target;
    setPost((pre) => ({ ...pre, [name]: value }));
  };
  const { mutate } = useMutation({
    mutationFn: async (payload, id) => {
      console.log('payload', payload);
      console.log('id', id);

      const data = await apis.post('/posts', payload, {
        headers: {
          refresh_token: `${refresh_token}`,
          access_token: `${access_token}`,
        },
      });
      console.log('dataAdd------------>', data);
      return data;
    },
    onSuccess: (data) => {
      // const apiId = data.id;
      // router.push('/community');
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
        등록
      </button>
    </div>
  );
};

export default AddPostForm;
