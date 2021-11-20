function getLocalStorage(storedItems) {
  const storageArray = storedItems.map((item) => {
    let storedString = localStorage.getItem(item) || undefined;
    let storedObject = storedString !== undefined ? JSON.parse(storedString) : undefined;
    return storedObject;
  })
  let storageObject = {};
  storageArray.forEach((item, i) => storageObject[storedItems[i]] = item);
  return storageObject;
}

export { getLocalStorage }