import styled from "styled-components";

export default function SearchKeywordModal({ onClose }) {

    return (
        <ModalDiv className="modal">
        <div className="modal-overlay">
        <button
            style={{
                cursor: 'pointer',
                backgroundColor: 'White',
            }}
            onClick={onClose}
        >
                닫기
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
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    padding: 20px 40px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255);
    z-index: 1000;
    width: 620px;
    height:620px;
    width: 50%;
    border: 1px solid #c2ccd6;
    }
`;