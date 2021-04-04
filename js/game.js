const players = [];

const dealtCards = [];
let leftCards = [];

function startNewGame(event)
{
    event.preventDefault();

    players.length = 0;
    dealtCards.length = 0;

    resetPlayersStatusBar();

    let minimumNumberOfPlayers = 2;
    let maximumNumberOfPlayers = 4;

    let numberOfPlayers = parseInt(document.getElementById('players-number-input').value);

    if (numberOfPlayers < minimumNumberOfPlayers || numberOfPlayers > maximumNumberOfPlayers) 
    {
        alert(`Liczba graczy musi być w przedziale od ${minimumNumberOfPlayers} do ${maximumNumberOfPlayers}`);

        return;
    }

    for (let i = 1; i <= numberOfPlayers; i++)
    {
        if (i == 1) {
            players.push({
                id: 1, type: 'human', cards: []
            });
        }
        else {
            players.push({
                id: i,
                type: 'computer',
                cards: []
            });  
        }
    }

    updatePlayersStatusBar(numberOfPlayers);

    dealCards();
}

function dealCards()
{
    const cardsArrayClone = [...cardsArray];

    let numberOfCardsForPlayer = 5;

    for (let i = 1; i <= numberOfCardsForPlayer; i++)
    {
        for (player in players)
        {
            let randomIndex = Math.floor(Math.random() * cardsArrayClone.length);
            let card = cardsArrayClone[randomIndex];

            players[player].cards.push(card);

            cardsArrayClone.splice(randomIndex, 1);
            dealtCards.push(card);
        }
    }

    leftCards = [...cardsArrayClone];
}

function updatePlayersStatusBar(numberOfPlayers)
{
    for (let i = 1; i < numberOfPlayers; i++)
    {
        let gameStatus = document.querySelector(`[data-playerGameStatus='${i + 1}']`);

        gameStatus.classList.add('color-indigo');
        gameStatus.textContent = "Zajęte";
    }
}

function resetPlayersStatusBar()
{
    for (let i = 1; i < 4; i++)
    {
        let gameStatus = document.querySelector(`[data-playerGameStatus='${i + 1}']`);

        gameStatus.classList.remove('color-indigo');
        gameStatus.textContent = "Wolne";
    }
}

document.getElementById('start-new-game-button').addEventListener('click', (event) => { startNewGame(event) });