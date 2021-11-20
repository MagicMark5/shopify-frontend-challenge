import './App.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginHandler from './components/LoginHandler';
import ControlPanel from './components/ControlPanel';
import { getLocalStorage } from './helpers/getLocalStorage';

function App() {
  // Grab user and login data from local storage if present
  const {
    prevClient,
    prevUser,
    prevLogin,
    prevProjects,
    prevCategories,
    prevCompanies,
  } = getLocalStorage([
    'prevClient',
    'prevUser',
    'prevLogin',
    'prevProjects',
    'prevCategories',
    'prevCompanies',
  ]);

  const params = useLocation().search;
  const navigate = useNavigate();
  const code = new URLSearchParams(params).get('code');
  
  const [client, setClient] = useState(prevClient);
  const [login, setLogin] = useState(prevLogin || '');
  const [user, setUser] = useState(prevUser || '');
  const [projects, setProjects] = useState(prevProjects || []);
  const [categories, setCategories] = useState(prevCategories || '');
  const [companies, setCompanies] = useState(prevCompanies || '');
  const [taskUpdate, setTaskUpdate] = useState('');
  
  const handleLogOut = () => {
    setUser({});
    setLogin({});
    setProjects([]);
    setCategories({});
    localStorage.clear();
    navigate('code', { replace: true })
  }; 

  useEffect(() => {

    if (!client) {
      axios.get(`/login`)
        .then((res) => {
          let { data } = res;
          let clientString = JSON.stringify(data);
          localStorage.setItem('prevClient', clientString);
          setClient(data);
        })
        .catch((error) => {
          console.log(`/login route returned ${error}`)
        })
    }

    if (!login && code) {
      axios.get(`/login/${code}`)
        .then((res) => {
          let { data } = res;
          let { user } = data;
          let loginData = {
            access_token: data.access_token,
            apiEndPoint: data.installation.apiEndPoint,
            companyName: data.installation.company.name,
            companyLogoURL: data.installation.logo,
          };
          let userData = {
            firstName: user.firstName,
            lastName: user.lastName, 
            email: user.email, 
            avatar: user.avatar,
          };
          let loginString = JSON.stringify(loginData);
          let userString = JSON.stringify(user);
          localStorage.setItem('prevLogin', loginString);
          localStorage.setItem('prevUser', userString);
          setLogin(loginData);
          setUser(userData);
          
          let token = data.access_token
          // Get TW data using access_token
          Promise.all([
            axios.get(`/projects/${token}`), 
            axios.get(`/categories/${token}`),
            axios.get(`/companies/${token}`)
          ])
            .then(([projects, categories, companies]) => {
              // set projects
              let projectsString = JSON.stringify(projects.data);
              localStorage.setItem('prevProjects', projectsString);
              setProjects(projects.data);
              // set categories
              let categoriesString = JSON.stringify(categories.data);
              localStorage.setItem('prevCategories', categoriesString);
              setCategories(categories.data);
              // set companies
              let companiesString = JSON.stringify(companies.data);
              localStorage.setItem('prevCompanies', companiesString);
              setCompanies(companies.data);
            })
            .catch((err) => {
              console.log(`API request for Projects + Categories returned: ${err}`)
            }); 
        })
        .catch((error) => {
          console.log(`Server login request returned ${error}`)
        })
    }
  }, [client, login, code]);
  
  return (
    <div className="App">    
      { !login.access_token && client && 
          <LoginHandler 
            redirectURI={client.redirectURI} 
            clientID={client.clientID} 
          /> }
      { login.access_token && 
          <ControlPanel 
            login={login} 
            user={user}
            projects={projects}
            categories={categories}
            companies={companies}
            handleLogOut={handleLogOut}
            handleTaskUpdate={setTaskUpdate}
          /> }
    </div>
  );
}

export default App;
