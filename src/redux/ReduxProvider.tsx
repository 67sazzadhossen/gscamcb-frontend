'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { persistStore, type PersistorOptions } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { setupListeners } from '@reduxjs/toolkit/query';
import { makeStore } from './store';
export default function ReduxProvider({ children }: { children: ReactNode }) {
  const [{ store, persistor }] = useState(() => {
    const store = makeStore();
    // Redux Persist supports this option but omits it from its published types.
    const options: PersistorOptions & { manualPersist: boolean } = {
      manualPersist: true,
    };
    return { store, persistor: persistStore(store, options) };
  });
  useEffect(() => {
    persistor.persist();
    return setupListeners(store.dispatch);
  }, [store, persistor]);
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={
          <div role="status" className="p-6 text-slate-600">
            Loading GSCAMCB…
          </div>
        }
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
