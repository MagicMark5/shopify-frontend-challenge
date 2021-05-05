export default function removeDuplicates(array) {
  const uniqueStrings = [];
  const uniqueResults = [];
  
  array.forEach((item) => {

    const itemString = JSON.stringify(item);

    if (!uniqueStrings.includes(itemString)) {
      uniqueStrings.push(itemString)
      uniqueResults.push(item);
    }

  })

  return uniqueResults;
};