// import './side-effects';

// import $ from 'jquery';
// import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { ClientApp } from '@wsh-2024/app/src/index';

import { preloadImages } from './utils/preloadImages';
import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  await registerServiceWorker();
  await preloadImages(); // TODO 必要かも
 const ReactDOM = await import("react-dom/client")
  const root = document.getElementById("root")
    ReactDOM.hydrateRoot(root!,
      // $('#root').get(0)!,
      <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
        <BrowserRouter>
          <ClientApp />
        </BrowserRouter>
      </SWRConfig>,
    );

  // if (document.readyState === "complete") {
  //   const root = document.getElementById("root")
  //   ReactDOM.hydrateRoot(root!,
  //     // $('#root').get(0)!,
  //     <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
  //       <BrowserRouter>
  //         <ClientApp />
  //       </BrowserRouter>
  //     </SWRConfig>,
  //   );
  // }

  // $(document).ready(() => {
  //   ReactDOM.hydrateRoot(
  //     $('#root').get(0)!,
  //     <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
  //       <BrowserRouter>
  //         <ClientApp />
  //       </BrowserRouter>
  //     </SWRConfig>,
  //   );
  // });
};

main().catch(console.error);
