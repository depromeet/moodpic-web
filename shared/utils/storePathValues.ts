const storePathValues = () => {
  const storage = globalThis?.sessionStorage;
  if (!storage) return;

  const prevPath = storage.getItem('currentPath');
  storage.setItem('prevPath', prevPath as string);
  storage.setItem('currentPath', globalThis.location.pathname);
};

const getPrevPath = () => {
  const storage = globalThis?.sessionStorage;

  return storage ? storage.getItem('prevPath') : '';
};

export { storePathValues, getPrevPath };
