import { FlexColumn, FlexRow } from '@components/Atoms/Flex';
import { MapDefault } from '@components/Atoms/MapDefault'
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import React from 'react';
import { Map } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const MapBeginning = () => {
    return (
    <WebWrapper style={{paddingTop: "150px"}}>
        <WebWrapperHeight>
            <FlexRow style={{ justifyContent: 'space-between'}}>
                <MapDefault>
                </MapDefault>

                <contentWrapper>
                    <h1>중간 위치에 있는
                    술집을 찾아드립니다.
                    </h1>
                    <span>
                        중간 위치에 있는 맛집을 찾아드립니당중간 위치에 있는 맛집을 찾아드립니당중간 위치에 있는 맛집을 찾아드립니당
                    </span>
                    <p>중간 위치 검색하기</p>
                </contentWrapper>
            </FlexRow>
        </WebWrapperHeight>
    </WebWrapper>
    )
}

export default MapBeginning
const contentWrapper = styled.div`

`