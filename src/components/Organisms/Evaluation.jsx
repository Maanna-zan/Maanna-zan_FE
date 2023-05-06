import React from 'react';
import { FlexColumn, FlexRow, FlexRowCenter } from '@components/Atoms/Flex';
import { StarStoreAvg } from '@components/Modals/starStoreAvg';
import styled from 'styled-components';
export const Evaluation = ({ data }) => {
  console.log('가게별점들왜이러니', data);
  const starAvg = data.starAvg;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ gap: '8px', marginBottom: '28 px' }}>
        <BodyMidum style={{ marginBottom: '4px' }}>평균 별점</BodyMidum>
        <FlexRow style={{ gap: '8px', alignItems: 'center' }}>
          <StarStoreAvg starAvg={starAvg} />
          <span style={{ font: `var(--caption1-bold) Pretendard sans-serif` }}>
            {data.starAvg.toFixed(2)}
          </span>
        </FlexRow>
      </div>
      <FlexColumn style={{ gap: '20px ' }}>
        <FlexRow
          style={{
            gap: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '28px',
          }}
        >
          <BodyMidum style={{ width: '40px' }}>맛</BodyMidum>
          <div
            style={{
              width: '238px',
              height: '4px',

              position: 'relative',
              background: '#E8EBED',
              borderRadius: '20px',
            }}
          >
            <div
              style={{
                width: `${data.tasteAvg * 2 * 10}%`,
                height: '4px',
                left: '1261px',
                top: '321px',
                position: 'absolute',
                top: '0',
                left: '0',
                background: '#FF4840',
                borderRadius: '20px',
              }}
            ></div>
          </div>
          <IntBodyMidum>{data.tasteAvg}</IntBodyMidum>
        </FlexRow>
        <FlexRow
          style={{
            gap: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <BodyMidum style={{}}>서비스</BodyMidum>
          <div
            style={{
              width: '238px',
              height: '4px',

              position: 'relative',
              background: '#E8EBED',
              borderRadius: '20px',
            }}
          >
            <div
              style={{
                width: `${data.serviceAvg * 2 * 10}%`,
                height: '4px',
                left: '1261px',
                top: '321px',
                position: 'absolute',
                top: '0',
                left: '0',
                background: '#FF4840',

                borderRadius: '20px',
              }}
            ></div>
          </div>
          <IntBodyMidum>{data.serviceAvg}</IntBodyMidum>
        </FlexRow>
        <FlexRow
          style={{
            gap: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <BodyMidum>만족도</BodyMidum>
          <div
            style={{
              width: '238px',
              height: '4px',

              position: 'relative',
              background: '#E8EBED',
              borderRadius: '20px',
            }}
          >
            <div
              style={{
                width: `${data.satisfactionAvg * 2 * 10}%`,
                height: '4px',
                left: '1261px',
                top: '321px',
                position: 'absolute',
                top: '0',
                left: '0',
                background: '#FF4840',
                borderRadius: '20px',
              }}
            ></div>
          </div>
          <IntBodyMidum>{data.satisfactionAvg}</IntBodyMidum>
        </FlexRow>
        <FlexRow
          style={{
            gap: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <BodyMidum>분위기</BodyMidum>

          <div
            style={{
              width: '238px',
              height: '4px',

              position: 'relative',
              background: '#E8EBED',
              borderRadius: '20px',
            }}
          >
            <div
              style={{
                width: `${data.atmosphereAvg * 2 * 10}%`,

                height: '4px',
                left: '1261px',
                top: '321px',
                position: 'absolute',
                top: '0',
                left: '0',
                background: '#FF4840',
                borderRadius: '20px',
              }}
            ></div>
          </div>
          <IntBodyMidum>{data.atmosphereAvg}</IntBodyMidum>
        </FlexRow>
      </FlexColumn>
    </div>
  );
};
const BodyMidum = styled.div`
  font: var(--body2-medium) Pretendard sans-serif;
`;
const IntBodyMidum = styled.div`
  font: var(--body2-medium) Pretendard sans-serif;
  width: 20px;
  text-align: left;
  overflow: hidden;
`;
