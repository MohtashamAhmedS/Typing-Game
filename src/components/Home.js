
const Home = ({ onGame }) => {

    return (
        <div className="home">
            <div className="title">TYPING JUNKIE</div>

            <button onClick={() => onGame('playGame')} className='btnPlay'>Play Game</button>
        </div>
    );
}
export default Home;