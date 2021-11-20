export default function ProjectList(props) {
  const { projects } = props;
  console.log(projects);
  const parsedProjects = projects.length > 0 ? projects.map((project, i, arr) => {
    return <tr key={i}>
      <td>{project.id}</td>
      <td>{project.name}</td>
    </tr>;
  }) : <tr><td>Fetching projects...</td></tr>

  return (
    <tbody>
      {parsedProjects}
    </tbody>
  )
};