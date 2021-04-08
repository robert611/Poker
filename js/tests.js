function testIfComputerPlayerCardsWillNotBeExchanged(players, leftCards, functionName)
{
    let testPassed = true;

    const originalCards = [...players[0].cards];

    exchangeComputerPlayersCards(players, leftCards);

    for (index in originalCards)
    {
        let originalCard = originalCards[index];
        let changedCard = players[0].cards[index];

        if (originalCard.name !== changedCard.name || originalCard.picture !== changedCard.picture || originalCard.type !== changedCard.type
            || originalCard.number !== changedCard.number)
        {
            testPassed = false;
        }
    }

    if (!testPassed) console.error(`Function ${functionName} exchanges cards`);
    else console.info(`${functionName} passed`);
}

function testIfComputerCardsWillBeExchanged(players, leftCards, functionName, cardsToExchangeNumber, indexesToExchange)
{
    let exchangedCardsNumber = 0;

    const exchangesIndexes = [];

    const originalCards = [...players[0].cards];

    exchangeComputerPlayersCards(players, leftCards);

    for (index in originalCards)
    {
        let originalCard = originalCards[index];
        let changedCard = players[0].cards[index];
        
        if (originalCard.id !== changedCard.id)
        {
            exchangedCardsNumber = exchangedCardsNumber + 1;
            exchangesIndexes.push(parseInt(index) + 1);
        }
    }

    if (cardsToExchangeNumber == exchangedCardsNumber)
    {
        if (exchangesIndexes.toString() == indexesToExchange.toString())
        {
            console.info(`${functionName} passed`);
        }
        else 
        {
            console.error(`Function ${functionName} exchanges cards but the wrong ones!`);
        }
        
    } 
    else console.error(`Function ${functionName} does not exchange cards`);
}

function testIfIsHandRoyalFlushRecognisesRoyalFlush()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 36, name: 'Dziesiątka Trefl', picture: '10_trefl.png', type: 'trefl', number: 10},
        {id: 37, name: 'Walet Trefl', picture: 'walet_trefl.png', type: 'trefl', number: 11},
        {id: 38, name: 'Dama Trefl', picture: 'quenn_trefl.png', type: 'trefl', number: 12},
        {id: 39, name: 'Król Trefl', picture: 'king_trefl.png', type: 'trefl', number: 13},
        {id: 27, name: 'As Trefl', picture: 'as_trefl.png', type: 'trefl', number: 14}
    ]};

    let correctResult = isHandRoyalFlush(player);

    if (!correctResult) console.error('Function isHandRoyalFlush thinks that royal flush is not a royal flush');
    else console.info('testIfIsHandRoyalFlushRecognisesRoyalFlush passed');
}

function testIfIsHandRoyalFlushRejectsOtherHands()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 36, name: 'Dziesiątka Trefl', picture: '10_trefl.png', type: 'trefl', number: 10},
        {id: 37, name: 'Walet Trefl', picture: 'walet_trefl.png', type: 'trefl', number: 11},
        {id: 38, name: 'Dama Kier', picture: 'quenn_kier.png', type: 'kier', number: 12},
        {id: 39, name: 'Król Trefl', picture: 'king_trefl.png', type: 'trefl', number: 13},
        {id: 27, name: 'As Trefl', picture: 'as_trefl.png', type: 'trefl', number: 14}
    ]};

    let incorrectResult = isHandRoyalFlush(player);

    if (incorrectResult) console.error('Function isHandRoyalFlush thinks that hand which is not a royal flush is a royal flush');
    else console.info('testIfIsHandRoyalFlushRejectsOtherHands passed');
}

function testIfIsHandRoyalFlushRejectsStraightFlush()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 2, name: 'Dwójka Pik', picture: '2_pik.png', type: 'pik', number: 2},
        {id: 3, name: 'Trójka Pik', picture: '3_pik.png', type: 'pik', number: 3},
        {id: 4, name: 'Czwórka Pik', picture: '4_pik.png', type: 'pik', number: 4},
        {id: 5, name: 'Piątka Pik', picture: '5_pik.png', type: 'pik', number: 5},
        {id: 6, name: 'Szóstka Pik', picture: '6_pik.png', type: 'pik', number: 6},
    ]};

    let incorrectResult = isHandRoyalFlush(player);

    if (incorrectResult) console.error('Function isHandRoyalFlush thinks that straight flush is a royal flush');
    else console.info('testIfIsHandRoyalFlushRejectsStraightFlush passed');
}

function testIfComputerPlayerRoyalFlushCardsWillNotBeExchanged()
{
    let players = [
        {
            id: 1,
            type: 'computer',
            cards: [
                {id: 36, name: 'Dziesiątka Trefl', picture: '10_trefl.png', type: 'trefl', number: 10},
                {id: 37, name: 'Walet Trefl', picture: 'walet_trefl.png', type: 'trefl', number: 11},
                {id: 38, name: 'Dama Trefl', picture: 'quenn_trefl.png', type: 'trefl', number: 12},
                {id: 39, name: 'Król Trefl', picture: 'king_trefl.png', type: 'trefl', number: 13},
                {id: 27, name: 'As Trefl', picture: 'as_trefl.png', type: 'trefl', number: 14}
            ]
        }
    ];

    const leftCards = [
        {id: 5, name: 'Piątka Pik', picture: '5_pik.png', type: 'pik', number: 5},
        {id: 6, name: 'Szóstka Pik', picture: '6_pik.png', type: 'pik', number: 6},
        {id: 7, name: 'Siódemka Pik', picture: '7_pik.png', type: 'pik', number: 7},
        {id: 8, name: 'Ósemka Pik', picture: '8_pik.png', type: 'pik', number: 8},
    ];

    testIfComputerPlayerCardsWillNotBeExchanged(players, leftCards, 'testIfComputerPlayerRoyalFlushCardsWillNotBeExchanged');
}

function testIfStraightFlushWillBeRecognised()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 48, name: 'Dziewiątka Karo', picture: '9_karo.png', type: 'karo', number: 9},
        {id: 49, name: 'Dziesiątka Karo', picture: '10_karo.png', type: 'karo', number: 10},
        {id: 50, name: 'Walet Karo', picture: 'walet_karo.png', type: 'karo', number: 11},
        {id: 51, name: 'Dama Karo', picture: 'quenn_karo.png', type: 'karo', number: 12},
        {id: 52, name: 'Król Karo', picture: 'king_karo.png', type: 'karo', number: 13}
    ]};

    let result = isHandStraightFlush(player);

    if (!result) console.error('Function testIfStraightFlushWillBeRecognised does not recognise straight flash');
    else console.info('testIfStraightFlushWillBeRecognised passed');
}

function testIfIsHandStraightFlushWillRejectSthElse()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 48, name: 'Dziewiątka Karo', picture: '9_karo.png', type: 'karo', number: 9},
        {id: 22, name: 'Dziewiątka Kier', picture: '9_kier.png', type: 'kier', number: 9},
        {id: 23, name: 'Dziesiątka Kier', picture: '10_kier.png', type: 'kier', number: 10},
        {id: 24, name: 'Walet Kier', picture: 'walet_kier.png', type: 'kier', number: 11},
        {id: 52, name: 'Król Karo', picture: 'king_karo.png', type: 'karo', number: 13}
    ]};

    let result = isHandStraightFlush(player);

    if (result) console.error('Function testIfIsHandStraightFlushWillRejectSthElse recognises one pair as a straight flash');
    else console.info('testIfIsHandStraightFlushWillRejectSthElse passed');
}

function testIfComputerPlayerStraightFlushCardsWillNotBeExchanged()
{
    let players = [
        {
            id: 1,
            type: 'computer',
            cards: [
                {id: 2, name: 'Dwójka Pik', picture: '2_pik.png', type: 'pik', number: 2},
                {id: 3, name: 'Trójka Pik', picture: '3_pik.png', type: 'pik', number: 3},
                {id: 4, name: 'Czwórka Pik', picture: '4_pik.png', type: 'pik', number: 4},
                {id: 5, name: 'Piątka Pik', picture: '5_pik.png', type: 'pik', number: 5},
                {id: 6, name: 'Szóstka Pik', picture: '6_pik.png', type: 'pik', number: 6}
            ]
        }
    ];

    const leftCards = [
        {id: 18, name: 'Piątka Kier', picture: '5_kier.png', type: 'kier', number: 5},
        {id: 19, name: 'Szóstka Kier', picture: '6_kier.png', type: 'kier', number: 6},
        {id: 20, name: 'Siódemka Kier', picture: '7_kier.png', type: 'kier', number: 7},
        {id: 21, name: 'Ósemka Kier', picture: '8_kier.png', type: 'kier', number: 8},
        {id: 22, name: 'Dziewiątka Kier', picture: '9_kier.png', type: 'kier', number: 9},
        {id: 23, name: 'Dziesiątka Kier', picture: '10_kier.png', type: 'kier', number: 10},
        {id: 24, name: 'Walet Kier', picture: 'walet_kier.png', type: 'kier', number: 11},
        {id: 25, name: 'Dama Kier', picture: 'quenn_kier.png', type: 'kier', number: 12},
        {id: 26, name: 'Król Kier', picture: 'king_kier.png', type: 'kier', number: 13}
    ];

    testIfComputerPlayerCardsWillNotBeExchanged(players, leftCards, 'testIfComputerPlayerStraightFlushCardsWillNotBeExchanged');
}

function testIfFourOfAKindCanBeRecognised()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 48, name: 'Dziewiątka Karo', picture: '9_karo.png', type: 'karo', number: 9},
        {id: 22, name: 'Dziewiątka Kier', picture: '9_kier.png', type: 'kier', number: 9},
        {id: 9, name: 'Dziewiątka Pik', picture: '9_pik.png', type: 'pik', number: 9},
        {id: 35, name: 'Dziewiątka Trefl', picture: '9_trefl.png', type: 'trefl', number: 9},
        {id: 52, name: 'Król Karo', picture: 'king_karo.png', type: 'karo', number: 13}
    ]};

    let result = isHandFourOfAKind(player);

    if (!result) console.error('Function testIfFourOfAKindCanBeRecognised does not recognise four of a kind');
    else console.info('testIfFourOfAKindCanBeRecognised passed');
}

function testIfIsFourOfAKindRejectsOtherHand()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 48, name: 'Dziewiątka Karo', picture: '9_karo.png', type: 'karo', number: 9},
        {id: 1, name: 'As Pik', picture: 'as_pik.png', type: 'pik', number: 14},
        {id: 46, name: 'Siódemka Karo', picture: '7_karo.png', type: 'karo', number: 7},
        {id: 35, name: 'Dziewiątka Trefl', picture: '9_trefl.png', type: 'trefl', number: 9},
        {id: 52, name: 'Król Karo', picture: 'king_karo.png', type: 'karo', number: 13}
    ]};

    let result = isHandFourOfAKind(player);

    if (result) console.error('Function testIfIsFourOfAKindRejectsOtherHand recognises pair as a four of a kind');
    else console.info('testIfIsFourOfAKindRejectsOtherHand passed');
}

function testIfComputerPlayerFourOfAKindCardsWillNotBeExchanged()
{
    let players = [
        {
            id: 1,
            type: 'computer',
            cards: [
                {id: 48, name: 'Dziewiątka Karo', picture: '9_karo.png', type: 'karo', number: 9},
                {id: 22, name: 'Dziewiątka Kier', picture: '9_kier.png', type: 'kier', number: 9},
                {id: 9, name: 'Dziewiątka Pik', picture: '9_pik.png', type: 'pik', number: 9},
                {id: 35, name: 'Dziewiątka Trefl', picture: '9_trefl.png', type: 'trefl', number: 9},
                {id: 52, name: 'Król Karo', picture: 'king_karo.png', type: 'karo', number: 13}
            ]
        }
    ];

    const leftCards = [
        {id: 18, name: 'Piątka Kier', picture: '5_kier.png', type: 'kier', number: 5},
        {id: 19, name: 'Szóstka Kier', picture: '6_kier.png', type: 'kier', number: 6},
        {id: 20, name: 'Siódemka Kier', picture: '7_kier.png', type: 'kier', number: 7},
        {id: 22, name: 'Dziewiątka Kier', picture: '9_kier.png', type: 'kier', number: 9},
        {id: 23, name: 'Dziesiątka Kier', picture: '10_kier.png', type: 'kier', number: 10},
        {id: 25, name: 'Dama Kier', picture: 'quenn_kier.png', type: 'kier', number: 12},
        {id: 26, name: 'Król Kier', picture: 'king_kier.png', type: 'kier', number: 13}
    ];

    testIfComputerPlayerCardsWillNotBeExchanged(players, leftCards, 'testIfComputerPlayerFourOfAKindCardsWillNotBeExchanged');
}

function testIfFullHouseCanBeRecognised()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 48, name: 'Dziewiątka Karo', picture: '9_karo.png', type: 'karo', number: 9},
        {id: 26, name: 'Król Kier', picture: 'king_kier.png', type: 'kier', number: 13},
        {id: 9, name: 'Dziewiątka Pik', picture: '9_pik.png', type: 'pik', number: 9},
        {id: 35, name: 'Dziewiątka Trefl', picture: '9_trefl.png', type: 'trefl', number: 9},
        {id: 52, name: 'Król Karo', picture: 'king_karo.png', type: 'karo', number: 13}
    ]};

    let result = isHandFullHouse(player);

    if (!result) console.error('Function testIfFullHouseCanBeRecognised does not recognise full house');
    else console.info('testIfFullHouseCanBeRecognised passed');
}

function testIfIsHandFullHouseRejectsOtherHands()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 48, name: 'Dziewiątka Karo', picture: '9_karo.png', type: 'karo', number: 9},
        {id: 22, name: 'Dziewiątka Kier', picture: '9_kier.png', type: 'kier', number: 9},
        {id: 9, name: 'Dziewiątka Pik', picture: '9_pik.png', type: 'pik', number: 9},
        {id: 35, name: 'Dziewiątka Trefl', picture: '9_trefl.png', type: 'trefl', number: 9},
        {id: 16, name: 'Trójka Kier', picture: '3_kier.png', type: 'kier', number: 3},
    ]};

    let result = isHandFullHouse(player);

    if (result) console.error('Function testIfIsHandFullHouseRejectsOtherHands recognises four of a kind as full house');
    else console.info('testIfIsHandFullHouseRejectsOtherHands passed');
}

function testIfComputerPlayerFullHouseCardsWillNotBeExchanged()
{
    let players = [
        {
            id: 1,
            type: 'computer',
            cards: [
                {id: 48, name: 'Dziewiątka Karo', picture: '9_karo.png', type: 'karo', number: 9},
                {id: 26, name: 'Król Kier', picture: 'king_kier.png', type: 'kier', number: 13},
                {id: 9, name: 'Dziewiątka Pik', picture: '9_pik.png', type: 'pik', number: 9},
                {id: 35, name: 'Dziewiątka Trefl', picture: '9_trefl.png', type: 'trefl', number: 9},
                {id: 52, name: 'Król Karo', picture: 'king_karo.png', type: 'karo', number: 13}
            ]
        }
    ];

    const leftCards = [
        {id: 18, name: 'Piątka Kier', picture: '5_kier.png', type: 'kier', number: 5},
        {id: 19, name: 'Szóstka Kier', picture: '6_kier.png', type: 'kier', number: 6},
        {id: 20, name: 'Siódemka Kier', picture: '7_kier.png', type: 'kier', number: 7},
        {id: 22, name: 'Dziewiątka Kier', picture: '9_kier.png', type: 'kier', number: 9},
        {id: 23, name: 'Dziesiątka Kier', picture: '10_kier.png', type: 'kier', number: 10}
    ];

    testIfComputerPlayerCardsWillNotBeExchanged(players, leftCards, 'testIfComputerPlayerFourOfAKindCardsWillNotBeExchanged');
}

function testIfFlushCanBeRecognised()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 16, name: 'Trójka Kier', picture: '3_kier.png', type: 'kier', number: 3},
        {id: 17, name: 'Czwórka Kier', picture: '4_kier.png', type: 'kier', number: 4},
        {id: 19, name: 'Szóstka Kier', picture: '6_kier.png', type: 'kier', number: 6},
        {id: 20, name: 'Siódemka Kier', picture: '7_kier.png', type: 'kier', number: 7},
        {id: 22, name: 'Dziewiątka Kier', picture: '9_kier.png', type: 'kier', number: 9},
    ]};

    let result = isHandFlush(player);

    if (!result) console.error('Function testIfFlushCanBeRecognised does not recognise flush');
    else console.info('testIfFlushCanBeRecognised passed');
}

function testIfIsHandFlushRejectsOtherHands()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 48, name: 'Dziewiątka Karo', picture: '9_karo.png', type: 'karo', number: 9},
        {id: 22, name: 'Dziewiątka Kier', picture: '9_kier.png', type: 'kier', number: 9},
        {id: 9, name: 'Dziewiątka Pik', picture: '9_pik.png', type: 'pik', number: 9},
        {id: 35, name: 'Dziewiątka Trefl', picture: '9_trefl.png', type: 'trefl', number: 9},
        {id: 16, name: 'Trójka Kier', picture: '3_kier.png', type: 'kier', number: 3},
    ]};

    let result = isHandFlush(player);

    if (result) console.error('Function testIfIsHandFlushRejectsOtherHands recognises four of a kind as flush');
    else console.info('testIfIsHandFlushRejectsOtherHands passed');
}

function testIfComputerPlayerFlushCardsWillNotBeExchanged()
{
    let players = [
        {
            id: 1,
            type: 'computer',
            cards: [
                {id: 16, name: 'Trójka Kier', picture: '3_kier.png', type: 'kier', number: 3},
                {id: 17, name: 'Czwórka Kier', picture: '4_kier.png', type: 'kier', number: 4},
                {id: 19, name: 'Szóstka Kier', picture: '6_kier.png', type: 'kier', number: 6},
                {id: 20, name: 'Siódemka Kier', picture: '7_kier.png', type: 'kier', number: 7},
                {id: 22, name: 'Dziewiątka Kier', picture: '9_kier.png', type: 'kier', number: 9},
            ]
        }
    ];

    const leftCards = [
        {id: 5, name: 'Piątka Pik', picture: '5_pik.png', type: 'pik', number: 5},
        {id: 6, name: 'Szóstka Pik', picture: '6_pik.png', type: 'pik', number: 6},
        {id: 7, name: 'Siódemka Pik', picture: '7_pik.png', type: 'pik', number: 7},
        {id: 8, name: 'Ósemka Pik', picture: '8_pik.png', type: 'pik', number: 8},
        {id: 9, name: 'Dziewiątka Pik', picture: '9_pik.png', type: 'pik', number: 9},
        {id: 10, name: 'Dziesiątka Pik', picture: '10_pik.png', type: 'pik', number: 10},
    ];

    testIfComputerPlayerCardsWillNotBeExchanged(players, leftCards, 'testIfComputerPlayerFlushCardsWillNotBeExchanged');
}

function testIfStraightCanBeRecognised()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 3, name: 'Trójka Pik', picture: '3_pik.png', type: 'pik', number: 3},
        {id: 17, name: 'Czwórka Kier', picture: '4_kier.png', type: 'kier', number: 4},
        {id: 31, name: 'Piątka Trefl', picture: '5_trefl.png', type: 'trefl', number: 5},
        {id: 19, name: 'Szóstka Kier', picture: '6_kier.png', type: 'kier', number: 6},
        {id: 33, name: 'Siódemka Trefl', picture: '7_trefl.png', type: 'trefl', number: 7},
    ]};

    let result = isHandStraight(player);

    if (!result) console.error('Function testIfStraightCanBeRecognised does not recognise straight');
    else console.info('testIfStraightCanBeRecognised passed');
}

function testIfIsHandStraightRejectsOtherHands()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 36, name: 'Dziesiątka Trefl', picture: '10_trefl.png', type: 'trefl', number: 10},
        {id: 37, name: 'Walet Trefl', picture: 'walet_trefl.png', type: 'trefl', number: 11},
        {id: 38, name: 'Dama Trefl', picture: 'quenn_trefl.png', type: 'trefl', number: 12},
        {id: 39, name: 'Król Trefl', picture: 'king_trefl.png', type: 'trefl', number: 13},
        {id: 27, name: 'As Trefl', picture: 'as_trefl.png', type: 'trefl', number: 14}
    ]};

    let result = isHandStraight(player);

    if (result) console.error('Function testIfIsHandStraightRejectsOtherHands recognises royal flush as a straight');
    else console.info('testIfIsHandStraightRejectsOtherHands passed');
}

function testIfComputerPlayerStraightCardsWillNotBeExchanged()
{
    let players = [
        {
            id: 1,
            type: 'computer',
            cards: [
                {id: 3, name: 'Trójka Pik', picture: '3_pik.png', type: 'pik', number: 3},
                {id: 17, name: 'Czwórka Kier', picture: '4_kier.png', type: 'kier', number: 4},
                {id: 31, name: 'Piątka Trefl', picture: '5_trefl.png', type: 'trefl', number: 5},
                {id: 19, name: 'Szóstka Kier', picture: '6_kier.png', type: 'kier', number: 6},
                {id: 33, name: 'Siódemka Trefl', picture: '7_trefl.png', type: 'trefl', number: 7},
            ]
        }
    ];

    const leftCards = [
        {id: 5, name: 'Piątka Pik', picture: '5_pik.png', type: 'pik', number: 5},
        {id: 6, name: 'Szóstka Pik', picture: '6_pik.png', type: 'pik', number: 6},
        {id: 7, name: 'Siódemka Pik', picture: '7_pik.png', type: 'pik', number: 7},
        {id: 8, name: 'Ósemka Pik', picture: '8_pik.png', type: 'pik', number: 8},
        {id: 9, name: 'Dziewiątka Pik', picture: '9_pik.png', type: 'pik', number: 9},
        {id: 10, name: 'Dziesiątka Pik', picture: '10_pik.png', type: 'pik', number: 10},
    ];

    testIfComputerPlayerCardsWillNotBeExchanged(players, leftCards, 'testIfComputerPlayerStraightCardsWillNotBeExchanged');
}

function testIfThreeOfAKindCanBeRecognised()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 3, name: 'Trójka Pik', picture: '3_pik.png', type: 'pik', number: 3},
        {id: 16, name: 'Trójka Kier', picture: '3_kier.png', type: 'kier', number: 3},
        {id: 29, name: 'Trójka Trefl', picture: '3_trefl.png', type: 'trefl', number: 3},
        {id: 19, name: 'Szóstka Kier', picture: '6_kier.png', type: 'kier', number: 6},
        {id: 33, name: 'Siódemka Trefl', picture: '7_trefl.png', type: 'trefl', number: 7},
    ]};

    let result = isHandThreeOfAKind(player);

    if (!result) console.error('Function testIfThreeOfAKindCanBeRecognised does not recognise three of a kind');
    else console.info('testIfThreeOfAKindCanBeRecognised passed');
}

function testIfIsHandThreeOfAKindRejectsOtherHands()
{
    let player = {id: 1, type: 'computer', cards: [
        {id: 48, name: 'Dziewiątka Karo', picture: '9_karo.png', type: 'karo', number: 9},
        {id: 26, name: 'Król Kier', picture: 'king_kier.png', type: 'kier', number: 13},
        {id: 9, name: 'Dziewiątka Pik', picture: '9_pik.png', type: 'pik', number: 9},
        {id: 35, name: 'Dziewiątka Trefl', picture: '9_trefl.png', type: 'trefl', number: 9},
        {id: 52, name: 'Król Karo', picture: 'king_karo.png', type: 'karo', number: 13}
    ]};

    let result = isHandThreeOfAKind(player);

    if (result) console.error('Function testIfIsHandThreeOfAKindRejectsOtherHands recognises full house as a three of a kind');
    else console.info('testIfIsHandThreeOfAKindRejectsOtherHands passed');
}

function testIfComputerPlayerThreeOfAKindCardsWillBeExchanged()
{
    let players = [
        {
            id: 1,
            type: 'computer',
            cards: [
                {id: 3, name: 'Trójka Pik', picture: '3_pik.png', type: 'pik', number: 3},
                {id: 16, name: 'Trójka Kier', picture: '3_kier.png', type: 'kier', number: 3},
                {id: 29, name: 'Trójka Trefl', picture: '3_trefl.png', type: 'trefl', number: 3},
                {id: 19, name: 'Szóstka Kier', picture: '6_kier.png', type: 'kier', number: 6},
                {id: 33, name: 'Siódemka Trefl', picture: '7_trefl.png', type: 'trefl', number: 7},
            ]
        }
    ];

    const leftCards = [
        {id: 5, name: 'Piątka Pik', picture: '5_pik.png', type: 'pik', number: 5},
        {id: 6, name: 'Szóstka Pik', picture: '6_pik.png', type: 'pik', number: 6}
    ];

    testIfComputerCardsWillBeExchanged(players, leftCards, 'testIfComputerPlayerThreeOfAKindCardsWillBeExchanged', 2, [4, 5]);
}

function runTests()
{
    testIfIsHandRoyalFlushRecognisesRoyalFlush();
    testIfIsHandRoyalFlushRejectsOtherHands();
    testIfIsHandRoyalFlushRejectsStraightFlush();
    testIfComputerPlayerRoyalFlushCardsWillNotBeExchanged();
    testIfStraightFlushWillBeRecognised();
    testIfIsHandStraightFlushWillRejectSthElse();
    testIfComputerPlayerStraightFlushCardsWillNotBeExchanged();
    testIfFourOfAKindCanBeRecognised();
    testIfIsFourOfAKindRejectsOtherHand();
    testIfComputerPlayerFourOfAKindCardsWillNotBeExchanged();
    testIfFullHouseCanBeRecognised();
    testIfIsHandFullHouseRejectsOtherHands();
    testIfComputerPlayerFullHouseCardsWillNotBeExchanged();
    testIfFlushCanBeRecognised();
    testIfIsHandFlushRejectsOtherHands();
    testIfComputerPlayerFlushCardsWillNotBeExchanged();
    testIfStraightCanBeRecognised();
    testIfIsHandStraightRejectsOtherHands();
    testIfComputerPlayerStraightCardsWillNotBeExchanged();
    testIfThreeOfAKindCanBeRecognised();
    testIfIsHandThreeOfAKindRejectsOtherHands();
    testIfComputerPlayerThreeOfAKindCardsWillBeExchanged();
}

runTests();