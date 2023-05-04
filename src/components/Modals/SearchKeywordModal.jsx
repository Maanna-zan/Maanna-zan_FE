import { InputArea } from "@components/Atoms/Input";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Map } from "react-kakao-maps-sdk";
import { LightTheme } from "@components/Themes/theme";
import { ButtonText } from "@components/Atoms/Button";

export default function KeywordSearchModal({ onClose, onUpdate}) {
        //  키워드 검색 값 state
        const [inputText, setInputText] = useState('')
        //  클릭 선택된 장소를 저장할 state 변수
        const [checkedPlace, setCheckedPlace] = useState('')
        //  키워드 검색 값 Handler
        const inputTextHandler = (e) => {
            setInputText(e.target.value)
        }
        //  모달창 닫기 버튼
        const closeModalClickHandler = () => {
            onClose();
        }
        //  선택된 장소 값 저장 및 부모 컴포넌트 배달 Handler & 모달창 닫기
        //  조건 추가. 장소 선택 없이 확인 버튼 누르면 인풋보더에 빨간색 및 포커싱.
        const saveStateHandler = () => {
            if (!checkedPlace) {
                const inputBox = document.getElementById('keyword');
                inputBox.style.border = "1px solid red";
                inputBox.focus();
                inputBox.addEventListener("input", () => {
                    if (inputBox.value.length > 0) {
                    inputBox.style.border = "1px solid black";
                    }
                    });
                return;
            }
            // if (!checkedPlace) {
            //     alert("장소를 선택하고 확인 버튼을 눌러주세요.");
            //     return;
            // }
            //  부모 컴포넌트로 선택된 장소 값 전달 props
            onUpdate(checkedPlace);
            //  모달 창 닫기 props
            onClose();
        }
        //  키워드 검색 Submit Handler
        const keywordSearchSubmitHandler = (e) => {
            e.preventDefault();
            // 검색어를 입력하고 검색 버튼을 클릭했을 때 실행되는 함수. 검색어를 상태 값으로 설정
            KeywordSearchFeat()
        };
        // 모달창 열면 바로 지도 불러오기(검색버튼 2번 누르는 거 버그 해결.)(<Map>태그 없애고 <div>태그로 지도 겹치는 버그 해결)
        useEffect(() => {
            KeywordSearchFeat()
        },[])

    //  키워드 검색 로직
    const KeywordSearchFeat=() => {
        const { kakao } = window;
        const map = new kakao.maps.Map(document.getElementById('myMap'), 
        {
            center: new kakao.maps.LatLng(37.56682420267543, 126.978652258823),
            level: 4
        });
        const ps = new kakao.maps.services.Places();
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        // 마커를 담을 배열입니다
        let markers = [];
    
        const searchForm = document.getElementById('submit_btn');
        if (searchForm) {
            searchForm.addEventListener('click', function (e) {
            e.preventDefault();
            searchPlaces();
            });
        }
        
        function searchPlaces() 
        {
            const keyword = document.getElementById("keyword").value;
        //     if (!keyword?.replace(/^\s+|\s+$/g, "")) {
        //         alert("키워드를 입력해주세요!");
        //         return;
        // }
        // 장소검색 객체를 통해 키워드로 장소검색을 요청
        ps.keywordSearch(keyword, placesSearchCB);
        }
        
        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                // 검색 목록과 마커를 표출합니다
                displayPlaces(data);
                // 페이지 목록 보여주는 displayPagination() 추가
                displayPagination(pagination);
                // setPlaces(data)
            const bounds = new kakao.maps.LatLngBounds();
            for (let i = 0; i < data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            map.setBounds(bounds)
    
            // 정상적으로 검색이 완료됐으면
            }   else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                alert('검색 결과가 존재하지 않습니다.');
                // return;
            } else if (status === kakao.maps.services.Status.ERROR) {
                alert('검색 결과 중 오류가 발생했습니다.');
                // return;
            }
        }
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
            for ( let i=0; i<places.length; i++ ) {
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
                    itemEl.addEventListener("click", function (e) {
                        //클릭된 항목을 표시
                        clearClickedItem();
                        clickedItem = e.currentTarget;
                        clickedItem.classList.add('clicked');
                        //  검색 후 선택한 값 중 i 번째 값 선언
                        const selected = places[i];
                        //  검색 후 선택한 값 중 i 번째 값 state에 저장
                        setCheckedPlace(selected)

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
            const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
    
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
        
        // 검색결과 목록 하단에 페이지 번호 표시
        function displayPagination(pagination) {
            const paginationEl = document.getElementById('pagination');
            const fragment = document.createDocumentFragment();
            // 기존에 추가된 페이지 번호 삭제
            while (paginationEl?.hasChildNodes()) {
                paginationEl.lastChild &&
                paginationEl.removeChild(paginationEl.lastChild)
            }
    
            for (let i = 1; i <= pagination.last; i++) {
                const el = document.createElement('a')
                el.href = '#'
                el.innerHTML = i
    
                if (i === pagination.current) {
                el.className = 'on';
                } else {
                el.onclick = (function (i) {
                    return function () {
                    pagination.gotoPage(i)
                    }
                })(i)
                }
    
                fragment.appendChild(el)
            }
            // paginationEl이 null이 아닐 때 appendChild 메소드를 호출
            if (paginationEl !== null) { 
                paginationEl.appendChild(fragment);
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
    return (
        <>
        <ModalDiv className="modal" onClick={onClose}></ModalDiv>
        <Modal className="modal-overlay">

        <MapSection>
            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",margin: '-13px 0 10px 0' }}>
                <H1Styled>위치검색</H1Styled>
                    <button style={{ backgroundColor: "transparent", border: "none", outline: "none", margin: '0 3% 4% 0', position: "relative" }}>
                        {/* 이모티콘 이미지 추가 */}
                        <img src="Group 1972.png" alt="닫기" onClick={closeModalClickHandler} style={{ position: "absolute", right: 0 }} />
                    </button>
            </div>

            <form id="form" className="inputForm" onSubmit={keywordSearchSubmitHandler}>
                <InputWrapper style={{ width: "100%", position: "relative" }}>
                    <label style={{width : "90%"}}>
                        {inputText.length === 0 && (
                        <span style={{ color: "red", fontSize: "12px", position: "absolute", top: "-50%"}}>출발할 위치를 입력해 주세요.</span>
                        )}
                    <input 
                        id="keyword"
                        type="text" 
                        placeholder="위치를 입력해주세요."
                        onChange={inputTextHandler} 
                        value={inputText}
                    />
                        <button type="submit" id="submit_btn">
                            <img src="ModalPortalSearchBarIcon.png" alt="검색" />
                        </button>
                    </label>
                </InputWrapper>
            </form>

            <div style={{ width: '100%', height: 'calc(100% - 80px)', display: 'flex' }}>
                
                    <div id='myMap'>
                    </div>
                    <div style={{width: '50%'}}>
                        
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
                
            </div>
        </MapSection>

        <div>
            <div className='labelDiv'
            style={{
                position: "absolute",
                bottom: "12px",
                left: "3px", 
                color: "#9EA4AA",
                fontSize: "13px",
                padding: "6px 20px 6px 20px",
                zIndex: '1000'
            }}
            >정확한 검색 결과를 위해 정확하게 입력해주세요.
            </div>
                <ButtonText
                label='확인'
                size="xxsm"
                variant="primary"
                    style={{
                        position: "absolute",
                        bottom: "12px",
                        right: "28px", 
                        fontSize: "13px",
                        padding: "6px 20px 6px 20px",
                        zIndex: '1000'
                    }}
                    onClick={saveStateHandler}/>
            </div>

        </Modal>
        </>
    )
}
const H1Styled = styled.h1`
    font-size: 15px;
    font-weight: 700;
    margin-left: 45%;
`
const Modal = styled.div`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 20px 40px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255);
        z-index: 1000;
        width: 80%;
        max-width: 620px;
        height: 80vh;
        max-height: 704px;
        border: 1px solid #c2ccd6;
    .labelDiv {
        position: absolute;
        bottom: 16px;
        left: 3px;
        padding: 6px 20px 6px 20px;
        z-index: 1000;
        color: ${LightTheme.FONT_SECONDARY};
        font: var(--caption2-regular) Pretendard sans-serif;
    }
`
const ModalDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: transparent;
    z-index: 999;


`;
const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;
const MapSection = styled.div`
    #myMap {
        width: 50%;
        height: 50%,
        max-width: 270px;
        max-height: 486px;
        position: relative,
        overflow: hidden;
        border-radius: 8px;
        z-index: 3;
    }
    #menuDiv {
        display: flex;
        position: relative;
        z-index: 2;
        font-size: 4px;
        /* background-color: green; */
        //지도랑 붙이고 z-index로 가림
        overflow: hidden;
        right: 10px
    }

    #menu_wrap {
        position: relative;
        width: 570px;
        height: 52vh;
        max-width: 570px;
        max-height: 52vh;
        border-radius: 5px;
        overflow-y: auto;
    ::-webkit-scrollbar {
        width: 4px;
        height: 1px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }
    ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.1);
    }
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
    height: 34px;
    padding: 0 40px 0 16px;
    border: 1px solid ${LightTheme.GRAY_400};
    border-radius: 12px;
    color: ${LightTheme.GRAY_600};
    background-color: ${LightTheme.WHITE};
    &:active {
        border-color: ${LightTheme.GRAY_900};
    }
    ::placeholder {
        color: ${LightTheme.GRAY_400};
    }
    &:focus {
        outline: none;
        box-shadow: none;
        border-color: ${LightTheme.GRAY_900};
    }
    }
    #submit_btn {
    position: absolute;
    top: 19%;
    right: 1%;
    border: none;
    background: none;
    cursor: pointer;
    img {
        width: 18px;
        height: 18px;
    }
}

    #placesList h5 {
        color: black;
        font-size: 7px;
        font-weight: 800;
        line-height: 1px;
    }

    #placesList li {
        /* list-style: square; */
        border : 1px solid ${LightTheme.GRAY_100};
        border-radius: 12px
    }
    #placesList .item {
        /* border-bottom: 0 solid #888; */
        overflow: hidden;
        cursor: pointer;
        margin-bottom: 5px;
        padding-right: 3px;
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