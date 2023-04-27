import { FlexRow } from '@components/Atoms/Flex'
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper'
import { MidPointContext, PassPropsWithContextAPI } from '@components/Modals/SearchKeywordModalPortal';
import { apis } from '@shared/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'

function MapMidPoint() {
    //  MapMidPoint 컴포넌트에 보여지는 요소 안 보이게 하기
    const [showVue, setShowVue] = useState(false)
    // console.log("midPoint===>",midPoint);
    // useContext Hook을 사용하여 MidPointContext 컨텍스트 값을 가져온다. (midPoint 값)
    // const midPoint = useContext(MidPointContext);
    // console.log("midPoint===>",midPoint);

    // midPoint값 props로 받아 state로 저장.
    // const [midPointProp, setMidPointProp] = useState();


    // 서버와 통신
        const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['GET_KAKAOAPI'],
        queryFn: async () => {
        console.log("response",response)
        const response = await apis.get(
            // 서버 URL
            `/kakaoApi?y=${midPoint?.lat}&x=%20${midPoint?.lng}&query=술집&radius=1500&page=1&size=15&sort=distance`,
            // 중간지점 lat,lng값
            midPointProp
        );
        return response;
        },
        staleTime: 6000000 // 100분 (단위: 밀리초)
    }, 
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
    // console.log("midPoint===>",midPoint);


    // const queryClient = useQueryClient();
    // // const midPointProp = queryClient.getQueryData('midPointProp');
    // const { data: midPointProp } = useQuery('midPointProp', () => {
    //     return fetch('http://http://localhost:3000/map').then((res) => res.json());
    //   });

    const queryClient = useQueryClient();
    const midPointProp = queryClient.getQueryData({queryKey: ['FUCK']});
    console.log("ㅗㅗㅗmidPointPropㅗㅗㅗ",midPointProp)
    

    return (
        <WebWrapper>
            <WebWrapperHeight>
                <FlexRow style={{ justifyContent: 'space-between' }}>
                {showVue && <button onClick={handleClick}>버튼</button>}
                {/* <div>{midPointProp}</div> */}
                </FlexRow>
            </WebWrapperHeight>
        </WebWrapper>
    )
}

export default MapMidPoint










    // const { data, isLoading, isError, refetch } = useQuery({
    //     queryKey: ['GET_KAKAOAPI'],
    //     queryFn: async () => {
    //     console.log("response",response)
    //     const response = await apis.get(
    //         // 서버 URL
    //         `/kakaoApi?y=${midPoint?.lat}&x=%20${midPoint?.lng}&query=술집&radius=1500&page=1&size=15&sort=distance`,
    //         // 중간지점 lat,lng값
    //         midPoint
    //     );
    //     return response;
    //     },
    //     staleTime: 6000000 // 100분 (단위: 밀리초)
    // }, 
    // {
    //     // 에러 처리
    //     onError: (error) => {
    //         console.error(error);
    //     },
    //     // 패칭 데이터 상태 변화
    //     onSettled: (data) => {
    //         alert(data);
    //     }
    // });
    // useEffect(() => {
    //     refetch();
    // }, [router]);
    // //