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
    let testPassed = true;

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

    if (!testPassed) console.error('Function testIfComputerPlayerRoyalFlushCardsWillNotBeExchanged exchanges cards');
    else console.info('testIfComputerPlayerRoyalFlushCardsWillNotBeExchanged passed');
}

function runTests()
{
    testIfIsHandRoyalFlushRecognisesRoyalFlush();
    testIfIsHandRoyalFlushRejectsOtherHands();
    testIfIsHandRoyalFlushRejectsStraightFlush();
    testIfComputerPlayerRoyalFlushCardsWillNotBeExchanged();
}

runTests();