import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment/moment';
import 'react-calendar/dist/Calendar.css';
import styles from './react-calender.module.css';
import { useQuery } from '@tanstack/react-query';

import { cookies } from '@shared/cookie';
import { apis } from '@shared/axios';

function Log() {
  const [value, onChange] = useState(new Date());
  console.log('onChange', Calendar);
  const marks = ['15-04-2023', '20-04-2023'];

  const token = cookies.get('access_token');

  const { data } = useQuery({
    querryKey: ['GET_MYALCOHOLSLIST'],
    queryFn: async () => {
      const data = await apis.get('/my-page/likeAlkol?page=1?size=5', {
        headers: {
          Access_Token: `${token}`,
        },
      });
      console.log('data--------------', data);
      return data;
    },
  });
  return (
    <div>
      Log
      <div>
        <Calendar
          className={styles['react-calendar']}
          onChange={onChange}
          value={value}
          locale="en-EN"
        />
      </div>
      <img src="MypageQuestion.png" alt="작성한 리뷰가 없습니다." />
    </div>
  );
}

export default Log;
