import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper'
import { FlexColumnCenter, FlexRow } from '@components/Atoms/Flex'
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import Pagination from '@components/Modals/Pagenation2';
import { LightTheme } from '@components/Themes/theme';
import { ButtonText } from '@components/Atoms/Button';
import { useRouter } from 'next/router';
import { InputArea } from '@components/Atoms/Input';
import MapAppointment from './MapAppointment';

function MapMidPoint() {
    // queryKey에 캐싱하여 값 불러오기위해 queryClient선언
    const queryClient = useQueryClient();
    // getQueryData로 캐싱한 값 MIDPOINTPROP키로 불러오기.
    const midPointProp = queryClient.getQueryData({queryKey: ['MIDPOINTPROP']});
    // getQueryData로 캐싱한 값 INPUTVALUESPROP키로 불러오기.
    const InputValuesProp = queryClient.getQueryData({queryKey: ['INPUTVALUESPROP']});
    //  map page로 뒤로가기 위한 useRouter선언.
    const router = useRouter();
    //  뒤로가기 버튼 핸들러
    const moveBackClickButtonHandler = () => {
        // 데이터 리셋
        // queryClient.removeQueries({queryKey: ['MIDPOINTPROP']});
        // queryClient.setQueryData(['MIDPOINTPROP'], null);
        // 이전 페이지로 이동
        // router.push('/map');

        //라우터의 이점을 활용하지 못한다는 단점있지만, 새로고침 하며 키값 초기화. 다른 방법 고민해보기
        window.location.href = '/map';
    }
    //  클릭 선택된 장소를 저장할 state 변수
    const [checkedPlace, setCheckedPlace] = useState('')
    function handleCheckedPlaceChange(e) {
        setCheckedPlace(e.target.value);
        // return (
        //     <>
        //         <input type="text" value={checkedPlace} onChange={handleCheckedPlaceChange} />
        //         <MapAppointment checkedPlace={checkedPlace} />
        //     </>
        // );
    }
    
    // console.log("111checkedPlace",checkedPlace)
    // 중간지점 좌표 받아온 값으로 서버와 통신하여 kakaoAPI값 DB저장 및 목록 불러오기
        const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['GET_KAKAOAPI'],
        queryFn: async () => {
        const response = await apis.get(
            // 서버 URL
            `/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=술집&radius=1500&page=1&size=15&sort=distance`,
            //테스트용 서버 URL
            // '/kakaoApi?y=37.534485&x=%20126.994369&query=술집&radius=1500&page=1&size=15&sort=distance',
            // 중간지점 lat,lng값
            midPointProp
        );
        return response;
        },
        //  한 번 실행되고 100분 후 실행되도록. 100분 (단위: 밀리초)
        staleTime: 6000000
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
    const kakaoApi = data?.data?.documents
    //  칵테일바 마커 및 리스트 불러오기
    const [cocktailPage, setCocktailPage] = useState(null);
    async function getCocktailPage() {
        const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=칵테일바&radius=1500&page=1&size=15&sort=distance`, midPointProp);
        setCocktailPage(response?.data);
    }
    //  칵테일바 submit button Handler
    const getCocktailPageSubmitHandler = async (e) => {
        e.preventDefault();
        const cocktailPage = await getCocktailPage();
        if (cocktailPage) {
            GetSpotsNearbyMidPoint(cocktailPage?.documents);
        }
        GetSpotsNearbyMidPoint(kakaoApiCocktail)
    };
    const kakaoApiCocktail = cocktailPage?.documents
    //  일본식주점 마커 및 리스트 불러오기
    const [izakayaPage, setIzakayaPage] = useState(null);
    async function getIzakayaPage() {
        const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=일본식주점&radius=1500&page=1&size=15&sort=distance`, midPointProp);
        setIzakayaPage(response?.data);
    }
    //  일본식주점 submit button Handler
    const getIzakayaPageSubmitHandler = async (e) => {
        e.preventDefault();
        const izakayaPage = await getIzakayaPage();
        if (izakayaPage) {
            GetSpotsNearbyMidPoint(izakayaPage?.documents);
        }
        GetSpotsNearbyMidPoint(kakaoApiIzakaya)
    };
    const kakaoApiIzakaya = izakayaPage?.documents
    //  실내포장마차 마커 및 리스트 불러오기
    const [pochaPage, setPochaPage] = useState(null);
    async function getPochaPage() {
        const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=실내포장마차&radius=1500&page=1&size=15&sort=distance`, midPointProp);
        setPochaPage(response?.data);
    }
    //  실내포장마차 submit button Handler
    const getPochaPageSubmitHandler = async (e) => {
        e.preventDefault();
        const pochaPage = await getPochaPage();
        if (pochaPage) {
            GetSpotsNearbyMidPoint(pochaPage?.documents);
        }
        GetSpotsNearbyMidPoint(kakaoApiPocha)
    };
    const kakaoApiPocha = pochaPage?.documents
    //  요리주점 마커 및 리스트 불러오기
    const [diningPubPage, setDiningPubPage] = useState(null);
    async function getDiningPubPage() {
        const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=요리주점&radius=1500&page=1&size=15&sort=distance`, midPointProp);
        setDiningPubPage(response?.data);
    }
    //  요리주점 submit button Handler
    const getDiningPubPageSubmitHandler = async (e) => {
        e.preventDefault();
        const diningPubPage = await getDiningPubPage();
        if (diningPubPage) {
            GetSpotsNearbyMidPoint(diningPubPage?.documents);
        }
        GetSpotsNearbyMidPoint(kakaoApiDiningPub)
    };
    const kakaoApiDiningPub = diningPubPage?.documents
        //  호프 마커 및 리스트 불러오기
        const [hofPage, setHofPage] = useState(null);
        async function getHofPage() {
            const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=호프&radius=1500&page=1&size=15&sort=distance`, midPointProp);
            setHofPage(response?.data);
        }
        //  호프 submit button Handler
        const getHofSubmitHandler = async (e) => {
            e.preventDefault();
            const hofPage = await getHofPage();
            if (hofPage) {
                GetSpotsNearbyMidPoint(hofPage?.documents);
            }
            GetSpotsNearbyMidPoint(kakaoApiHof)
        };
        const kakaoApiHof = hofPage?.documents
        //  와인바 마커 및 리스트 불러오기
        const [winePage, setWinePage] = useState(null);
        async function getWinePage() {
            const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=와인바&radius=1500&page=1&size=15&sort=distance`, midPointProp);
            setWinePage(response?.data);
        }
        //  와인바 submit button Handler
        const getWineSubmitHandler = async (e) => {
            e.preventDefault();
            const winePage = await getWinePage();
            if (winePage) {
                GetSpotsNearbyMidPoint(winePage?.documents);
            }
            GetSpotsNearbyMidPoint(kakaoApiWine)
        };
        const kakaoApiWine = winePage?.documents
        //  오뎅바 마커 및 리스트 불러오기
        const [fishCakePage, setFishCakePage] = useState(null);
        async function getFishCakPage() {
            const response = await apis.get(`/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=오뎅바바&radius=1500&page=1&size=15&sort=distance`, midPointProp);
            setFishCakePage(response?.data);
        }
        //  오뎅바 submit button Handler
        const getFishCakeSubmitHandler = async (e) => {
            e.preventDefault();
            const fishCakePage = await getFishCakPage();
            if (fishCakePage) {
                GetSpotsNearbyMidPoint(fishCakePage?.documents);
            }
            GetSpotsNearbyMidPoint(kakaoApiFishCake)
        };
        const kakaoApiFishCake = fishCakePage?.documents

    //  술집 종합 Submit 버튼 Handler (GetSpotsNearbyMidPoint함수 실행)
    const keywordSearchSubmitHandler = (e) => {
        e.preventDefault();
        // 지도 불러오기 및 마커 및 인포윈도우, pagination생성 함수 실행
        GetSpotsNearbyMidPoint(kakaoApi)
    };
    
    // 페이지 렌더링 되자마자 지도 불러오기.@@(한 번 더 실행이 되어야 마커들찍히는 문제 해결 필요)@@
    // useEffect(() => {
    //     keywordSearchSubmitHandler({ preventDefault: () => {} });
    // }, [kakaoApi]);

    useEffect(() => {GetSpotsNearbyMidPoint(kakaoApi, kakaoApiCocktail, kakaoApiIzakaya, kakaoApiPocha)}, [])
    useEffect(() => {GetSpotsNearbyMidPoint(kakaoApi)},[kakaoApi])
    useEffect(() => {GetSpotsNearbyMidPoint(kakaoApiCocktail)},[kakaoApiCocktail])
    useEffect(() => {GetSpotsNearbyMidPoint(kakaoApiIzakaya)},[kakaoApiIzakaya])
    useEffect(() => {GetSpotsNearbyMidPoint(kakaoApiPocha)},[kakaoApiPocha])
    useEffect(() => {GetSpotsNearbyMidPoint(kakaoApiPocha)},[kakaoApiDiningPub])
    useEffect(() => {GetSpotsNearbyMidPoint(kakaoApiPocha)},[kakaoApiHof])
    useEffect(() => {GetSpotsNearbyMidPoint(kakaoApiPocha)},[kakaoApiWine])
    // useEffect(() => {GetSpotsNearbyMidPoint(kakaoApiPocha)},[kakaoApiFishCake])

    //  키워드 검색 로직
    const GetSpotsNearbyMidPoint =() => {
        const { kakao } = window;
        //지도를 담을 영역의 DOM 레퍼런스
        const container = document.getElementById('map'); 
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(midPointProp?.lat, midPointProp?.lng), //지도의 중심좌표(중간지점props받은 값으로 해당지점 찍어줌)
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        //지도 생성 및 객체 리턴
        const map = new kakao.maps.Map(container, options); 
        const ps = new kakao.maps.services.Places();
        //  인포윈도우 선언(카카오map api에서 부르기)
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        // // 마커를 담을 배열입니다
        let markers = [];
    
        const searchForm = document.getElementById('submit_btn');
        if (kakaoApi) {
            searchForm?.addEventListener('click', function (e) {
            e.preventDefault();
            //kakaoApi넣어줘야 작동
            showingOnMap(kakaoApi)
            });
        }
        const searchFormCocktail = document.getElementById('submit_btn2');
        if (kakaoApiCocktail) {
            searchFormCocktail?.addEventListener('click', function (e) {
            e.preventDefault();
            showingOnMap(kakaoApiCocktail)
            });
        }
        const searchFormIzakaya = document.getElementById('submit_btn3');
        if (kakaoApiIzakaya) {
            searchFormIzakaya?.addEventListener('click', function (e) {
            e.preventDefault();
            showingOnMap(kakaoApiIzakaya)
            });
        }
        const searchFormPocha = document.getElementById('submit_btn4');
        if (kakaoApiPocha) {
            searchFormPocha?.addEventListener('click', function (e) {
            e.preventDefault();
            showingOnMap(kakaoApiPocha)
            });
        }
        const searchFormDiningPub = document.getElementById('submit_btn5');
        if (kakaoApiDiningPub) {
            searchFormDiningPub?.addEventListener('click', function (e) {
            e.preventDefault();
            showingOnMap(kakaoApiDiningPub)
            });
        }
        const searchFormHof = document.getElementById('submit_btn6');
        if (kakaoApiHof) {
            searchFormHof?.addEventListener('click', function (e) {
            e.preventDefault();
            showingOnMap(kakaoApiHof)
            });
        }
        const searchFormWine = document.getElementById('submit_btn7');
        if (kakaoApiWine) {
            searchFormWine?.addEventListener('click', function (e) {
            e.preventDefault();
            showingOnMap(kakaoApiWine)
            });
        }
        const searchFormFishCake = document.getElementById('submit_btn8');
        if (kakaoApiFishCake) {
            searchFormFishCake?.addEventListener('click', function (e) {
            e.preventDefault();
            showingOnMap(kakaoApiFishCake)
            });
        }
        // 마커 및 인포윈도우, pagination
        function showingOnMap(data) {
                // 검색 목록과 마커를 표출합니다
                displayPlaces(data);
            const bounds = new kakao.maps.LatLngBounds();
            for (let i = 0; i < data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            map.setBounds(bounds)
        
        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places) {
            const listEl = document.getElementById('placesList');
            const menuEl = document.getElementById('menu_wrap');
            const fragment = document.createDocumentFragment();
            const bounds = new kakao.maps.LatLngBounds();
            //  클릭된 항목에 대한 표시를 유지하기 위해 변수
            let clickedItem = null;
            //  클릭된 항목이 있다면 그 항목의 표시를 초기화하는 함수
            function clearClickedItem() {
                if (clickedItem !== null) {
                    if (clickedItem.classList.contains('clicked')) { // 추가된 부분
                        clickedItem.classList.remove('clicked');
                    }
                    clickedItem = null;
                }
            }
            // 검색 결과 목록에 추가된 항목들을 제거
            listEl && removeAllChildNods(listEl);
            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();
            for ( let i=0; i<places?.length; i++ ) {
                // 마커를 생성하고 지도에 표시합니다
                const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
                const marker = addMarker(placePosition, i);
                const itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해 LatLngBounds 객체에 좌표를 추가
                bounds.extend(placePosition);
    
                // 마커와 검색결과 항목에 mouseover 했을때 해당 장소에 인포윈도우 장소명 표시
                // mouseout 했을 때는 인포윈도우를 닫기
                (function(marker, title) {
                    kakao.maps.event.addListener(
                        marker, 
                        'mouseover', 
                        function() {
                        displayInfowindow(marker, title);
                        }
                    );
    
                    kakao.maps.event.addListener(
                        marker, 
                        'mouseout', 
                        function() {
                        infowindow.close();
                        }
                    );
    
                    itemEl.onmouseover =  function () {
                        displayInfowindow(marker, title);
                    };
    
                    itemEl.onmouseout =  function () {
                        infowindow.close();
                        
                    };

                    itemEl.ondblclick = function () {
                        // 라우터로 페이지 이동 시 해당 중간지점 찾아놓은 부분 뒤로 하고 해당 술집 게시판으로 이동
                        // router.push(`/alcohols/${places[i]?.id}`)
                        // 새 창으로 띄워줌
                        window.open(`/alcohols/${places[i]?.id}`, '_blank');
                    };
                    itemEl.addEventListener("click", function (e) {
                        //클릭된 항목을 표시
                        clearClickedItem();
                        clickedItem = e.currentTarget;
                        clickedItem.classList.add('clicked');
                        //  검색 후 선택한 값 중 i 번째 값 선언
                        const selected = places[i];
                        //  검색 후 선택한 값 중 i 번째 값 state에 저장
                        setCheckedPlace(selected)
                        // console.log("222checkedPlace",checkedPlace)
                        displayInfowindow(marker, title);
                        map.panTo(placePosition);
                    });
                })(marker, places[i].place_name);
    
                fragment.appendChild(itemEl);
            }
            // 검색결과 항목들을 검색결과 목록 Element에 추가
            if (listEl) {
                listEl.appendChild(fragment);
                if (menuEl !== null) { // menuEl이 null이 아닐 때 scrollTop 속성을 설정
                    menuEl.scrollTop = 0;
                }
            }
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정
            map.setBounds(bounds);
        }
        // 검색결과 항목을 Element로 반환하는 함수
        function getListItem(index, places) {
            const el = document.createElement('li');
            let itemStr =
            '<span class="markerbg marker_' + (index + 1) +'"></span>' + '<div class="info">' + "<h5>" + places.place_name + "</h5>";
                    if (places.road_address_name) {
                        itemStr +=
                            "    <span>" +
                            places.road_address_name +
                            "</span>" +
                            '   <span class="jibun gray">' +
                            `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
                            </img>` +
                            places.address_name +
                            "</span>";
                    } else {
                        itemStr += "<span>" + places.address_name + "</span>";
                    }
            
                        // itemStr +=
                        // '  <span class="tel">' + places/*.phone*/ + "</span>" + "</div>";
                
                        el.innerHTML = itemStr;
                        el.className = "item";
            
                        return el;
                    }
    
        // 마커를 생성하고 지도 위에 마커를 표시하는 함수
        function addMarker(position, idx, title) {
            const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                imgOptions =  {
                    spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                },
                markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                    marker = new kakao.maps.Marker({
                    position: position, // 마커의 위치
                    image: markerImage 
                });
    
            marker.setMap(map); // 지도 위에 마커를 표출
            markers.push(marker);  // 배열에 생성된 마커를 추가
    
            return marker;
        }
    
        // 지도 위에 표시되고 있는 마커를 모두 제거
        function removeMarker() {
            for ( let i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
            }   
            markers = [];
        }
    
        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
        // 인포윈도우에 장소명을 표시
        function displayInfowindow(marker, title) {
            const content = '<div style="padding:0 3px 0 4px;z-index:1;">' + title + '</div>';
    
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
    
        // 검색결과 목록의 자식 Element를 제거하는 함수
        function removeAllChildNods(el) {
            if (el && el.hasChildNodes()) {
                while (el.childNodes.length > 0) { // changed condition to check if there are still child nodes
                    el.removeChild(el.lastChild);
                }
            }
        }
        

        // 마커를 생성하고 지도에 표시
        function displayMarker(place) {
            let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x)
            });
            // 마커에 클릭이벤트를 등록
            kakao.maps.event.addListener(marker, 'click', function(mouseEvent) {
                props.setAddress(place);
                infowindow.setContent(`<span>${place.place_name}</span>`);
                infowindow.open(map, marker);
                const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
                map.panTo(moveLatLon);
            });
            
        }
    }
    }
    // console.log("333checkedPlace",checkedPlace)
    return (
        <WebWrapper>
            <WebWrapperHeight>
            <FlexRow style={{ justifyContent: 'space-between' }}>
            <MoveBackButtonWrapper>
            <ButtonText 
            size='xxsm'
            variant='hoverRed'
            label='<  다시 검색하기'
            style={{
                borderRadius : '2px', 
                position: 'absolute',
                width: '110px',
                bottom: '0px',
                left: '-19px',
                zIndex: '50',
                backgroundColor: "transparent",
                border: 'none',
                fontSize: '12px',
                fontWeight: '600'
                }}
            
            onClick={moveBackClickButtonHandler}/>
            </MoveBackButtonWrapper>
        <MapSection>
            {/* <H1Styled style={{textAlign: "center", width: "100%"}}>위치검색</H1Styled> */}
                        <div style={{ width: '100%', height: 'calc(100% - 80px)', display: 'flex'}}>
                            <div id='map'
                                center={{
                                    lat: midPointProp?.lat,
                                    lng: midPointProp?.lng
                                }}
                                level={3}
                                style={{
                                    width: '690px',
                                    height: '803px',
                                }}
                            />
                                    <DeparturesWrapper>
                                        {InputValuesProp?.filter(value => value !== "").map((value, index) => ( 
                                            <div key={index} style={{ display: 'flex', alignItems: 'center', zIndex: '1000'}}>
                                                <div 
                                                style={{ 
                                                    width: '40px',
                                                    height: '30px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'white',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: 'red',               //String.fromCharCode(65 + index)는 A, B, C, D와 같은 알파벳을 생성. 
                                                    margin: '3px 1px 3px 10px'  //index가 0부터 시작하기 때문에 65를 더하여 A의 아스키 코드 65부터 시작하도록 설정
                                                    }}>                     
                                                    {String.fromCharCode(65 + index)} 
                                                </div>
                                            <InputArea       //출발지 받아온 값 Map으로 돌려 그 갯수만큼 input 만들기            
                                                key={index}  //(""값도 카운트가 되는데 그 경우 filter로 제외하고 map으로 돌리기)                
                                                value={value} 
                                                type="text"
                                                variant="default"
                                                size="lg"
                                                readOnly={true}
                                                style={{
                                                    width: '100%',
                                                    margin: '3px 0 3px 10px',
                                                    padding: '2%',
                                                    border: '1px solid white',
                                                    backgroundColor: `${LightTheme.GRAY_50}`,
                                                    fontFamily: `${'var(--label1-regular)'} Pretendard sans-serif`,
                                                    fontSize: '14px',
                                                    lineHeight: '18px',
                                                    zIndex: '1000'
                                                }}
                                                />
                                            </div>
                                        ))}
                                    </DeparturesWrapper>
                            <FlexColumnCenter>
                                <TitleWrapper>
                                    <TitleStyled>중간 위치에 있는 </TitleStyled>
                                    <Highlighting>술집입니다.</Highlighting>
                                    <div style={{margin : '4px 0 5px 0'}}> 술집 카테고리를 클릭하고 리스트를 더블 클릭해보세요!</div>
                                        <CategoryWrapper>
                                            <form 
                                            id="form" 
                                            className="inputForm" 
                                            onSubmit={keywordSearchSubmitHandler}
                                            >
                                                <ButtonText
                                                    id="submit_btn" 
                                                    type="submit"
                                                    size='xxsm'
                                                    label='술집(종합)'
                                                    variant='primaryBolder'
                                                />
                                            </form>
                                            <form 
                                            id="form" 
                                            className="inputForm" 
                                            onSubmit={getCocktailPageSubmitHandler}
                                            >
                                                <ButtonText
                                                    id="submit_btn2" 
                                                    type="submit"
                                                    size='xxsm'
                                                    label='칵테일바'
                                                    variant='primaryBolder'
                                                    />
                                            </form>
                                            <form 
                                            id="form" 
                                            className="inputForm" 
                                            onSubmit={getIzakayaPageSubmitHandler}
                                            >
                                                <ButtonText
                                                    id="submit_btn3" 
                                                    type="submit"
                                                    size='xxsm'
                                                    label='일본식주점'
                                                    variant='primaryBolder'
                                                    />
                                            </form>
                                            <form 
                                            id="form" 
                                            className="inputForm" 
                                            onSubmit={getPochaPageSubmitHandler}
                                            >
                                                <ButtonText
                                                    id="submit_btn4" 
                                                    type="submit"
                                                    size='xxsm'
                                                    label='실내포장마차'
                                                    variant='primaryBolder'
                                                />
                                            </form>
                                            <form 
                                            id="form" 
                                            className="inputForm" 
                                            onSubmit={getDiningPubPageSubmitHandler}
                                            >
                                                <ButtonText
                                                    id="submit_btn5" 
                                                    type="submit"
                                                    size='xxsm'
                                                    label='요리주점'
                                                    variant='primaryBolder'
                                                />
                                            </form>
                                            <form 
                                            id="form" 
                                            className="inputForm" 
                                            onSubmit={getHofSubmitHandler}
                                            >
                                                <ButtonText
                                                    id="submit_btn6" 
                                                    type="submit"
                                                    size='xxsm'
                                                    label='호프'
                                                    variant='primaryBolder'
                                                />
                                            </form>
                                            <form 
                                            id="form" 
                                            className="inputForm" 
                                            onSubmit={getWineSubmitHandler}
                                            >
                                                <ButtonText
                                                    id="submit_btn7" 
                                                    type="submit"
                                                    size='xxsm'
                                                    label='와인바'
                                                    variant='primaryBolder'
                                                />
                                            </form>
                                            {/* <form 
                                            id="form" 
                                            className="inputForm" 
                                            onSubmit={getFishCakeSubmitHandler}
                                            >
                                                <ButtonText
                                                    id="submit_btn8" 
                                                    type="submit"
                                                    size='xxsm'
                                                    label='오뎅바'
                                                    variant='primaryBolder'
                                                />
                                            </form> */}
                                        </CategoryWrapper>
                                </TitleWrapper>
                                <div>
                                    <div id="menuDiv">
                                        <div id="menu_wrap">
                                            <div>
                                                <div id="map_title">
                                                </div>
                                            </div>
                                                <ul id="placesList"></ul>
                                                <div id="pagination"></div>
                                        </div>
                                    </div>
                                </div>
                            </FlexColumnCenter>
                        </div>
                    </MapSection>
                    {/* <input type="text" value={checkedPlace} onChange={handleCheckedPlaceChange} />
                    <MapAppointment checkedPlace={checkedPlace}/> */}
                </FlexRow>
            </WebWrapperHeight>
        </WebWrapper>
    )
    }
    
    export default MapMidPoint

    const TitleWrapper = styled.div`
    margin: 0 0 3px 20px;
    /* height: 100vh; */
    /* overflow-y: hidden; */
    `
    const TitleStyled = styled.div`
        font-size: 40px;
        font-weight: 500;
        line-height: 48px;
        font-family: var(--display2-medium) Pretendard sans-serif,
    `;
    const Highlighting = styled.div`
    //width값있어야 전체 width늘어남..
        width: 487px;
        font-size: 40px;
        font-weight: 700;
        line-height: 48px;
        font-family: var(--display2-bold) Pretendard sans-serif,
    `;
    const DeparturesWrapper = styled.div`
    position:absolute;
    display: flex;
    flex-direction: column;
    width: 20%;
    bottom: 10%;
    `
    const CategoryWrapper = styled.div`
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        margin: 1% 0 -24px 0;
        /* overflow-x: scroll; */
        overflow-x: auto;
        white-space: nowrap;
        flex-direction: row;
    /* ::-webkit-scrollbar {
        width: 2px;
        height: 1px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }
    ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.1);
    } */
    `;
    const MoveBackButtonWrapper = styled.div`
    position: absolute;
    z-index: 100;
    `
    const MapSection = styled.div`
    #map {
        /* width: 920px;
        height: 600px;
        position: absolute; */
        overflow: hidden;
        border-radius: 8px;
        z-index: "3";
        width: '50%',
        height: '100%',
        position: "relative"
    }
    #menuDiv {
        display: flex;
        position: relative;
        height: 63vh;
        z-index: 2;
        font-size: 4px;
        top: 3%
    }
    
    #menu_wrap {
        position: relative;
        /* width: 570px; */
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow-y: auto;
        /* background-color: green; */
    }
    
    /* #map_title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    } */
    
    #form {
        display: flex;
        justify-content: space-between;
        padding: 0px 15px 10px 0;
    }
    
    #keyword {
        width: 100%;
        border: none;
        outline: none;
    }
    
    #submit_btn {
        /* background-color: #F4F5F6;
        color: #7e7979;
        border: none;
        border-radius:10px;
        outline: none; */
    }
    
    #placesList h5 {
        color: black;
        font-size: 7px;
        font-weight: 800;
        line-height: 1px;
    }
    
    #placesList li {
        border : 1px solid ${LightTheme.GRAY_100};
        border-radius: 12px
    }
    #placesList .item {
        /* border-bottom: 1px solid #888; */
        overflow: hidden;
        cursor: pointer;
        margin-bottom: 5px
    }
    
    #placesList .item .info {
        padding: 3px 0 5px 3px;
    }
    
    #placesList .item span {
        display: block;
        margin-top: 1px;
    }
    #placesList .info .gray {
        color: #9EA4AA;
    }
    
    #placesList .info .tel {
        /* color: #009900; */
    }
    
    #placesList .clicked{
        /* background-color: rgba(100, 200, 100, 0.5);
        border: 1px solid rgba(100, 200, 100, 0.8); */
        border: 1px solid #3DC060; /* 연하게 테두리(border) 스타일 */
        position: relative; /* ::after 선택자를 위해 position 속성을 추가합니다. */
        border-radius: 12px
    }
    
    #placesList .clicked ::after{
        content: "V"; /* ::after 선택자를 이용하여 V표를 추가합니다. */
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        color: #3DC060;
        font-weight: bold;
    }
    
    #btnDiv {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    #pagination {
        margin: 10px auto;
        text-align: center;
    }
    #pagination a {
        display: inline-block;
        margin-right: 10px;
        color: #7b7b7b;
    }
    #pagination .on {
        font-weight: bold;
        cursor: default;
        color: #ff6e30;
    }
    #btnOn {
        height: 600px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    #searchBtn {
        width: 20px;
        padding: 0px;
        height: 70px;
        background-color: #ffa230;
        border: none;
        outline: none;
    }
    `;





        //  중간지점 마커 시도.
        // function MidPointMarkerSet() {  
        //     MidPointMarker()
        //     displayMidPointMarker()
        //     function MidPointMarker(midPointProp) {
        //         const imageMidPointSrc = 'MaannajanLogo.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        //         imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        //         imgOptions =  {
        //             spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        //             spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        //             offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        //         },
        //         markerImage = new kakao.maps.MarkerImage(imageMidPointSrc, imageSize, imgOptions),
        //         MidPointMarker = new kakao.maps.Marker({
        //             position: midPointProp, // 마커의 위치
        //             image: markerImage 
        //         });
        //         MidPointMarker.setMap(map); // 지도 위에 마커를 표출
        //     // markers.push(marker);  // 배열에 생성된 마커를 추가
        //     return MidPointMarker;
        //     }
        //     function displayMidPointMarker(midPointProp) {
        //         let marker = new kakao.maps.Marker({
        //         map: map,
        //         position: new kakao.maps.LatLng(midPointProp.lat, place.lng)
        //         });
        // }}
        // kakao Pagination API중 gotoPage 함수(시도 실패) 
        // function gotoPage(page) {
        //     const pageSize = 15; // 페이지당 표시할 장소 수
        //     const pageCenter = (page - 1) * pageSize + pageSize / 2; // 페이지 중심 장소 인덱스
        //     const center = new kakao.maps.LatLng(kakaoApi[pageCenter]?.y, kakaoApi[pageCenter]?.x); // 페이지 중심 좌표
        //     map.setCenter(center); // 지도의 중심 좌표를 페이지 중심 좌표로 설정
        //     refetch({
        //         url: `/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=술집&radius=1500&page=${page}&size=15&sort=distance`
        //     });
        // }


            // 검색결과 목록 하단에 페이지 번호 표시
        // function displayPagination(pagination) {
        //     const paginationEl = document.getElementById('pagination');
        //     const fragment = document.createDocumentFragment();
        //     // 기존에 추가된 페이지 번호 삭제
        //     while (paginationEl?.hasChildNodes()) {
        //         paginationEl.lastChild &&
        //         paginationEl.removeChild(paginationEl.lastChild)
        //     }
    
        //     const totalPage = Math.ceil(data?.data?.meta?.pageable_count / 3); // 전체 페이지 수
        //     const currentPage = pagination.currentPage; // 현재 페이지

        //     for (let i = 1; i <= totalPage; i++) {
        //         const el = document.createElement('a')
        //         el.href = '#'
        //         el.innerHTML = i
        //         if (i === currentPage) {
        //         el.className = 'on';
        //         } else {
        //         el.onclick = (function (i) {
        //             return function () {
        //                 refetch({
        //                     url: `/kakaoApi?y=${midPointProp?.lat}&x=%20${midPointProp?.lng}&query=술집&radius=1500&page=${i}&size=15&sort=distance`
        //                 });
        //                 pagination.currentPage = i;
        //                 displayPagination(pagination);
        //             }
        //         })(i)
        //         }
    
        //         fragment.appendChild(el)
        //     }
        //     // paginationEl이 null이 아닐 때 appendChild 메소드를 호출
        //     if (paginationEl !== null) { 
        //         paginationEl.appendChild(fragment);
        //     }
        // }