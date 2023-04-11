export default function Modal({ onClose }) {
  return (
    <div
      className="modal"
      style={{
        width: '500px',
        height: '500px',
        borderRadius: '20px',
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 240, 240, 0.529)',
        //쌓이는 요소의 우선순위 -> zindex
        zIndex: '1000',
      }}
    >
      <div>
        I'm a modal dialog
        <input />
        <input />
        <button>+</button>
      </div>
      <button style={{ cursor: 'pointer' }} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
