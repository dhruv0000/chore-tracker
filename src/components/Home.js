import { Link } from 'react-router-dom';

function Home({ people }) {
  return (
    <div className="home">
      <h2>Select a Person</h2>
      <div className="housemates-list">
        {people.map(person => (
          <Link 
            key={person.name} 
            to={`/${person.name.toLowerCase()}`}
            className="person-card"
          >
            <h3>{person.name}</h3>
            <p>Total Chores Done: {person.totalChores}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;