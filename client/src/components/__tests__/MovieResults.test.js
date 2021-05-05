import { render } from '@testing-library/react'
import MovieResults from '../MovieResults'

describe('MovieResults basic functionality', () => {

  it('Shows "No results for" message when given invalid input', () => {
    const result = render(<MovieResults 
      movieList={[]} 
      query={"asdf"} 
      currentNominations={[]}
    />)
    const element = result.queryByText(/No results for/i)

    expect(element).toBeInTheDocument()
  })

  it('Shows a list of buttons when given a list of movies', () => {
    const listOfMovies = [
      {
        "Title": "Rambo", 
        "Year": 1991
      },
      {
        "Title": "Greese",
        "Year": 1985
      }, 
      {
        "Title": "Lion King",
        "Year": 1995
      }, 
      {
        "Title": "Finding Nemo",
        "Year": 2002
      }
    ];

    const { queryByText, queryAllByTestId } = render(<MovieResults 
      movieList={listOfMovies} 
      currentNominations={[]}
    />)

    const heading = queryByText(/Results for/i)
    expect(heading).toBeInTheDocument()

    const nominateBtns = queryAllByTestId("nominateBtn")

    expect(nominateBtns.length).toBe(4);

  })
  
})