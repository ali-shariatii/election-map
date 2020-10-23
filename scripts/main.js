class Politician {
    constructor(name, partyColor) {
        this.name = name;
        this.partyColor = partyColor;
        this.stateResults = this.resultGenerator();
        this.totalVotes = this.totalVotesCalculator(this.stateResults);
    }
    /* For the sake of this practice, the election results are randomly generated between 1 - 3500000
    and are pushed to an array.
    The 51 states of USA are ordered alphabetically and are represented by each index:
    [0] as Alabama, [1] as Alaska, ..., [50] as Wyoming. */
    resultGenerator() {
        let resultArray = [];
        for (let i = 0; i <= 50; i++) {
            resultArray[i] = Math.round(Math.random() * (3500000 - 1) + 1);
        }
        return resultArray;
    }
    totalVotesCalculator(input) {
        let total = 0;
        for (let i = 0; i < input.length; i++) {
            total += input[i];
            if (i === input.length - 1) {
                return total;
            }
        }
    }
}

// The two candidates are created with one argument using the above constructor.
let blueCandidate = new Politician("Joe Biden", [5, 118, 224]),
    redCandidate = new Politician("Donald Trump", [211, 54, 6]);

// Some of the states have miscounted the results. The new results are assigned (Numbers are generated randomly, even the index numbers.):
blueCandidate.stateResults[ Math.round( Math.random() * 50 ) ] = Math.floor( Math.random() * (10000000 - 1) + 1 );
blueCandidate.stateResults[ Math.round( Math.random() * 50 ) ] = Math.ceil( Math.random() * (10000000 - 1) + 1 );
blueCandidate.stateResults[ Math.round( Math.random() * 50 ) ] = Math.floor( Math.random() * (10000000 - 1) + 1 );
redCandidate.stateResults[ Math.round( Math.random() * 50 ) ] = Math.ceil( Math.random() * (10000000 - 1) + 1 );
redCandidate.stateResults[ Math.round( Math.random() * 50 ) ] = Math.floor( Math.random() * (10000000 - 1) + 1 );
redCandidate.stateResults[ Math.round( Math.random() * 50 ) ] = Math.ceil( Math.random() * (10000000 - 1) + 1 );

// Comparing the two candidates and declaring the winner and the total votes
document.getElementById("blueTotalVotes").innerText = blueCandidate.totalVotes.toLocaleString();
document.getElementById("redTotalVotes").innerText = redCandidate.totalVotes.toLocaleString();

let electionWinnerName = document.getElementById("electionWinnerName");

((input) => {
    switch(true) {
        case (blueCandidate.totalVotes > redCandidate.totalVotes) :
            input.innerText = blueCandidate.name;
            break;
        case (blueCandidate.totalVotes < redCandidate.totalVotes) :
            input.innerText = redCandidate.name;
            break;
        default :
            input.innerText = "Draw Election";
    }
})(electionWinnerName);

//declareElectionWinner(electionWinnerName);

/* The purpose is to change each state color to the winner's party color on mouse over.
So I needed to get access to the background color of each state object.
Next stage was to use DOM to display state results on mouseover. */
let setStateResults = (state) => {
    if (blueCandidate.stateResults[state] > redCandidate.stateResults[0]) {
        theStates[state].winner = blueCandidate;
    }else if(blueCandidate.stateResults[state] < redCandidate.stateResults[0]) {
        theStates[state].winner = redCandidate;
    }

    let stateWinner = theStates[state].winner,
        stateResults = document.getElementById("stateResults"),
        tHead = stateResults.children[0],
        tBody = stateResults.children[1];

    if (stateWinner !== null) {
        theStates[state].rgbColor = stateWinner.partyColor;
        tBody.children[2].children[1].innerText = "Draw";
    }else{
        theStates[state].rgbColor = [11, 32, 57];
    }

    tHead.children[0].children[0].innerText = theStates[state].nameFull;
    tHead.children[0].children[1].innerText = theStates[state].nameAbbrev;
    tBody.children[0].children[1].innerText = blueCandidate.stateResults[state].toLocaleString();
    tBody.children[1].children[1].innerText = redCandidate.stateResults[state].toLocaleString();
    tBody.children[2].children[1].innerText = stateWinner.name;
};

setStateResults();


