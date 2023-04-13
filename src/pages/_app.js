import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { SeoLayout } from '@components/Atoms/SEO/SeoLayout';
import { GlobalStyles } from '@styles/GlobalStyle';
const queryClient = new QueryClient();

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
