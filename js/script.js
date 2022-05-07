(function() {
    /**
     * Declaration de toutes les variables
     * */
    // Récupération des cases à clicker
    const items = document.getElementsByClassName('grid-item');
    const reset = document.getElementById('reset');
    const youScore = document.getElementsByClassName('you-score');
    const cpuScore = document.getElementsByClassName('cpu-score');
    const winnerText = document.getElementById('winner');
    const winPosList = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
    var playerMove = [];
    var botMove = [];
    var playerScore;
    var botScore;
    var avatar;
    var botAvatar;
    var isHumanTour = true;

    /**
     * Declaration de toutes les fonctions
     * */
    function choiseCase(id, el, playerName) {
        document.getElementById(id).innerText = el;
        let num = parseInt(id.slice(-1));
        if (playerName == 'human') {
            playerMove.push(num);
            console.log(playerMove, botMove);
        } else {
            botMove.push(num);
            console.log(playerMove, botMove);
        }
    }

    function initAvatar(){
        avatar = 'X';
        botAvatar = 'O';
    }

    function initScore(){
        playerScore = 0;
        botScore = 0;
    }

    function initMove(){
        playerMove = [];
        botMove = [];
    }

    function addScore(playerName){
        if (playerName == 'human') {
            playerScore ++;
            youScore.innerText = playerScore;
        } else {
            cpuScore ++;
            botScore.innerText = cpuScore;
        }
    }

    function isWinner(playerMoveList){
        let temp = 0;
        for (let i = 0; i < winPosList.length; i++) {
            for (let j = 0; j < playerMoveList.length; j++) {
                if(winPosList[i].includes(playerMoveList[j])){
                    temp++;
                    if (temp == 3) {
                        return true;
                    }
                }
            }
            temp = 0;
        }
        return false;
    }

    function chooseAvatar(){
        let person = confirm("Voulez vous choisir comme avatar X?");
        let temp = '';
        if (person != true){
            temp = avatar;
            avatar = botAvatar;
            botAvatar = temp;
        } else {
            initAvatar();
        }
    }

    function clearBoard(){
        for (var i = 0; i < items.length; i++) {
            items[i].textContent = ''
        }
    }

    // Vidé le contenu de toute les cases
    function resetBoard() {
        clearBoard();
        initScore();
        initMove();
        chooseAvatar();
    }

    function replay(phrase){
        if(confirm(phrase)){
            initMove();
            clearBoard();
        } else {
            resetBoard();
        }
    }

    // Verifier si la place choisit est libre
    function isEmpty(place){
        if (place.innerText == '') {
            return true;
        }
        return false;
    }

    //Verifier si le jeux est terminer
    // On a deux cas:
    // 1er cas match nulle
    function isBoardFull(){
        let len = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].innerText == '') {
                len++;
            }
        }
        if(len == 0){
            return true;
        }
        return false;
    }
    
    /**
     * Execution de toutes fonctions
     * */
    resetBoard();
    reset.addEventListener('click', resetBoard);

    for (let i = 0; i < items.length; i++){
        items[i].addEventListener(
            'click', 
            () => {
                if (!isBoardFull()) {
                    
                    if(isHumanTour){
                        let placeId = document.getElementById(items[i].id);
                        if (isEmpty(placeId)) {
                            choiseCase(items[i].id, avatar, 'human');
                            //Vérifier si l'humain a gagner
                            if (isWinner(playerMove)) {
                                addScore('human');
                                replay('Bravo vous avez gagné, Voulez-vous rejouez?');
                            }
                            //passer le tour à l'ordi
                            isHumanTour = !isHumanTour;
                        }
                    }
                    //fonction qui attend l'humain clicker sur une case
                    //Ce fonction ne doit pas s'executer que si c'est tour de l'humain
                    if (!isHumanTour){// sinon c'est le tour de l'ordinateur
                        let botId = '';
                        if (!isBoardFull()) {
                            do {//random integer entre 0 à 8
                                let id = Math.floor(Math.random()*9) + 1;
                                botId = 'item' + id;
                                if (isEmpty(document.getElementById(botId))) {
                                    break;
                                }
                            } while (true);
                            choiseCase(botId, botAvatar, 'bot');
                            if (isWinner(botMove)) {
                                addScore('bot');
                                replay('Oups le bot a gagné, Voulez-vous rejouez?');
                            }
                            isHumanTour = !isHumanTour;
                        }
                    }
                } else {
                    alert('Le jeux est terminer!');
                }
            }
        );
    }
})();