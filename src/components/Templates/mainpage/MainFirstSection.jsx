import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LightTheme } from '@components/Themes/theme';
import { GrideGapCol4, GrideGapRow4 } from '@components/Atoms/Grid';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import { FlexColumn, FlexRow, FlexRowCenter } from '@components/Atoms/Flex';

import styled from 'styled-components';
import { getView, getBest } from '../../../hook/alcohol/useGetAllStore';
import { useQueries, useQuery } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import { BoxTextReal } from '@components/Atoms/BoxTextReal';
import {
  ImgCenter,
  ImgWrapper248x248,
  ImgWrapper282x322,
  ImgWrapper84x56,
} from '@components/Atoms/imgWrapper';
const PAGE_SIZE = 3;
export const MainFirstSection = () => {
  const [getView, seGetView] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apis.get(`/alkol/best?page=${1}&size=3`);
      seGetBest(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apis.get(`/alkol/best?page=${1}&size=4`);
      seGetView(response.data);
    };

    fetchData();
  }, []);

  const [getBest, seGetBest] = useState([]);

  return (
    <>
      <WebWrapperHeight>
        <StWebBg></StWebBg>
        <WebWrapper style={{ overflow: 'hidden' }}>
          <GrideGapCol4 style={{ margin: '34px 0 12px 0' }}>
            <FlexRow style={{ justifyContent: 'space-between' }}>
              <StTitleGet>HOT, 여기서 만나잔</StTitleGet>
            </FlexRow>
            <div></div>
            <div>
              <Link href="/community">
                <StSpan style={{ float: 'right' }}>모두 보기</StSpan>
              </Link>
            </div>
            <FlexRow style={{ justifyContent: 'space-between' }}>
              <StTitleGet>리뷰가 많은 장소</StTitleGet>
              <Link href="/alcohols">
                <StSpan>모두 보기</StSpan>
              </Link>
            </FlexRow>
          </GrideGapCol4>
          <GrideGapCol4>
            {getBest?.alkolResponseDtoList?.map((store, index) => (
              <div key={store?.id || index}>
                <Link href={`/alcohols/${store?.apiId}`}>
                  <BoxTextReal size="nonePadding" variant="realDefaultBox">
                    <div>
                      <ImgWrapper282x322>
                        <ImgCenter
                          style={{ width: '100%', height: '100%' }}
                          src={
                            store.postList.length &&
                            store.postList[0].s3Url !== null
                              ? store.postList[0].s3Url
                              : store.postList
                                  .slice(1)
                                  .find((post) => post?.s3Url)?.s3Url ||
                                '/noimage_282x248_.png'
                          }
                          alt={`베스트 술집${store?.place_name}`}
                        />
                      </ImgWrapper282x322>
                      <div
                        style={{
                          marginTop: '12px',
                          font: `var(--title1-semibold) Pretendard sans-serif`,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {store.place_name}
                      </div>
                      <div style={{ margin: '12px auto' }}>
                        <img
                          style={{ margin: '0px 8px 0px 0' }}
                          src="adress.png"
                          alt="주소아이콘"
                        />
                        <span
                          style={{
                            color: `${LightTheme.FONT_PRIMARY}`,
                            font: `var(--title2-regular) Pretendard sans-serif`,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {store?.address_name}
                        </span>
                      </div>
                    </div>
                  </BoxTextReal>
                </Link>
              </div>
            ))}
            <GrideGapRow4>
              {getView?.alkolResponseDtoList?.map((store, index) => (
                <div key={store?.id || index}>
                  <Link href={`/alcohols/${store?.apiId}`}>
                    <BoxTextReal
                      size="sm"
                      variant="grayBolderBox"
                      style={{ height: '72px' }}
                    >
                      <FlexRow
                        key={store?.apiId}
                        style={{ height: '100%', alignItems: 'center' }}
                      >
                        <ImgWrapper84x56 style={{ margin: '4px' }}>
                          <ImgCenter
                            src={
                              store.postList.length &&
                              store.postList[0].s3Url !== null
                                ? store.postList[0].s3Url
                                : store.postList
                                    .slice(1)
                                    .find((post) => post?.s3Url)?.s3Url ||
                                  '/noimage_282x248_.png'
                            }
                            alt={`베스트 술집${store?.place_name}`}
                          />
                        </ImgWrapper84x56>
                        <FlexColumn
                          style={{
                            height: '100%',
                            justifyContent: `space-between`,
                          }}
                        >
                          <span
                            style={{
                              font: `var(--label2-bold) Pretendard sans-serif`,
                            }}
                          >
                            {store?.place_name}
                          </span>
                          <div>
                            <span
                              style={{
                                marginRight: '8px',
                                color: `${LightTheme.FONT_PRIMARY}`,
                                font: `var(--caption2-bold) Pretendard sans-serif`,
                              }}
                            >
                              리뷰
                            </span>
                            <span
                              style={{
                                color: `${LightTheme.FONT_PRIMARY}`,
                                font: `var(caption1-bold) Pretendard sans-serif`,
                              }}
                            >
                              {store?.roomViewCount}
                            </span>
                          </div>
                        </FlexColumn>
                      </FlexRow>
                    </BoxTextReal>
                  </Link>
                </div>
              ))}
            </GrideGapRow4>
          </GrideGapCol4>
          <FlexRowCenter
            style={{
              width: '100%',
            }}
          >
            <img
              src="scrollDownBtn.png"
              alt="scrollDownBtn"
              style={{
                marginTop: '64px',
              }}
            />
          </FlexRowCenter>
        </WebWrapper>
      </WebWrapperHeight>
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
  color: ${LightTheme.FONT_PRIMARY};
  font: var(--head3-bold) Pretendard sans-serif;
`;
const StSpan = styled.span`
  color: ${LightTheme.FONT_SECONDARY};
  font: var(--body1-regular) Pretendard sans-serif;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const StImg = styled.img`
  position: absolute;
`;
const StImgMin = styled.img`
  width: 84px;
  height: 56px;
  position: center;
  border-radius: 5px;
  margin-right: 8px;
`;
