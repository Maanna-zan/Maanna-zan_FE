import { apis } from '../shared/axios';
import { useMutation } from '@tanstack/react-query';

export const useConfirm = () => {
  const { mutate: confirm, status } = useMutation({
    mutationFn: async ({ type, value }) => {
      console.log('type', type);
      const data = await apis.post(`users/confirm-${type}`, { [type]: value });
      return data;
    },
    onSuccess: (data) => {
      console.log('type1', data.config.data.split('"')[3]);
      if (data.config.data.split('"')[3].includes('@')) {
        alert(`${data.config.data.split('"')[3]}은 사용가능한 이메일 입니다.`);
      } else {
        alert(`${data.config.data.split('"')[3]}은 사용가능한 닉네임 입니다.`);
      }
    },
    onError: (e) => {
      alert(e.response.data.message);
    },
  });
  return [confirm, status];
};
