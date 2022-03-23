import { ChakraProvider } from '@chakra-ui/react';
import { Queries, RenderOptions, queries, render as testingLibraryRender } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '../store/store';

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: false,
            },
          },
        })
      }
    >
      <ChakraProvider>
        <Provider store={store}>{children}</Provider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

const customRender = <Q extends Queries = typeof queries, Container extends Element | DocumentFragment = HTMLElement>(
  ui: ReactElement,
  options: RenderOptions<Q, Container> = {},
) => testingLibraryRender(ui, { wrapper: Providers, ...options });

// re-export everything
// eslint-disable-next-line import/export
export * from '@testing-library/react';

// override render method
// eslint-disable-next-line import/export
export { customRender as render };
