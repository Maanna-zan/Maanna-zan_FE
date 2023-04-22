import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { cookies } from '../../shared/cookie';
import { apis } from '../../shared/axios';
import { FlexRow } from '@components/Atoms/Flex';
import { WebWrapper792px } from '@components/Atoms/Wrapper';
const AddPostForm = ({ apiId }) => {
  const router = useRouter();
  const apiIdReal = router.query.storeId;

  console.log('apiIdReal-------------', apiIdReal);
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
      const data = await apis.post(`/posts/${apiIdReal}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: `${access_token}`,
          // refresh_token: `${refresh_token}`,
        },
      });
      console.log('dataAdd------------>', data);
      return data;
    },
    onSuccess: (data) => {
      router.push('/community');
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
    <WebWrapper792px style={{ margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <FlexRow
          style={{ justifyContent: 'space-between', marginBottom: '30px' }}
        >
          {/* 폰트 */}
          <div>포스트 리뷰 작성</div>

          <FlexRow style={{ gap: '10px' }}>
            <img src=""></img>
            {/* 장소 적는곳 */}
            <input
              type="text"
              value={post.storename}
              name="storename"
              onChange={changeInputHandler}
              placeholder="장소를 입력해주세요"
              style={{ width: '130px' }}
            />
          </FlexRow>
        </FlexRow>
        <input
          type="text"
          value={post.title}
          name="title"
          onChange={changeInputHandler}
          placeholder="제목을 작성해주세요"
          style={{
            borderBottom: '1px solid #eee',
            height: '50px',
            border: '1px solid #eee',
            padding: '16px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        />
        {/* 내용 입력란 */}
        <textarea
          type="text"
          style={{
            marginTop: '24px',
            border: '1px solid #eee',
            padding: '16px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxSizing: 'border-box',
            borderRadius: '8px',
            height: '300px',
            marginBottom: '40px',
            width: '100%',
          }}
          value={post.description}
          name="description"
          onChange={changeInputHandler}
          placeholder="내용을 입력해주세요"
        />

        <FlexRow
          style={{
            gap: '24px',
            marginBottom: '50px',
            justifyContent: 'space-between',
          }}
        >
          <input
            type="file"
            name="image"
            onChange={changeFileHandler}
            style={{ width: '40%', marginBottom: '30px' }}
          />
          {/* <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              border: 'red 1px solid',
              color: 'red',
              borderRadius: '10px',
            }}
          >
            임시저장
          </button> */}
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: 'red',
              border: 'none',
              color: 'white',
              borderRadius: '10px',
            }}
          >
            작성하기
          </button>
        </FlexRow>
      </form>
    </WebWrapper792px>
  );
};
export default AddPostForm;
