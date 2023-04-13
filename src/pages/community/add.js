import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { cookies } from '../../shared/cookie';
import { apis } from '../../shared/axios';
const AddPostForm = () => {
  const router = useRouter();
  const [post, setPost] = useState({
    storename: '',
    title: '',
    description: '',
    image: null,
  });

  const access_token = cookies.get('access_token');
  const refresh_token = cookies.get('refresh_token');

  const changeInputHandler = (e) => {
    const { value, name } = e.target;
    setPost((pre) => ({ ...pre, [name]: value }));
  };
  const { mutate, isSuccess, onMutate, onSuccess } = useMutation({
    mutationFn: async (payload) => {
      const data = await apis.post('/posts', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: `${access_token}`,
          refresh_token: `${refresh_token}`,
        },
      });
      console.log('dataAdd------------>', data);
      return data;
    },
    onSuccess: (data) => {
      // router.push('/community');
    },
  });
  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const image = new File([file], file.name, { type: file.type });
    setPost((pre) => ({ ...pre, image }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('storename', post.storename);
    formData.append('title', post.title);
    formData.append('description', post.description);
    formData.append('image', post.image);

    mutate(formData);
  };
  return (
    <div>
      <button
        onClick={() => {
          router.push('/community');
        }}
      >
        뒤로가기
      </button>
      <form onSubmit={handleSubmit}>
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
        <h4>이미지</h4>
        <input type="file" name="image" onChange={changeFileHandler} />

        <button type="submit">등록</button>
      </form>
    </div>
  );
};
export default AddPostForm;
