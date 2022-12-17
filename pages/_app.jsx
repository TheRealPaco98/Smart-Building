import "../styles/globals.css";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { SessionProvider } from "next-auth/react";

import "regenerator-runtime/runtime";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const supportedChainIds = [1, 1337];

  const connectors = {
    injected: {},
  };

  return (
    <SessionProvider session={session}>
      <ThirdwebWeb3Provider
        supportedChainIds={supportedChainIds}
        connectors={connectors}
      >
        <Component {...pageProps} />
      </ThirdwebWeb3Provider>
    </SessionProvider>
  );
}

export default MyApp;
