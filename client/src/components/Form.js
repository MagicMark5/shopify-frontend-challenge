import { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';

export default function Form(props) {
  const [taskContent, setTaskContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault()
    // pass query string to App
    props.handleTaskUpdate(taskContent.trim())
  }

  const handleChange = event => {
    const value = event.target.value;
    setTaskContent(value);
  }

  return (
    <div>
      {/* <div className={classes.searchIcon}>
        <SearchIcon />
      </div> */}
      
      {/* onBlur callback for submit ensures mobile users have their form submitted when pressing "Done" on mobile keyboard */}
      <form onSubmit={handleSubmit} onBlur={handleSubmit} autoComplete="off">
        <InputBase
          autoFocus={true}
          name="taskContent"
          value={taskContent}
          onChange={handleChange}
          placeholder="Compose a task..."
          inputProps={{ 
            'aria-label': 'search', 
            'data-testid': 'search'
          }}
        />
      </form>
    </div>
  )
}