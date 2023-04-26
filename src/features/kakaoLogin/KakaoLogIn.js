const CLIENT_ID = '4fcd58a92a3fa19b2331cfeea915ed06';
const REDIRECT_URI = 'http://localhost:3000/OAuth/Kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
