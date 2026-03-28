import { useState, useCallback } from 'react';
import { HoleView } from './components/HoleView';
import { getRandomHole } from './data/holeSelection';
import type { HoleDefinition } from './domain/types';

function App() {
  const [hole, setHole] = useState<HoleDefinition>(() => getRandomHole());

  const handleNewHole = useCallback(() => {
    setHole((prev) => getRandomHole(prev));
  }, []);

  return (
    <>
      <header className="app-header">
        <h1>⛳ Range+</h1>
        <button className="btn" onClick={handleNewHole}>
          New Hole
        </button>
      </header>
      <HoleView key={hole.id} hole={hole} onNewHole={handleNewHole} />
    </>
  );
}

export default App
