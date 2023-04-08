import { apis } from '../shared/axios';
import { useMutation } from 'react-query';

export const useConfirm = () => {
  const { mutate: confirm, status } = useMutation({
    mutationFn: async ({ type, value }) => {
      const data = await apis.post(`users/confirm-${type}`, { [type]: value });
      console.log('data', data);
      return data;
    },
    onSuccess: (data) => {
      alert(data.config.data);
    },
    onError: (e) => {
      alert(e.response.data.message);
    },
  });
  return [confirm, status];
};
