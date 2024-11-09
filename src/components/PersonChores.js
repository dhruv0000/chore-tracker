import { useParams, Link } from 'react-router-dom';

function PersonChores({ choreData }) {
  const { name } = useParams();
  const personChores = choreData.chores.filter(chore => 
    chore.assignedTo.includes(name)
  );

  return (
    <div className="person-chores">
      <Link to="/" className="back-link">← Back to Home</Link>
      <h2>{name}'s Chores</h2>
      <div className="chores-list">
        {personChores.map(chore => (
          <div key={chore.name} className="chore-item">
            <h3>{chore.name}</h3>
            <p>Times Done: {chore.count[name] || 0}</p>
            <p>Also assigned to: {chore.assignedTo.filter(p => p !== name).join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonChores;