24-game
=============

Finds solutions to the [24 Card Game](http://en.wikipedia.org/wiki/24_Game).

24 is a card game where you pick 4 cards from a deck and then using arithmetic operations to try and make them equal to 24.
We play that number cards are their value and all face cards are 1.

For example if you drew the cards 3,3,3,8
one can make this sum to 24 by using the following set of operations (3*8) + (3-3).

I decided to write this program after playing the game and being dealt 8, Jack, 7, 6 (or 8,1,7,6), and not
being able to find a solution. So I wrote a program to try and find one, and no, there does not appear to be a solution for 8, Jack, 7, 6.

### Get Started

 * install [nvm](https://github.com/creationix/nvm)

#### And then

    > nvm install v0.8.11
    > nvm use v0.8.11
    > npm install -g mocha
    > mocha
   
### Notes

There is currently no graphical nor console based user interface. The API is only exercised through mocha tests.

The program works by generating all possible permutations of the input in postfix notation, then feeding those to an
evaluator to see if they sum to 24.

For an input of 1,1,1,1 the program does prune out exact duplicates (IE the order of 1s doesn't matter) so we
have 320 orderings to verify. But for an input of 1 2 3 4 we have 7680 orderings to try.

This number could be greatly pruned of some of the more obviously equivalent orderings to make this program more efficient.
For example 3 2 + 8 8 + + and 2 3 + 8 8 + + are equivalent via commutativity and 3 3 + 8 8 + + and 3 3 8 8 + + + are
equivalent via associativity. As well there is a lot of domain knowledge that could be taken advantage of. For example with a
hand of 1,1,1,1 we know the numbers are too small to ever equal 24.