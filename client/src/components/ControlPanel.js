import ProjectList from './ProjectList';
import Filter from './Filter';
import Form from './Form';

export default function ControlPanel(props) {
  const {
    user, 
    login, 
    projects, 
    categories, 
    companies, 
    handleLogOut, 
    handleTaskUpdate 
  } = props;

  return (
    <div>

      <nav className="controlNav">
        <ul>
          <li>
            <img 
              src={login.companyLogoURL}
              className="Company-logo"
              alt="logo"
            />
          </li>
          <li>
            <h4 className="Company-name">{login.companyName}<br/><br/> Project Task Editor</h4>
          </li>
          <li>
            <div className="userInfo">
              <img className="user-avatar" src={user.avatar} alt="avatar" />
              <p>{user.firstName + ' ' + user.lastName}</p>
              <button onClick={handleLogOut}>Log Out</button>
            </div>
          </li>
        </ul>
      </nav>

      {/* FILTERS - USER INPUTS UPDATED TASK (IF TASK DOES NOT EXIST - CREATE A NEW TASK) */}
      <article className="App-header update">
        <Form handleTaskUpdate={handleTaskUpdate} />
      </article>

      {/* FILTERS - USER SELECTS WHICH CATEGORIES / COMPANIES TO APPLY UPDATE */}
      <article className="App-header filter">
        <Filter categories={categories} companies={companies} />
      </article>

      {/* SELECTED PROJECT LIST */}
      <article className="App-header selected">
        <table> 
          <thead>
            <tr>
              <td>{ projects.length > 0 ? "Project ID" : ""}</td>
              <td>{ projects.length > 0 ? "Project Name" : ""}</td>
              <td>{ projects.length > 0 ? `${projects.length} Results` : ""}</td>
            </tr>
          </thead>
          <ProjectList projects={projects} />
        </table>
      </article>

    </div>
  )
};