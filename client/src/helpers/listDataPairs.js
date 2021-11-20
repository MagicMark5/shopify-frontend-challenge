function listDataPairs(data) {
  return Object.keys(data).map((key, i) => {
    return <li key={i} >{key}: {data[key]}</li>;
  })
}

export { listDataPairs }