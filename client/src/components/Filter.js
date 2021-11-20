export default function Filter(props) {
  const { categories, companies } = props;
  console.log(categories);
  console.log(companies);

  const parsedCompanies = companies.length > 0 ? companies.map((company, i, arr) => {
    return <ul key={i}>
            <li>{company.name}</li>
          </ul>;
  }) : <p>Fetching companies...</p>;

  const parsedCategories = categories.length > 0 ? categories.map((category, i, arr) => {
    return <ul key={i}>
            <li>{category.name}</li>
          </ul>;
  }) : <p>Fetching categories...</p>;

  return (
    <div>
      <h5>The update applies to these companies:</h5>
      <input type="checkbox" id="allCompanies" name="allCompanies" value="all companies"/><br/> 
      <label htmlFor="allCompanies">All</label>
      {parsedCompanies}
      <h5>The update applies to these project categories:</h5>
      <input type="checkbox" id="allCategories" name="allCategories" value="all categories"/><br/> 
      <label htmlFor="allCategories">All</label>
      {parsedCategories}
    </div>
  )
};