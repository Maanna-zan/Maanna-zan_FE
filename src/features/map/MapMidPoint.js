import { FlexRow } from '@components/Atoms/Flex'
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper'
import { MidPointContext } from '@components/Modals/SearchKeywordModalPortal';
import { apis } from '@shared/axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'

function MapMidPoint() {
    // const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_KEY}/kakaoApi?query=술집&radius=1500&page=1&size=15`
    // useContext Hook을 사용하여 MidPointContext 컨텍스트 값을 가져온다. (midPoint 값)
    const midPoint = useContext(MidPointContext);
    console.log(midPoint);
    console.log(MidPointContext);
    const [midPointProp, setMidPointProp] = useState();
    //  중간 위치 탐색 page 이동 위한 useRouter선언.
    const router = useRouter();
    // //  중간 위치 탐색 페이지 이동 버튼 핸들러
    // const moveToMapMidPointButtonClickHandler = () => {
    //     router.push('/mapmidpoint');
    // };
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['GET_KAKAOAPI'],
        queryFn: async () => {
        const response = await apis.get(
            // 서버 URL
            `/kakaoApi?y=${midPoint.lat}&x=%20${midPoint.lng}&query=술집&radius=1500&page=1&size=15&sort=distance`,
            // 중간지점 lat,lng값
            midPoint
        );
        return response.data.message;
    }}, 
    {
        // 에러 처리
        onError: (error) => {
            console.error(error);
        },
        // 패칭 데이터 상태 변화
        onSettled: (data) => {
            alert(data);
        }
    });
    const handleClick = () => {
        refetch()
        router.push('/mapmidpoint');
    };

    return (
        <WebWrapper>
            <WebWrapperHeight>
                <FlexRow style={{ justifyContent: 'space-between' }}>
                    <button onClick={handleClick}>
                        검색
                    </button>
                    <div></div>
                    <input></input>
                </FlexRow>
            </WebWrapperHeight>
        </WebWrapper>
    )
}

export default MapMidPoint