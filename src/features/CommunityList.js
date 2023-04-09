import React from 'react';
import { useQuery } from 'react-query';
import { apis } from '../shared/axios';
import { cookies } from '../shared/cookie';

const CommunityList = () => {
  const token = cookies.get('refresh_token');

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_CONTENTS'],
    queryFn: async () => {
      const response = await apis.get('/posts', {
        headers: {
          refresh_token: `${token}`,
        },
      });
      console.log('response', response);
      return response.data;
    },
  });
  return <div>communityList</div>;
};

export default CommunityList;
