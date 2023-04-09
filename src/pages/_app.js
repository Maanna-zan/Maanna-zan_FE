import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { SeoLayout } from '@components/Atoms/SEO/SeoLayout';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SeoLayout>
        <Component {...pageProps} />
      </SeoLayout>
    </QueryClientProvider>
  );
}
