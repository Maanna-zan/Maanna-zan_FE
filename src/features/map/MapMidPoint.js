import { FlexRow } from '@components/Atoms/Flex'
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper'
import { apis } from '@shared/axios';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

function MapMidPoint() {
    // const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_KEY}/kakaoApi?query=술집&radius=1500&page=1&size=15`
    
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['CorrespondingWithKakaoApi'],
        queryFn: async () => {
        const response = await apis.get(
            // 서버 URL
            '/kakaoApi?query=술집&radius=1500&page=1&size=15',
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
        refetch();
    };
    return (
        <WebWrapper>
            <WebWrapperHeight>
                <FlexRow style={{ justifyContent: 'space-between' }}>
                    <button onClick={handleClick}>
                        검색
                    </button>
                </FlexRow>
            </WebWrapperHeight>
        </WebWrapper>
    )
}

export default MapMidPoint