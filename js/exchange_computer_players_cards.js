function exchangeComputerPlayersCards(players, leftCards)
{
    for (computerPlayerIndex in players)
    {   
        let computerPlayer = players[computerPlayerIndex];

        if (computerPlayer.type == 'human') continue;

        let computerPlayerHand = getComputerPlayerHand(computerPlayer);

        if (computerPlayerHand == undefined) continue;

        for (let i = 1; i <= 5; i++)
        {
            if (computerPlayerHand.cards_not_to_exchange_ids.indexOf(i) == -1) continue;

            let randomIndex = Math.floor(Math.random() * leftCards.length);
            let newCard = leftCards[randomIndex];

            leftCards.splice(randomIndex, 1);

            computerPlayer.cards[i - 1] = newCard;
        }
    }

    return players;
}

function getComputerPlayerHand(computerPlayer) 
{
    let computerPlayerHand;

    switch(true) {
        case (isHandRoyalFlush(computerPlayer)):
            computerPlayerHand = {'hand_type': 'royal_flush', 'cards_not_to_exchange_ids': []};
            break;
        case (isHandStraightFlush(computerPlayer)):
            computerPlayerHand = {'hand_type': 'straight_flush', 'cards_not_to_exchange_ids': []};
            break;
        case (isHandFourOfAKind(computerPlayer)):
            computerPlayerHand = {'hand_type': 'four_of_a_kind', 'cards_not_to_exchange_ids': []};
            break;
        case (isHandFullHouse(computerPlayer)):
            computerPlayerHand = {'hand_type': 'full_house', 'cards_not_to_exchange_ids': []};
            break;
        case (isHandFlush(computerPlayer)):
            computerPlayerHand = {'hand_type': 'flush', 'cards_not_to_exchange_ids': []};
            break;
        case (isHandStraight(computerPlayer)):
            computerPlayerHand = {'hand_type': 'straight', 'cards_not_to_exchange_ids': []};
            break;
        case (isHandThreeOfAKind(computerPlayer)):
            computerPlayerHand = {'hand_type': 'three_of_a_kind', 'cards_not_to_exchange_ids': getThreeOfAKindHandCardsToExchangeIds(computerPlayer)};
            break;
        case (isHandTwoPairs(computerPlayer)):
            computerPlayerHand = {'hand_type': 'two_pairs', 'cards_not_to_exchange_ids': getTwoPairsHandCardsToExchangeIds(computerPlayer)};
            break;
        case (isHandOnePair(computerPlayer)):
            computerPlayerHand = {'hand_type': 'one_pair', 'cards_not_to_exchange_ids': getOnePairHandCardsToExchangeIds(computerPlayer)};
            break;
        default:
            computerPlayerHand = {'hand_type': 'no_pair', 'cards_not_to_exchange_ids': getNoPairHandCardsToExchangeIds()};
    }

    return computerPlayerHand;
}

function isHandRoyalFlush(computerPlayer)
{
    let lastCard = null;

    let cards = computerPlayer.cards;

    cards.sort((a, b) => {
        a.number < b.number
    });

    if (cards[0].number !== 10) return false;

    for (cardIndex in cards)
    {
        let card = cards[cardIndex];

        if (lastCard == null)
        {
            lastCard = card;

            continue;
        }

        if (lastCard.type !== card.type || lastCard.number + 1 !== card.number)
        {

            return false;
        }

        lastCard = card;
    }

    return true;
}

function isHandStraightFlush(computerPlayer)
{
    let lastCard = null;

    let cards = computerPlayer.cards;

    cards.sort((a, b) => {
        a.number < b.number
    });

    for (cardIndex in cards)
    {
        let card = cards[cardIndex];

        if (lastCard == null)
        {
            lastCard = card;

            continue;
        }

        if (lastCard.type !== card.type || lastCard.number + 1 !== card.number)
        {
            return false;
        }

        lastCard = card;
    }

    if (cards[0].number == 10) return false;

    return true;
}

function isHandFourOfAKind(computerPlayer)
{
    let cards = computerPlayer.cards;

    let cardsKinds = [];

    for (cardIndex in cards)
    {
        let card = cards[cardIndex];

        if (cardsKinds.hasOwnProperty(card.number))
        {
            cardsKinds[card.number].push(card.number);
        }
        else 
        {
            cardsKinds[card.number] = [card.number];
        }
    }

    for (index in cardsKinds)
    {
        if (cardsKinds[index].length > 3) return true;
    }

    return false;
}

function isHandFullHouse(computerPlayer)
{
    let cards = computerPlayer.cards;

    let cardsKinds = [];

    for (cardIndex in cards)
    {
        let card = cards[cardIndex];

        if (cardsKinds.hasOwnProperty(card.number))
        {
            cardsKinds[card.number].push(card.number);
        }
        else 
        {
            cardsKinds[card.number] = [card.number];
        }
    }

    let isThereAPair = false;
    let isThereAThreeOfAKind = false;

    for (index in cardsKinds)
    {
        if (cardsKinds[index].length == 3) isThereAThreeOfAKind = true;
        else if (cardsKinds[index].length == 2) isThereAPair = true;
    }

    return isThereAPair && isThereAThreeOfAKind;
}

function isHandFlush(computerPlayer)
{
    let lastCard = null;

    let cards = computerPlayer.cards;

    for (cardIndex in cards)
    {
        let card = cards[cardIndex];

        if (lastCard == null)
        {
            lastCard = card;

            continue;
        }

        if (lastCard.type !== card.type)
        {
            return false;
        }

        lastCard = card;
    }

    return true;
}

function isHandStraight(computerPlayer)
{
    let lastCard = null;

    let areThereTwoDiffrentColors = false;

    let cards = computerPlayer.cards;

    cards.sort((a, b) => {
        a.number < b.number
    });

    for (cardIndex in cards)
    {
        let card = cards[cardIndex];

        if (lastCard == null)
        {
            lastCard = card;

            continue;
        }

        if (lastCard.number + 1 !== card.number)
        {
            return false;
        }

        if (lastCard.type !== card.type) areThereTwoDiffrentColors = true;

        lastCard = card;
    }

    return areThereTwoDiffrentColors;
}

function getHandCardsNumbers(computerPlayer)
{
    let cards = computerPlayer.cards;

    let cardsKinds = [];

    for (cardIndex in cards)
    {
        let card = cards[cardIndex];

        if (cardsKinds.hasOwnProperty(card.number))
        {
            cardsKinds[card.number].push(parseInt(cardIndex) + 1);
        }
        else 
        {
            cardsKinds[card.number] = [parseInt(cardIndex) + 1];
        }
    }

    return cardsKinds;
}

function isHandThreeOfAKind(computerPlayer)
{
    let isThereThreeOfAKind = false;
    let isThereAPair = false;

    cardsKinds = getHandCardsNumbers(computerPlayer);

    for (index in cardsKinds)
    {
        if (cardsKinds[index].length == 3) isThereThreeOfAKind = true;
        if (cardsKinds[index].length == 2) isThereAPair = true;
    }

    return (isThereThreeOfAKind == true && isThereAPair == false);
}

function isHandTwoPairs(computerPlayer)
{
    let numberOfPairs = 0;

    let cardsKinds = getHandCardsNumbers(computerPlayer);
 
    for (index in cardsKinds)
    {
        if (cardsKinds[index].length == 2) numberOfPairs = numberOfPairs + 1;
    }

    return numberOfPairs == 2;
}

function isHandOnePair(computerPlayer)
{
    if (isHandFullHouse(computerPlayer)) return false;

    let numberOfPairs = 0;

    let cardsKinds = getHandCardsNumbers(computerPlayer);
 
    for (index in cardsKinds)
    {
        if (cardsKinds[index].length == 2) numberOfPairs = numberOfPairs + 1;
    }

    return numberOfPairs == 1;
}

function getThreeOfAKindHandCardsToExchangeIds(computerPlayer)
{
    cardsKinds = getHandCardsNumbers(computerPlayer);

    const cardsToExchangeIds = [];

    for (index in cardsKinds)
    {
        if (cardsKinds[index].length !== 3) 
        {
            cardsToExchangeIds.push(...cardsKinds[index]);
        }
    }

    return cardsToExchangeIds;
}

function getTwoPairsHandCardsToExchangeIds(computerPlayer)
{
    cardsKinds = getHandCardsNumbers(computerPlayer);

    const cardsToExchangeIds = [];

    for (index in cardsKinds)
    {
        if (cardsKinds[index].length !== 2) 
        {
            cardsToExchangeIds.push(...cardsKinds[index]);
        }
    }

    return cardsToExchangeIds;
}

function getOnePairHandCardsToExchangeIds(computerPlayer)
{
    cardsKinds = getHandCardsNumbers(computerPlayer);

    const cardsToExchangeIds = [];

    for (index in cardsKinds)
    {
        if (cardsKinds[index].length !== 2) 
        {
            cardsToExchangeIds.push(...cardsKinds[index]);
        }
    }

    return cardsToExchangeIds;
}

function getNoPairHandCardsToExchangeIds()
{
    return [2, 3, 4, 5];
}