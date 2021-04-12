let players = [];

const dealtCards = [];
let leftCards = [];

function startNewGame(event)
{
    event.preventDefault();

    players.length = 0;
    dealtCards.length = 0;

    resetPlayersStatusBar();
    hidePlayerCards();
    removeComputerPlayersCardRows();

    showExchangeCheckboxes();
    showExchangePlayerCardButton();

    let minimumNumberOfPlayers = 2;
    let maximumNumberOfPlayers = 4;

    let numberOfPlayers = parseInt(document.getElementById('players-number-input').value);

    if (numberOfPlayers < minimumNumberOfPlayers || numberOfPlayers > maximumNumberOfPlayers || isNaN(numberOfPlayers)) 
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

    showPlayerCards();
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

function exchangeCards()
{
    const cardsToExchangeIds = [];
    const newCards = [];

    let exchangeCardInputs = document.getElementsByClassName(`exchange-card-input`);

    for (inputIndex in exchangeCardInputs)
    {
        let exchangeCardInput = exchangeCardInputs[inputIndex];

        if (exchangeCardInput.checked) {
            let cardId = exchangeCardInput.getAttribute('data-cardId');
            cardsToExchangeIds.push(parseInt(cardId));
        }
    }

    if (cardsToExchangeIds.length > 4)
    {
        alert('Możesz wymienić maksymalnie cztery karty');

        return;
    }

    if (cardsToExchangeIds.length > leftCards.length)
    {
        alert('Doszło do błędu i zabrakło kart do wymiany, proszę odświeżyć stronę');

        return;
    }

    for (let i = 1; i <= cardsToExchangeIds.length; i++)
    {
        let cardId = cardsToExchangeIds[i - 1];

        let randomIndex = Math.floor(Math.random() * leftCards.length);
        let newCard = leftCards[randomIndex];

        newCards[cardId] = newCard;

        leftCards.splice(randomIndex, 1);

        players[0].cards[cardId - 1] = newCard;
    }

    changeCardsImages(cardsToExchangeIds, newCards);
    uncheckExchangeCheckboxes();
    hideExchangeCheckboxes();
    hideExchangePlayerCardButton();
    showComputerPlayerCards();
}

function changeCardsImages(cardsToExchangeIds, newCards)
{
    for (cardIdIndex in cardsToExchangeIds)
    {
        let cardId = cardsToExchangeIds[cardIdIndex];

        let img = document.getElementById(`human-player-card-${parseInt(cardId)}`);

        img.setAttribute('src', `images/${newCards[cardId].picture}`);
        img.setAttribute('alt', newCards[cardId].name);
    }
}

function uncheckExchangeCheckboxes()
{
    const checkboxes = document.getElementsByClassName('exchange-card-input');

    for (checkboxIndex in checkboxes)
    {
        let checkbox = checkboxes[checkboxIndex];
        checkbox.checked = false;
    }
}

function hideExchangeCheckboxes()
{
    let checkboxes = document.getElementsByClassName('exchange-checkbox-div'); 

    Array.from(checkboxes).forEach((checkbox) => {
        checkbox.classList.add('hide');
    })
}

function showExchangeCheckboxes()
{
    let checkboxes = document.getElementsByClassName('exchange-checkbox-div'); 

    Array.from(checkboxes).forEach((checkbox) => {
        checkbox.classList.remove('hide');
    })
}

function hideExchangePlayerCardButton()
{
    let button = document.getElementById('exchange-cards-button'); 

    button.classList.add('hide');
}

function showExchangePlayerCardButton()
{
    let button = document.getElementById('exchange-cards-button'); 

    button.classList.remove('hide');
}

function showPlayerCards()
{
    let humanPlayerCardsSection = document.getElementById('human-player-cards');

    for (cardIndex in players[0].cards)
    {
        let card = players[0].cards[cardIndex];
        let img = document.getElementById(`human-player-card-${parseInt(cardIndex) + 1}`);

        img.setAttribute('src', `images/${card.picture}`);
    }

    humanPlayerCardsSection.classList.remove('hide');
}

function hidePlayerCards()
{
    let humanPlayerCardsSection = document.getElementById('human-player-cards');

    humanPlayerCardsSection.classList.add('hide');
}

function showComputerPlayerCards()
{
    let computerPlayersCardsSection = document.getElementById('computer-players-cards');

    for (computerPlayerIndex in players)
    {   
        let computerPlayer = players[computerPlayerIndex];

        if (computerPlayer.type == 'human') continue;

        let cardsRow = createComputerPlayerCardsRow(computerPlayer.cards, computerPlayer.id);

        computerPlayersCardsSection.appendChild(cardsRow);
    }

    computerPlayersCardsSection.classList.remove('hide');
}

function createComputerPlayerCardsRow(cards, computerPlayerId)
{
    let row = document.createElement('div');
    row.classList.add('row');

    let h3 = document.createElement('h3');
    h3.classList = 'text-center mb-4 mt-4'; 
    h3.textContent = 'Karty komputera #' + computerPlayerId;

    row.appendChild(h3);

    let offsetDiv = document.createElement('div');
    offsetDiv.classList = 'col-sm-12 col-md-1 mt-3';

    row.appendChild(offsetDiv);

    for (cardIndex in cards)
    {
        let card = cards[cardIndex];

        row.appendChild(createComputerPlayerCardWdiget(card));
    }

    row.appendChild(offsetDiv.cloneNode());

    return row;
}

function createComputerPlayerCardWdiget(card)
{
    let cardDiv = document.createElement('div');
    cardDiv.classList = 'col-sm-6 col-md-2 mt-3 text-center';

    let img = document.createElement('img');
    img.classList = 'img-fluid human-player-card-img';
    img.setAttribute('src', `images/${card.picture}`);
    img.setAttribute('alt', card.picture);

    cardDiv.appendChild(img);

    return cardDiv;
}

function removeComputerPlayersCardRows()
{
    let computerPlayersCardsSection = document.getElementById('computer-players-cards');

    let computerPlayersCardsRows = document.querySelectorAll('#computer-players-cards .row');

    Array.from(computerPlayersCardsRows).forEach((row) => {
        row.remove();
    })

    computerPlayersCardsSection.classList.add('hide');
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

document.getElementById('exchange-cards-button').addEventListener('click', () => {
    exchangeCards();
    players = exchangeComputerPlayersCards(players, leftCards);
});