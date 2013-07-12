//Container
pontoon = function() {

    var dcardsButton = document.getElementById('dcards');
    var pcardsButton = document.getElementById('pcards');
    var twistButton = document.getElementById('twist');
    var stickButton = document.getElementById('stick');

    twistButton.addEventListener('click', twist(), false);
    stickButton.addEventListener('click', stick(), false);

    // Card Constructor
    function Card(s, n) {
        var suit = s;
        var number = n;

        //Getters
        this.getSuit = function() {
            return suit;
        };
        this.getNumber = function() {
            return number;
        };
        this.getValue = function() {
            var value;
            if (number > 9) {
                value = 10;
            } else if (number === 1) {
                value = 11;
            } else {
                value = number;
            }
            return value;
        };
    }

    //Extend Card to give it's own value in a string
    Card.prototype.getCard = function() {
        var suitName, cardName;

        switch (this.getSuit()) {
        case 1:
            suitName = "clubs";
            break;
        case 2:
            suitName = "diamonds";
            break;
        case 3:
            suitName = "hearts";
            break;
        case 4:
            suitName = "spades";
            break;
        default:
            suitName = "suitName error";
            break;
        }

        switch (this.getNumber()) {
        case 1:
            cardName = "ace";
            break;
        case 11:
            cardName = "jack";
            break;
        case 12:
            cardName = "queen";
            break;
        case 13:
            cardName = "king";
            break;
        default:
            cardName = String(this.getNumber());
            break;
        }

        return cardName + " of " + suitName;
    };

    // Deck Constructor
    function Deck(d) {

        //Number of values, number of suits, empty array to hold cards
        var nn = 13,
            ss = 4,
            Cards = [];

        //Create the cards;
        for (var i = d; i > 0; i--) {
            for (var j = ss; j > 0; j--) {
                for (var k = nn; k > 0; k--) {
                    Cards.push(new Card(j, k));
                }
            }
        }

        // Getter
        this.getCards = function() {
            return Cards;
        };

        //Shuffler
        this.shuffle = function() {
            for (var i = Cards.length - 1; i >= 0; i--) {
                var x = Math.floor(Math.random() * Cards.length);
                var a = Cards[i];
                Cards[i] = Cards[x];
                Cards[x] = a;
            }
        };

        // Dealing a Card, returns an array with the number of cards specified
        this.Deal = function(n) {
            var dealtCards = [];
            for (var i = n; i > 0; i--) {
                dealtCards.push(Cards.pop());
            }
            return dealtCards;
        };
    }

    // Hand Constructor from Deck s with n number of cards
    function Hand(s, n) {

        //Empty Hand
        var Cards = [];

        //Initial Deal
        Cards = Cards.concat(s.Deal(n));

        //Getter
        this.getHand = function() {
            return Cards;
        };

        //Adder
        this.addCards = function(c) {
            if(Array.isArray(c)) {
                Cards = Cards.concat(c);
            } else {
                console.log("You can't add that to a hand!");
            }
        };

        //Print Hand gives a string description of the hand
        this.printHand = function() {
            var cardList = "",
                i;

            for (i = Cards.length - 1; i >= 0; i--) {
                cardList = cardList + Cards[i].getCard() + ", ";
            }

            return cardList;
        };
    }

    //Extend Hand for Pontoon Scoring

    Hand.prototype.getScore = function() {
        //Empty Score, no aces, counters
        var cardTotal = 0, aces = 0, i, j;

        //Count Aces
        for (i = (this.getHand()).length; i--;) {
            if ((this.getHand())[i].getValue() === 11) {
                aces++;
            }
        }

        //Highest Score
        for (j = (this.getHand()).length; j--;) {
            cardTotal = cardTotal + (this.getHand())[j].getValue();
        }

        //Check for Blackjack
        if ((this.getHand()).length === 2 && cardTotal === 21) {
            return 100;
        }

        //Change Aces to One Until < 21
        while (aces > 0 && cardTotal > 21) {
            cardTotal = cardTotal - 10;
            aces--;
        }

        //Check if bust
        if (cardTotal > 21) {
            return 0;
        }

        //Check for 5 card trick
        if ((this.getHand()).length >= 5) {
            return 50;
        }

        //Return the score 
        return cardTotal;
    };

    //Extend hand for hitting from pack
    Hand.prototype.hitMe = function(s) {
        this.addCards(s.Deal(1));
        return (this.getHand());
    };

    var twist = function(argument) {
        // body...
    };

    var playAsDealer = function(s) {
        var myHand = new Hand(2);
        while (myHand.getScore <= 17) {
            myHand.hitMe(s);
        }
        return myHand;
    };

    var playAsUser = function(s) {
        if (myHand.getScore === 0) {
            return 0
        }
        if (myHand === undefined) {
            myHand = new Hand(s, 2);
        }
        pcards.innerHTML = "<p>" + myHand.printHand() + "</p>";
    };

        //This is old code from the tutorial
        /*while (decision === true) {
            decision = confirm("Your cards are " + myHand.printHand() + " Click 'OK' for another card, or 'Cancel' to stick");
            if (decision === true) {
                myHand.hitMe();
            } else {
                return myHand;
            }
        }*/

    this.playRound = function() {
    //Right, let's take some cards
    var stack = new Deck(1);
    stack.shuffle();
    stack.shuffle();

    //User goes first...
    playAsUser(stack);
    };

    //Let's go!
    playRound();
};




    //Tests
    /*
    var test0 = new Card (1, 1);
    console.log(test0.getSuit());

    var test1 = deal();
    console.log(test1.getSuit());

    var test2 = new Hand();
    console.log(test2.getScore());
    console.log(test2.printHand());

    Reference

    var card = document.createElement("div");
    card.innerHTML = "<img src=\"images/cards/back.png\">"
    */