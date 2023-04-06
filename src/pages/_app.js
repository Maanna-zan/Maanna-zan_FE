import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { lightTheme } from '@components/theme/lightTheme';
import { ThemeProvider } from 'styled-components';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    // <ThemeProvider theme={{ lightTheme }}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
    // </ThemeProvider>
  );
}
