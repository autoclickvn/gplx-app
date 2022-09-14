import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Suspense } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import AppRoute from 'routes/route';

// Extend dayjs plugin
dayjs.extend(customParseFormat);

// Config react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    // <StrictMode>
    <Suspense fallback={<Text>Loading screen...</Text>}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <AppRoute />
          </SafeAreaProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </Suspense>
    // </StrictMode>
  );
};

export default App
