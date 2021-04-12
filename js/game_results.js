const handsStrength = {
    no_pair: 1,
    one_pair: 2,
    two_pairs: 3,
    three_of_a_kind: 4,
    straight: 5,
    flush: 6,
    full_house: 7,
    four_of_a_kind: 8,
    straight_flush: 9,
    royal_flush: 10
};

const handsTranslation = {
    no_pair: "Brak par",
    one_pair: "Jedna para",
    two_pairs: "Dwie pary",
    three_of_a_kind: "Trójka",
    straight: "Strit",
    flush: "Kolor",
    full_house: "Full",
    four_of_a_kind: "Kareta",
    straight_flush: "Mały poker",
    royal_flush: "Poker królewski"
}

const rankPlayers = () => {
    return new Promise((resolve, reject) => {
        let results = [];

        for (playerIndex in players)
        {
            let player = players[playerIndex];

            let playerHand = getComputerPlayerHand(player);

            let name = player.type == "computer" ? "Computer #" + player.id : "Player";

            let playerResult = {player_name: name, hand_name: handsTranslation[playerHand.hand_type], hand_strength: handsStrength[playerHand.hand_type], place: null};

            results.push(playerResult);
        }

        results = results.sort((a, b) => {
            return b.hand_strength - a.hand_strength;
        });

        let previousResult = null;

        for (resultIndex in results)
        {
            let result = results[resultIndex];

            if (previousResult == null)
            {
                result.place = 1;
            }
            else if (previousResult.hand_strength != result.hand_strength)
            {
                result.place = previousResult.place + 1;
            } 
            else
            {
                result.place = previousResult.place;
            }

            previousResult = result;
        }

        resolve(results);
    }
)};

function displayResults(results)
{
    let gameResultsContainer = document.getElementById('game-results');
    let overHeadHr = document.getElementById('game-results-overhead-hr');

    gameResultsContainer.appendChild(getResultsTableWidget(results));

    gameResultsContainer.classList.remove('hide');
    overHeadHr.classList.remove('hide');
}

function hideResults()
{
    let gameResultsContainer = document.getElementById('game-results');
    let overHeadHr = document.getElementById('game-results-overhead-hr');
    let resultsTable = document.getElementById('results-table');

    gameResultsContainer.classList.add('hide');
    overHeadHr.classList.add('hide');
    if (resultsTable !== null) resultsTable.remove();
}

function getResultsTableWidget(results)
{
    let table = document.createElement('table');
    table.classList = "table table-bordered";
    table.setAttribute('id', 'results-table');

    let tableHeader = document.createElement('thead');
    let headerTr = document.createElement('tr');

    let headerPlaceTd = document.createElement('td');
    headerPlaceTd.textContent = "Miejsce";

    let headerPlayerNameTd = document.createElement('td');
    headerPlayerNameTd.textContent = "Imię";

    let headerHandTd = document.createElement('td');
    headerHandTd.textContent = "Karty";

    headerTr.appendChild(headerPlaceTd);
    headerTr.appendChild(headerPlayerNameTd);
    headerTr.appendChild(headerHandTd);

    tableHeader.appendChild(headerTr);
    table.appendChild(tableHeader);

    let tableBody = document.createElement('tbody');

    for (resultIndex in results)
    {
        let tr = document.createElement('tr');

        let result = results[resultIndex];

        let placeTd = document.createElement('td');
        placeTd.textContent = result.place;

        let playerNameTd = document.createElement('td');
        playerNameTd.textContent = result.player_name;

        let handTd = document.createElement('td');
        handTd.textContent = result.hand_name;

        tr.appendChild(placeTd);
        tr.appendChild(playerNameTd);
        tr.appendChild(handTd);

        tableBody.appendChild(tr);
    }

    table.appendChild(tableBody);

    return table;
}