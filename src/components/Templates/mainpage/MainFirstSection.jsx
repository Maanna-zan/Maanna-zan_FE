import { useState, useEffect } from 'react';
import { LightTheme } from '@components/Themes/theme';
import { GrideGapCol4, GrideGapRow4 } from '@components/Atoms/Grid';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import { FlexColumn, FlexRow } from '@components/Atoms/Flex';
import { BoxTextReal } from '@components/Atoms/BoxTextReal';
import React from 'react';
import styled from 'styled-components';
import { getView, getBest } from '../../../hook/alcohol/useGetAllStore';
import { useQueries, useQuery } from '@tanstack/react-query';
import { apis } from '@shared/axios';
const PAGE_SIZE = 3;
export const MainFirstSection = () => {
  //추후 useQuery에서 hook으로 사용.. 시간이...ㅠㅠ
  // const { data: getViewData, isLoading } = useQuery([
  //   'getView',
  //   getView(1, PAGE_SIZE),
  // ]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  const [getView, seGetView] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apis.get(`/alkol/view?page=${1}&size=3`);
      console.log('response.data------->', response.data);
      seGetView(response.data);
    };

    fetchData();
  }, []);

  const [getBest, seGetBest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apis.get(`/alkol/best?page=${1}&size=4`);
      seGetBest(response.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <StWebBg></StWebBg>
      <WebWrapper style={{ overflow: 'hidden' }}>
        <WebWrapperHeight>
          <GrideGapCol4 style={{ margin: '34px 0 12px 0' }}>
            <FlexRow style={{ justifyContent: 'space-between' }}>
              <StTitleGet>HOT, 여기서 만나잔</StTitleGet>
            </FlexRow>
            <div></div>
            <div>
              <StSpan style={{ float: 'right' }}>모두 보기</StSpan>
            </div>
            <FlexRow style={{ justifyContent: 'space-between' }}>
              <StTitleGet>리뷰가 많은 장소</StTitleGet>{' '}
              <StSpan>모두 보기</StSpan>
            </FlexRow>
          </GrideGapCol4>
          <GrideGapCol4>
            {getView?.map((store, index) => (
              <BoxTextReal size="nonePadding" variant="realDefaultBox">
                <div key={store?.id}>
                  <img src={`/fakeImage/${index + 1}.png`} alt="베스트술집" />

                  {store.place_name}
                  <div style={{ margin: '12px auto' }}>
                    <img
                      style={{ margin: '0px 8px 0px 0' }}
                      src="adress.png"
                      alt="주소아이콘"
                    />
                    <span>{store?.address_name}</span>
                  </div>
                </div>
              </BoxTextReal>
            ))}

            <GrideGapRow4>
              {getBest?.map((store, index) => (
                <BoxTextReal size="sm" variant="grayBolderBox">
                  <FlexRow key={store?.id} style={{ alignItems: 'center' }}>
                    <StImgMin
                      src={`/fakeImage/${index + 1}.png`}
                      alt="베스트술집"
                    />
                    <FlexColumn>
                      <span
                        style={{
                          margin: '0px 0px 0 8px',
                          font: `var(--label2-bold) normal sans-serif`,
                        }}
                      >
                        {store?.address_name}
                      </span>
                      <div>{store?.roomViewCount}</div>
                    </FlexColumn>
                  </FlexRow>
                </BoxTextReal>
              ))}
            </GrideGapRow4>
          </GrideGapCol4>
        </WebWrapperHeight>
      </WebWrapper>
    </>
  );
};
const StWebBg = styled.div`
  width: 100vw;
  height: 400px;
  background-image: url('/mainFirstBg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const StTitleGet = styled.span`
  /* color: ${LightTheme.FONT_PRIMARY};
  font-weight: ${LightTheme.FONT_BOLD}; */
  font: var(--head3-bold) normal sans-serif;
`;
const StSpan = styled.span`
  color: ${LightTheme.FONT_SECONDARY};
  font-weight: ${LightTheme.FONT_REGULAR};
`;
const StImg = styled.img`
  position: absolute;
`;
const StImgMin = styled.img`
  width: 84px;
  height: 56px;
  position: center;
  border-radius: 5px;
`;
