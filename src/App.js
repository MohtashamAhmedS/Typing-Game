import Home from './components/Home.js';
import PlayGame from './components/PlayGame.js';
import EndGame from './components/EndGame.js';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [statusGame, setStatusGame] = useState(null);
  const [score, setScore] = useState(null);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    if (statusGame === 'playGame') {
      setScore({
        right: 0,
        wrong: 0,
      });
      const timeOutGame = setTimeout(() => {
        setStatusGame('endGame');
      }, 60000);
      return () => clearTimeout(timeOutGame);
    }
  }, [statusGame]);

  const handleChangeStatusGame = (status) => {
    setStatusGame(status);
  };

  const handleChangeScore = (type) => {
    if (type === 'right') {
      setScore((prevScore) => ({
        ...prevScore,
        right: prevScore.right + 1,
      }));
    } else {
      setScore((prevScore) => ({
        ...prevScore,
        wrong: prevScore.wrong + 1,
      }));
    }
  };

  const handleEndGame = (finalWpm) => {
    setWpm(finalWpm);
    setStatusGame('endGame');
  };

  let layout;
  switch (statusGame) {
    case 'playGame':
      layout = <PlayGame onChangeScore={handleChangeScore} onEndGame={handleEndGame} />;
      break;
    case 'endGame':
      layout = <EndGame score={score} onGame={handleChangeStatusGame} wpm={wpm} />;
      break;
    default:
      layout = <Home onGame={handleChangeStatusGame} />;
      break;
  }

  return (
    <div className="App">
      <video className="background-video" autoPlay loop muted>
        <source src={`${process.env.PUBLIC_URL}/video.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        {layout}
      </div>
    </div>
  );
}

export default App;
