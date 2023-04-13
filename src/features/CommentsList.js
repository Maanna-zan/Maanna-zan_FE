import React from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apis } from '../shared/axios';
import { cookies } from '../shared/cookie';
import { useState } from 'react';

const CommentsList = () => {
  const queryClient = useQueryClient();

  const { query } = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [commentContent, setCommentContent] = useState('');

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
      //   console.log('data', data.data.commentList);
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

  console.log('data---->', data);
  return (
    <div>
      {/* {data?.map((comments) => {
        //return 생략의 슬픔... ㅂ비애///
        return (
          <div key={comments.id}>
            <h2>{comments.content}</h2>
            <div>{comments.nickName}</div>
            <div>{comments.createdAt}</div>
          </div>
        );
      })} */}

      <div style={{ marginTop: '40px' }}>
        {isEditMode ? (
          <>
            <input
              type="text"
              name="content"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button onClick={handleUpdate}>완료</button>
          </>
        ) : (
          <>
            {data?.map((comment) => (
              <div key={comment.id}>
                <h2>{comment.content}</h2>
                <div>{comment.id}</div>
                <div>{comment.nickName}</div>
                <div>{comment.createdAt}</div>
                <button onClick={() => handleDelete(comment.id)}>삭제</button>
                <button onClick={() => handleEdit(comment)}>수정</button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentsList;
