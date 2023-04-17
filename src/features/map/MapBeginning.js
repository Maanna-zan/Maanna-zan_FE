import { ButtonText } from '@components/Atoms/Button';
import { FlexRow } from '@components/Atoms/Flex';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { Map} from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const MapBeginning = () => {
    //  중간 위치 검색하기 버튼 눌렀을 때, 중간 위치 검색 페이지로 이동 위한 선언들.
    const queryClient = useQueryClient();
    const router = useRouter();
    //  중간 위치 검색 페이지 이동 버튼 핸들러
    const moveToMapSearchButtonClickHandler = () => {
        router.push('/map');
    };
    return (
    <WebWrapper style={{paddingTop: "150px"}}>
        <WebWrapperHeight>
            <FlexRow style={{ justifyContent: 'space-between'}}>
                <Map
                    center={{
                        lat: 37.56682420267543,
                        lng: 126.978652258823
                    }}
                    level={5}
                    style={{
                        width: "690px",
                        height: "803px",
                    }}
                />

                <contentWrapper>
                    <h1>중간 위치에 있는
                    술집을 찾아드립니다.
                    </h1>
                    <span>
                        중간 위치에 있는 맛집을 찾아드립니다.
                    </span>
                    <ButtonText
                        size='xl'
                        variant='primary'
                        onClick={moveToMapSearchButtonClickHandler}
                    >
                    중간 위치 검색하기
                    </ButtonText>
                </contentWrapper>
            </FlexRow>
        </WebWrapperHeight>
    </WebWrapper>
    )
}

export default MapBeginning
const contentWrapper = styled.div`

`