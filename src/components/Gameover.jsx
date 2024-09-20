import GameState from "./GameState";
function Gameover({gameState}){
    switch(gameState){
        case GameState.inProgress:
        return <></>
        case GameState.playerOWins:
            return <div className="game-over">O Wins</div>
        case GameState.playerXWins:
            return <div className="game-over">X Wins</div>
        case GameState.draw:
            return <div className="game-over">Draw</div>
        default:
            <></>
        
    }
    return(
        <div>Game Over</div>
    )
}

export default Gameover;