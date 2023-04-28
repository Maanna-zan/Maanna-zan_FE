import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SeoLayout } from '@components/Atoms/SEO/SeoLayout';
import { GlobalStyles } from '@styles/GlobalStyle';
import { global } from 'styled-jsx/css';
import { apis } from '@shared/axios';

const queryClient = new QueryClient();

apis.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  const error = err.response;
  if (error.status === 401) {
    // 인증 오류 처리 등, 상황에 따라 다른 처리를 수행할 수 있습니다.
    console.log('Error 401 Unauthorized');
  } else if (error.status === 400) {
    console.log('Error 400 Bad Request');
  }
  // 예외 사항이 없으면 에러를 그대로 반환합니다.
  return Promise.reject(err);
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SeoLayout>
        <GlobalStyles />
        <Component {...pageProps} />
      </SeoLayout>
    </QueryClientProvider>
  );
}
