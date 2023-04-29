import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment/moment';

const EventForm = ({ selectedDate, selectedDateLog, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, selectedDate });
    setTitle('');
    setContent('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        placeholder="제목을 작성해주세요."
        onChange={handleTitleChange}
        required
      />
      <Hr />

      <Textarea
        value={content}
        placeholder="내용을 입력해주세요."
        onChange={handleContentChange}
        required
      />
      <div className="bottomContent">
        <p className="date">{selectedDateLog}</p>
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
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .date {
    color: #9ea4aa;
  }
`;
const Hr = styled.hr`
  border: 0.5px solid#E8EBED;
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
    color: #9ea4aa;
  }
`;

const Textarea = styled.textarea`
  padding: 8px;
  width: 100%;
  border: none;
  height: 207px;
  ::placeholder {
    color: #9ea4aa;
  }
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
    background-color: #c8150d;
  }
`;

export default EventForm;
