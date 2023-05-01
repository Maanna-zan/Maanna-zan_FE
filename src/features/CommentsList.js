import React from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apis } from '../shared/axios';
import { cookies } from '../shared/cookie';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InputArea } from '@components/Atoms/Input';
import AddReComment from './AddReComment';
import ReCommentList from './ReCommentList';

const CommentsList = () => {
  const queryClient = useQueryClient();

  const { query } = useRouter();
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
    const comment = data.find((comment) => comment.id === commentId);
    if (comment) {
      updateContent({ id: comment.id, payload });
    }
  };

  const handleDelete = (id) => {
    deleteComment(id);
  };

  const token = cookies.get('access_token');
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_COMMENTS'],
    queryFn: async () => {
      const { data } = await apis.get(`/posts/${query.id}`, {
        headers: {
          Access_Token: `${token}`,
        },
      });
      // console.log('data', data);
      return data.data.commentList;
    },
    //enabled: -> 참일 때 실행시켜준다.
    enabled: Boolean(query.id),
    onSuccess: () => {},
  });
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
      <CommentDiv>
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
            {data?.map((comment) => (
              <div key={comment.id}>
                <div className="nickName">{comment.nickName}</div>
                <h2 className="content">{comment.content}</h2>
                <div className="mycomment">
                  <AddReComment comment={comment} />
                  {userNickName === comment.nickName && (
                    <>
                      <button
                        className="Button"
                        onClick={() => handleEdit(comment)}
                      >
                        수정
                      </button>
                      <button
                        className="Button"
                        onClick={() => handleDelete(comment.id)}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>

                <div>
                  <ReCommentList comment={comment} />
                </div>
              </div>
            ))}
          </>
        )}
      </CommentDiv>
    </div>
  );
};

export default CommentsList;

const CommentDiv = styled.div`
  width: 792px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  .nickName {
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
  }
  .content {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }
  .Button {
    border: none;
    background-color: transparent;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #72787f;
    width: 50px;
  }
  .mycomment {
    display: flex;
  }
`;
