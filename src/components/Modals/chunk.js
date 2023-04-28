function chunk(arr, size) {
  const chunked_arr = [];
  let copied = [...arr];
  const numOfChild = Math.ceil(copied.length / size);
  for (let i = 0; i < numOfChild; i++) {
    chunked_arr.push(copied.splice(0, size));
  }
  return chunked_arr;
}

export default chunk;
