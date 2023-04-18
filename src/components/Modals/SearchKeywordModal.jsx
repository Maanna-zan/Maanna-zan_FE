import { InputArea } from "@components/Atoms/Input";
import { Map } from "react-kakao-maps-sdk";
import styled from "styled-components";

export default function SearchKeywordModal({ onClose }) {

    return (
        <ModalDiv className="modal">
        <div className="modal-overlay">
            <h1 style={{textAlign: "center", width: "100%"}}>위치검색</h1>
            <InputWrapper style={{ width: "100%" }}>
                <InputArea type="text" placeholder="검색어를 입력하세요" />
                <button>검색</button>
            </InputWrapper>
            <div style={{ width: '100%', height: 'calc(100% - 80px)', display: 'flex' }}>
                <Map 
                    center={{
                        lat: 37.56682420267543,
                        lng: 126.978652258823
                    }}
                    level={4}
                    style={{
                        width: '50%',
                        height: '100%',
                        position: "relative"
                    }}
                />
                <div style={{width: '50%'}}>
                    <div>검색결과가 들어갈 곳</div>
                </div>
            </div>
            <button
                style={{
                    cursor: 'pointer',
                    color: 'white',
                    backgroundColor: '#FF4740',
                    border: 'none',
                    borderRadius: '8px',
                    position: "absolute",
                    bottom: "20px",
                    right: "20px" 
                }}
                onClick={onClose}
            >
                확인
            </button>
        </div>
        </ModalDiv>
    )
}
const ModalDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 999;

    .modal-overlay {
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
        height: 80%;
        max-height: 620px;
        border: 1px solid #c2ccd6;
    }
`;
const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    input {
        width: 90%;
        height: 40px;
        padding: 0 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
        color: #333;
    }

    button {
        width: 40px;
        height: 40px;
        margin-left: 10px;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        color: #fff;
        background-color: #FF4740;
        cursor: pointer;
    }
`;