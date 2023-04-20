import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { apis } from '../shared/axios';
import { useMutation } from '@tanstack/react-query';
import { cookies } from '../shared/cookie';
import { InputArea } from '@components/Atoms/Input';
import { ButtonText } from '@components/Atoms/Button';
import styled from 'styled-components';

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
  const token = cookies.get('access_token');
  const { mutate, isLoading, isSuccess, isIdle } = useMutation({
    mutationFn: async (payload) => {
      const data = await apis.post(`/posts/${query.id}/comments`, payload, {
        headers: {
          Access_Token: `${token}`,
        },
      });
      console.log('payload', payload);
    },
    onSuccess: () => {
      alert('댓글 추가를 완료하였습니다.');
      setCommentList({ content: '' });
    },
    onError: (error) => {
      console.log('error', error.response.data.message);
      alert(error.response.data.message);
    },
  });
  return (
    <TotalDiv>
      <BottomHr />
      <AddDiv>
        <InputArea
          variant="default"
          size="lg"
          type="text"
          value={commentList.content}
          name="content"
          onChange={changeInputHandler}
        />
        <ButtonText
          variant="primary"
          style={{ width: '84px' }}
          disabled={isLoading}
          onClick={() => {
            mutate(commentList);
          }}
          label={isLoading ? '등록중' : '등록'}
        />
      </AddDiv>
    </TotalDiv>
  );
};

export default AddComment;

const TotalDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
const AddDiv = styled.div`
  width: 792px;
  margin-top: 50px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
`;

const BottomHr = styled.hr`
  border: 0.5px solid#E8EBED;
  width: 792px;
  height: 0px;
  border-bottom: 0px;
`;
