import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment/moment';
import { LightTheme } from '@components/Themes/theme';

const EventForm = ({ selectedDate, selectedDateLog, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleLength, setTitleLength] = useState(0);
  const [contentLength, setContentLength] = useState(0);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleLength(e.target.value.length);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentLength(e.target.value.length);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, selectedDate });
    setTitle('');
    setContent('');
    setContentLength(0);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="bottomContent">
        <Input
          type="text"
          value={title}
          maxLength="49"
          placeholder="제목을 작성해주세요."
          onChange={handleTitleChange}
          required
        />
        <CharCount>{titleLength} / 50</CharCount>
      </div>

      <Hr />

      <Textarea
        value={content}
        placeholder="내용을 입력해주세요."
        maxLength="1499"
        onChange={handleContentChange}
        required
      />

      <div className="bottomContent">
        <div className="bottomContent2">
          <p className="date">{selectedDateLog}</p>
          <CharCount>{contentLength} / 1500</CharCount>
        </div>

        <Button type="submit">작성</Button>
      </div>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background-color: white;
  width: 487px;
  height: 322px;
  border-radius: 8px;
  padding: 15px;
  .bottomContent {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .bottomContent2 {
    display: flex;
    align-items: center;
    gap: 270px;
  }
  .date {
    color: ${LightTheme.FONT_SECONDARY};
  }
`;
const Hr = styled.hr`
  border: 0.5px solid ${LightTheme.FONT_TERTIARY};
  width: 447px;
  height: 0px;
`;
const Label = styled.label`
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border: none;
  ::placeholder {
    color: ${LightTheme.FONT_SECONDARY};
  }
`;

const Textarea = styled.textarea`
  padding: 8px;
  width: 100%;
  border: none;
  height: 207px;
  ::placeholder {
    color: ${LightTheme.FONT_SECONDARY};
  }
`;
const CharCount = styled.p`
  font-size: 12px;
  color: #9ea4aa;
  margin-top: 13px;
  width: 65px;
`;

const Button = styled.button`
  background-color: #ff4840;
  color: #fff;
  width: 14%;
  padding: 6px 14px;
  border-radius: 8px;
  border: none;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${LightTheme.PRIMARY_HEAVY};
  }
`;

export default EventForm;
