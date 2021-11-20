import '@teamwork/login-button';

export default function LoginHandler(props) {
  const {redirectURI, clientID} = props;  

  return (
    <>
      <header className="App-header">
        <teamwork-login-button
          redirectURI={redirectURI}
          clientID={clientID}
          icon="false"
          color="slate"
          size="large"
          borders="default"
        />
      </header>
    </>
  )
};