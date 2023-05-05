import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { InputArea } from '@components/Atoms/Input';
import { ButtonText } from '@components/Atoms/Button';
import KakaoButton from '@features/kakaoLogin/KakaoButton';
import { CloseBtn } from '@components/Atoms/CloseBtn';
import { LightTheme } from '@components/Themes/theme';

export default function LogMyDayDetailModal({ onClose, id, data }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  console.log('id', id);
  //캘린더 로그 수정모드
  const [isEditMode, setIsEditMode] = useState(false);
  const [callenderId, setCallenderId] = useState(null);
  const [callederTitle, setCallenderTitle] = useState('');
  const [callederContent, setCallenderContent] = useState('');
  const [callederSetDated, setCallenderSetDated] = useState('');
  const [titleLength, setTitleLength] = useState(0);
  console.log('titleLength', titleLength);
  const [contentLength, setContentLength] = useState(0);

  const handleTitleChange = (e) => {
    setCallenderTitle(e.target.value);
    setTitleLength(e.target.value.length);
  };

  const handleContentChange = (e) => {
    setCallenderContent(e.target.value);
    setContentLength(e.target.value.length);
  };

  console.log('callederTitle', callederTitle);
  const token = cookies.get('access_token');

  //삭제
  const { mutate: calLogDelete } = useMutation({
    mutationFn: async (id) => {
      await apis.delete(`/my-page/calendar/${id}`, {
        headers: {
          Access_Token: `${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['LOG_DATE']);
      alert.confirm('일정을 삭제하시겠습니까?');
    },
  });

  const handleDelete = (id) => {
    const lastConfirm = window.confirm('정말 삭제하시겠습니까?');
    if (lastConfirm) {
      calLogDelete(id);
    }
  };
  const handleEdit = (data) => {
    setIsEditMode((prev) => ({ ...prev, [data.id]: true }));
    setCallenderId(data.id);
    setCallenderTitle(data.title);
    setCallenderSetDated(data.selectedDate);
    setCallenderContent(data.content);
    setTitleLength(data.title.length);
    setContentLength(data.content.length);
  };
  const editButton = () => {
    setIsEditMode(true);
    handleEdit(data);
  };

  const handleUpdate = () => {
    const lastConfirm = window.confirm('정말 수정하시겠습니까?');
    if (lastConfirm) {
      calLogUpdate({
        id: callenderId,
        title: callederTitle,
        content: callederContent,
        selectedDate: callederSetDated,
      });
    }

    // setIsEditMode((prev) => ({ ...prev, [data.id]: false }));
  };
  //수정
  const { mutate: calLogUpdate } = useMutation({
    mutationFn: async (payload) => {
      console.log('patloadEdit', payload);
      const { data } = await apis.patch(
        `/my-page/calendar/${payload.id}`,
        payload,
        {
          headers: {
            Access_Token: `${token}`,
          },
        },
      );
      // console.log('editdata', data);
      return data;
    },
    onSuccess: () => {
      setIsEditMode(false);
      queryClient.invalidateQueries(['LOG_DATE']);
      window.alert('수정 완료!');
    },
    onError: (e) => {
      window.alert('수정 오류!');
    },
  });

  return (
    <>
      <ModalDiv onClick={onClose} className="modal"></ModalDiv>
      <Modal className="modal-overlay">
        <span
          style={{
            position: 'fixed',
            right: '30px',
            top: '20px',
            cursor: 'pointer',
            width: '12px',
            height: '12px',
          }}
          onClick={onClose}
        >
          <CloseBtn />
        </span>

        {data ? (
          <>
            {!isEditMode ? (
              <InnerDiv key={data.id}>
                <h1 className="Login">메모글 상세조회</h1>
                <p className="title">{data.title}</p>
                <hr className="hr" />
                <p className="content">{data.content}</p>
                <div>
                  <p className="date">
                    {data.selectedDate.substr(2).replace(/-/gi, '.')}
                  </p>
                </div>
                <div className="totalButton">
                  <ButtonText
                    size="xxxsm"
                    variant="activeRed"
                    label="삭제하기"
                    onClick={() => handleDelete(data.id)}
                  />
                  <ButtonText
                    size="xxxsm"
                    variant="primary"
                    label="수정"
                    onClick={editButton}
                  />
                </div>
              </InnerDiv>
            ) : (
              <InnerDiv key={data.id}>
                <h1 className="Login">메모글 상세조회</h1>
                <div className="twoEdit">
                  <InputArea
                    className="editTitle"
                    variant="default"
                    size="md"
                    type="text"
                    name="title"
                    maxLength="50"
                    value={callederTitle}
                    onChange={handleTitleChange}
                  />
                  <CharCount>{titleLength} / 50</CharCount>
                </div>
                <hr className="hr" />
                <textarea
                  maxLength="1500"
                  className="textarea"
                  name="content"
                  value={callederContent}
                  onChange={handleContentChange}
                />
                <CharCount>{contentLength} / 1500</CharCount>
                <div className="bottomDiv">
                  <InputArea
                    className="editDate"
                    variant="default"
                    size="md"
                    type="date"
                    name="content"
                    maxLength="1500"
                    value={callederSetDated}
                    onChange={(e) => setCallenderSetDated(e.target.value)}
                  />
                  <div className="editMode">
                    <ButtonText
                      size="xxxsm"
                      label="취소"
                      variant="activeRed"
                      onClick={() => {
                        setIsEditMode(false);
                      }}
                    />
                    <ButtonText
                      size="xxxsm"
                      variant="primary"
                      label="완료"
                      onClick={handleUpdate}
                    />
                  </div>
                </div>
              </InnerDiv>
            )}
          </>
        ) : (
          <p>로딩중</p>
        )}
      </Modal>
    </>
  );
}

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #6a758152;
  z-index: 999;
`;

const Modal = styled.div`
  padding: 20px 40px;
  border-radius: 20px;
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  background-color: rgba(255, 255, 255);
  z-index: 1500;
  width: 618px;
  height: 440px;

  border: 1px solid #939aa0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: -30px;
  .InputArea {
    width: 250px;
    display: flex;
    justify-content: center;
  }
  .Login {
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
  .title {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  .hr {
    width: 578px;
  }
  .content {
    width: 578px;
    height: 238px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    word-wrap: break-word;
    overflow-y: scroll;
  }
  .content::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
  .date {
    font-weight: 400;
    font-size: 13px;
    line-height: 14px;
    color: #9ea4aa;
  }
  .totalButton {
    width: 580px;
    display: flex;
    justify-content: space-between;
  }
  .editMode {
    display: flex;
    gap: 5px;
    justify-content: flex-end;
  }
  .twoEdit {
    width: 580px;
    display: flex;
    justify-content: space-between;
  }
  .twoButton {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .editTitle {
    border: none;
    width: 500px;
  }
  .editDate {
    border: none;
    width: 130px;
  }
  .textarea {
    margin-top: 5px;
    border: none;
    height: 100%;
    width: 570px;
    resize: none; /* 크기 조절 못하게 함 */
  }
  .textarea::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
  .bottomDiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const CharCount = styled.p`
  font-size: 12px;
  color: ${LightTheme.PRIMARY_NORMAL};
  /* margin-top: 13px; */
  width: 65px;
`;
