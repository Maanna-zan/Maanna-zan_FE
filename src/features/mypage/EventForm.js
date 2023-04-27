import React, { useState } from 'react';
import styled from 'styled-components';

const EventForm = ({ selectedDate, onSubmit }) => {
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
      <Label>Title:</Label>
      <Input type="text" value={title} onChange={handleTitleChange} required />
      <Label>Content:</Label>
      <Textarea value={content} onChange={handleContentChange} required />
      <Button type="submit">Add Event</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #0060c0;
  }
`;

export default EventForm;
