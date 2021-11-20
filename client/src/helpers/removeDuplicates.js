export default function removeDuplicates(array) {
  // Removes occassional duplicates given by omdbID 
  // prevents bugs/errors/warnings with React <li> and fragment unique keys
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