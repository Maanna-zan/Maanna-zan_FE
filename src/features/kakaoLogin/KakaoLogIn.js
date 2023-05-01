const CLIENT_ID = 'cddd7225860e85f1583005ae2e564fc5';
const REDIRECT_URI = 'http://localhost:3000/OAuth/Kakao';
//const REDIRECT_URI = 'http://localhost:3000/oauth';
/////
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
