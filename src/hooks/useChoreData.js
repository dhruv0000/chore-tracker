
import { useState, useEffect } from 'react';

export function useChoreData() {
  const [choreData, setChoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/dhruv0000/household-chore-tracker/refs/heads/main/choses.json')
      .then(res => res.json())
      .then(data => {
        const peopleMap = new Map();
        
        data.chores.forEach(chore => {
          chore.assignedTo.forEach(person => {
            if (!peopleMap.has(person)) {
              peopleMap.set(person, { name: person, totalChores: 0 });
            }
            peopleMap.get(person).totalChores += chore.count[person] || 0;
          });
        });

        setChoreData({
          people: Array.from(peopleMap.values()),
          chores: data.chores
        });
        setLoading(false);
      });
  }, []);

  return { choreData, loading };
}