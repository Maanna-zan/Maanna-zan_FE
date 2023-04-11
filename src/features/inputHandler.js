export const changeInputHandler = (e) => {
  const { valuetarget: value, nametarget: name } = e.target;
  setTodo((pre) => ({ ...pre, [name]: value }));
};
