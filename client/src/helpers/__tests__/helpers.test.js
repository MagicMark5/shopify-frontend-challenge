import { render } from '@testing-library/react'
import parseListItems from '../parseListItems'
import removeDuplicates from '../removeDuplicates';
import exampleResponse from '../exampleResponse';

describe('removeDuplicates basic tests', () => {

  it('returns the same contents of array if no duplicates', () => {
    
    const names = ["bob", "steve", "mary", "vince"];
    const result = removeDuplicates(names);

    expect(result.length).toBe(4);
    
    result.forEach((name, i) => expect(name).toEqual(names[i]))

  });

  it('returns an array of unique items if array has duplicates', () => {
    
    const names = ["bob", "bob", "mary", "vince"];
    const result = removeDuplicates(names);
    const expectedNames = ["bob", "mary", "vince"];

    expect(result.length).toBe(3);
    
    result.forEach((name, i) => expect(name).toEqual(expectedNames[i]))
  });

});

describe('parseListItems basic tests', () => {

  it('parses list items given an array of movie data', () => {
    let result;
    const starWarsArray = exampleResponse();
    const clickHandler = () => console.log("click handled");

    const parsedMovies = starWarsArray.map(starWarsMovie => parseListItems(starWarsMovie, clickHandler, false))
    
    parsedMovies.forEach((movie, index) => {
      result = render(movie);
    });

    const { queryAllByText } = result; 
    const titles = queryAllByText(/Episode/i);

    // there are 9 star wars episodes
    expect(titles.length).toBe(9);
    titles.forEach(title => expect(title).toBeInTheDocument())
  });

})