import { useParams } from 'react-router-dom';

function PersonChores({ choreData }) {
  const { name } = useParams();
  const personChores = choreData.chores.filter(chore => 
    chore.assignedTo.some(person => person.toLowerCase() === name.toLowerCase())
  );

  const handleCountUpdate = async (choreName, increment) => {
    const eventType = increment ? 'increment-chore' : 'decrement-chore';
    
    try {
      await fetch(`https://api.github.com/repos/dhruv0000/chore-tracker/dispatches`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          event_type: eventType,
          client_payload: {
            person: name,
            chore: choreName
          }
        })
      });
      
      // Optionally refresh the page or update UI
      window.location.reload();
    } catch (error) {
      console.error('Failed to update chore count:', error);
    }
  };

  return (
    <div className="person-chores">
      <h2>{name}'s Chores</h2>
      <div className="chores-list">
        {personChores.map(chore => (
          <div key={chore.name} className="chore-item">
            <h3>{chore.name}</h3>
            <div className="counter-controls">
              <button onClick={() => handleCountUpdate(chore.name, false)}>-</button>
              <span>Times Done: {chore.count[name] || 0}</span>
              <button onClick={() => handleCountUpdate(chore.name, true)}>+</button>
            </div>
            <p>Also assigned to: {chore.assignedTo.filter(p => p !== name).join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonChores;