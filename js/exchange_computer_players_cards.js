const cardsToExchangeWithGivenHand = {
    no_pair: 4,
    one_pair: 3,
    two_pairs: 1,
    three_of_a_kind: 2,
    straight: 0,
    flush: 0,
    full_house: 0,
    four_of_a_kind: 0,
    straight_flush: 0,
    royal_flush: 0
};

function exchangeComputerPlayersCards(players, leftCards)
{
    for (computerPlayerIndex in players)
    {   
        let computerPlayer = players[computerPlayerIndex];

        if (computerPlayer.type == 'human') continue;

        let computerPlayerHand = getComputerPlayerHand(computerPlayer);

        if (computerPlayerHand == undefined) continue;

        for (let i = 1; i < 5; i++)
        {
            if (computerPlayerHand.cards_not_to_exchange_ids.indexOf(i) == -1) continue;

            let randomIndex = Math.floor(Math.random() * leftCards.length);
            let newCard = leftCards[randomIndex];

            leftCards.splice(randomIndex, 1);

            computerPlayer.cards[i - 1] = newCard;
        }
    }
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
            computerPlayerHand = {'hand_type': 'three_of_a_kind', 'cards_not_to_exchange_ids': getThreeOfAKindHandCardsToExchangeIds()};
            break;
        case (isHandTwoPairs(computerPlayer)):
            computerPlayerHand = {'hand_type': 'two_pairs', 'cards_not_to_exchange_ids': getTwoPairsHandCardsToExchangeIds()};
            break;
        case (isHandOnePair(computerPlayer)):
            computerPlayerHand = {'hand_type': 'one_pair', 'cards_not_to_exchange_ids': getOnePairHandCardsToExchangeIds()};
            break;
        case (isHandNoPair(computerPlayer)):
            computerPlayerHand = {'hand_type': 'no_pair', 'cards_not_to_exchange_ids': getNoPairHandCardsToExchangeIds()};
            break;
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

function isHandStraightFlush()
{
    
}

function isHandFourOfAKind()
{

}

function isHandFullHouse()
{

}

function isHandFlush()
{

}

function isHandStraight()
{

}

function isHandThreeOfAKind()
{

}

function isHandTwoPairs()
{

}

function isHandOnePair()
{

}

function isHandNoPair()
{

}

function getThreeOfAKindHandCardsToExchangeIds()
{

}

function getTwoPairsHandCardsToExchangeIds()
{

}

function getOnePairHandCardsToExchangeIds()
{

}

function getNoPairHandCardsToExchangeIds()
{

}