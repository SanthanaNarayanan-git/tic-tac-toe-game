import GameState from "./GameState";

export default function Reset({gameState, handleReset}){
    if(gameState === GameState.inProgress){
        return
    }
    return(
<button onClick={handleReset} className='reset-button'>Play Again</button>
    );
}