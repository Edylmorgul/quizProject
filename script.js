class Question{
    constructor(text, choices, answer){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    // Si choix utilisateur est la bonne réponse
    isCorrectAnswer(choice){
        return this.answer === choice;
    }
}

let questions = [
    new Question("Quel célèbre dictateur dirigea l'URSS du milieu des années 1920 à 1953 ?", 
    ["Molotov", "Staline", "Trotski", "Lénine"],"Staline"),
    new Question("Dans quel pays peut-on trouver la Catalogne, l'Andalousie et la Castille ?", 
    ["Espagne", "Portugal", "Italie", "France"],"Espagne"),
    new Question("Qui a dit : << Le sort en est jeté>> (Alea jacta est) ?", 
    ["Attila", "César", "Auguste", "Vercingétorix"],"César"),
    new Question("Dans quelle ville italienne l'action de la pièce << Roméo et Juliette >> se situe-t-elle ?", 
    ["Milan", "Venise", "Vérone", "Rome"],"Vérone"),
    new Question("Par quel mot désigne-t-on une belle-mère cruelle ?", 
    ["Marâtre", "Jocrisse", "Godiche", "Chenapan"],"Marâtre"),
    new Question("Qui était le dieu de la guerre dans la mythologie grecque ?", 
    ["Hadès", "Hermès", "Arès", "Chenapan"],"Arès"),
    new Question("Parmi les animaux suivants, lequel peut se déplacer le plus rapidement ?", 
    ["Léopard", "Chevreuil", "Mgbobe", "Springbok"],"Springbok"),
    new Question("A quel écrivain attribue-t-on la rédaction de l'Illiade et l'Odyssée ?", 
    ["Virgile", "Homère", "Euripide", "Sophocle"],"Homère"),
    new Question("Quand eu lieu la bataille de Gaugamèles durant les guerres médiques ?", 
    ["1er octobre 331 AV.J-C", "5 octobre 331 AV.J-C", "28 décembre 332 AV.J-C", "N'a jamais eu lieu"],"1er octobre 331 AV.J-C"),
    new Question("Qui était Darius 3 durant les guerre médiques ?", 
    ["Roi grecque", "Roi de l'empire perse achéménide", "N'a jamais existé", "Roi d'espagne"],"Roi de l'empire perse achéménide"),
    new Question("Le drapeau russe est blanc et ... ?", 
    ["Rouge", "Jaune", "Vert", "Noir"],"Rouge")
];

class Quiz {
    constructor(questions){
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0; // Index de la question courante ==> On démarre à 0
    }

    // Afficher sur écran question actuelle
    getCurrentQuestion(){
        return this.questions[this.currentQuestionIndex];
    }

    // Vérifier réponse utilisateur
    guess(answer){
        // Si ok ==> On augmente le score
        if(this.getCurrentQuestion().isCorrectAnswer(answer)){
            this.score++;
        }
        this.currentQuestionIndex++; // On avance question suivante
    }

    // Jeu fini
    hasEnded(){
        return this.currentQuestionIndex >= this.questions.length;
    }
}

// Regroup all functions relative to the app display ==> Tableau de fonctions
const display = {
    elementShown: function(id, text){
        let element = document.getElementById(id);
        element.innerHTML = text;
    },
    endQuiz: function(){
        let endQuizHTML = `
            <h1> Quiz terminé ! </h1>
            <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
        this.elementShown("question", endQuizHTML);
    },
    question: function(){
        this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
        let choices = quiz.getCurrentQuestion().choices;
    
        guessHandler = (id, guess) => {
          document.getElementById(id).onclick = function() {
            quiz.guess(guess);
            quizApp();
          }
        }
        // display choices and handle guess
        for(let i = 0; i < choices.length; i++) {
          this.elementShown("choice" + i, choices[i]);
          guessHandler("guess" + i, choices[i]);
        }
    },
    progress: function(){
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
};

// Game logic
quizApp = () => { // Fontion fléchée
    if(quiz.hasEnded()){
        // END
        display.endQuiz();
    }
    else{
        // LOGIC ==> Question, choice, progress
        display.question();
        display.choices();
        display.progress();
    }
}

// Create quiz
let quiz = new Quiz(questions) // On lui passe en param le tableau de questions

// Démarrer logique de jeu ==> Start
quizApp();
