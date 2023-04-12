const PasswordAlert = () => {
  return (
    <div style={{ color: 'red', fontSize: '12px' }}>
      알파벳은 소문자, 대문자 혼합 사용해야 하며,
      <br /> 숫자, 알파벳, 특수문자는 하나 이상씩 사용해야 하며,
      <br /> 최소 8글자 최대 20글자로 구성되어야 합니다.
    </div>
  );
};

export default PasswordAlert;
