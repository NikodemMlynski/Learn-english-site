window.onload = function(){
    quiz.init();
};
class Quiz {
    questions = [
        {q: "Dzień dobry(rano)", answers: ["Goodbye", "Hello", "Good morning"], correctAnswerNum: 2},
        {q: "Dowidzenia", answers: ["Good evening", "Goodbye", "no"], correctAnswerNum: 1},
        {q: "Dobry wieczór", answers: ["Good evening", "Good morning", "Congratulations"], correctAnswerNum: 0},
        {q: "przepraszam", answers: ["yes", "good luck", "sorry"], correctAnswerNum: 2},
        {q: "Mówisz po angielsku", answers: ["Do you speak english", "How do you do", "Congratulations"], correctAnswerNum: 0},
        {q: "Jak masz na imię", answers: ["My name is", "What is your name", "Goodbye"], correctAnswerNum: 1},
        {q: "Mam na imię", answers: ["My name is", "Nowy Jork", "Chicago"], correctAnswerNum: 0},
        {q: "Skąd jesteś", answers: ["be", "Where are you from", "of course"], correctAnswerNum: 1},
        {q: "Jestem z Polski", answers: ["I like it", "Where are you from", "I am from Poland"], correctAnswerNum: 2},
        {q: "Która godzina", answers: ["of course", "free", "What time is it"], correctAnswerNum: 2},
        {q: "nie", answers: ["yes", "no", "sorry"], correctAnswerNum: 1},
        {q: "Cześć", answers: ["hello", "hi", "See you"], correctAnswerNum: 0},
        {q: "Do zobaczenia", answers: ["paid", "See you", "free"], correctAnswerNum: 1},
        {q: "płatny", answers: ["of course", "free", "paid"], correctAnswerNum: 2},
        {q: "bezpłatny", answers: ["entrance", "free", "Good morning"], correctAnswerNum: 1},
        {q: "wejście", answers: ["Hello", "entrance", "exit"], correctAnswerNum: 1},
        {q: "otwarte", answers: ["open", "closed", "entrance"], correctAnswerNum: 0},
        {q: "zamknięte", answers: ["entrance", "closed", "I like it"], correctAnswerNum: 1},
        {q: "Lubię to", answers: ["no", "free", "I like it"], correctAnswerNum: 2},
        {q: "oczywiście", answers: ["be", "What time is it", "of course"], correctAnswerNum: 2},
        {q: "być", answers: ["be", "closed", "sorry"], correctAnswerNum: 0},
    ];
   
    answer1 = null;
    answer2 = null;
    answer3 = null;
    answer1_text = null;
    answer2_text = null;
    answer3_text = null;

    test_wybierz_slowo_form = null;
    main_choose_word_index = null;
    main_choose_word_correct_answers_value = null;

    word_list_length = 5;
    main_display_word_to_guess = null;

    random_words_list = [];

    user_selected_input = null;
    correct_answer_num = null;
    current_question_index = -1;
    user_correct_answers = 0;

    init(){
        this.answer1 = document.querySelector("#answer1");
        this.answer2 = document.querySelector("#answer2");
        this.answer3 = document.querySelector("#answer3");
        this.answer1_text = document.querySelector("#answer1_text");
        this.answer2_text = document.querySelector("#answer2_text");
        this.answer3_text = document.querySelector("#answer3_text");
        this.test_wybierz_slowo_form = document.querySelector("#test_wybierz_slowo_form");
        this.main_display_word_to_guess = document.querySelector("#main_display_word_to_guess");
        this.fillWordList();

        this.setNextQuestionData();
        this.test_wybierz_slowo_form.addEventListener("submit", (e) =>{
            e.preventDefault();
            this.checkAnswer();
        })
        


    }
    fillWordList(){
        document.querySelector("#word_list_length").innerHTML = this.word_list_length;
        document.querySelector(".main_answer_buttons").style.visibility = "visible";
        document.querySelector("#test_wybierz_slowo_form_submit_button").style.visibility = "visible";
        for(let i = 0; i< this.word_list_length; i++){
            this.random_words_list.push(this.questions[Math.floor(Math.random() * 21)]);
        }
        console.log(this.random_words_list);
        this.main_display_word_to_guess.innerHTML = this.random_words_list[0].q;
        this.answer1_text.innerHTML = this.random_words_list[0].answers[0];
        this.answer2_text.innerHTML = this.random_words_list[0].answers[1];
        this.answer3_text.innerHTML = this.random_words_list[0].answers[2];
    }
    checkAnswer(){
        this.user_selected_input = document.querySelector("input[type='radio']:checked");
        if(!this.user_selected_input) return;

        const selectedIndex = this.user_selected_input.getAttribute("data-index");
        if(selectedIndex == this.correct_answer_num){
            //prawidłowa odpowiedź
            this.user_correct_answers++;
        }
        this.setUserStats();
        this.setNextQuestionData();


    }
    setUserStats = () =>{
        document.querySelector("#main_choose_word_correct_answers_value").innerHTML = this.user_correct_answers;
    }
    setNextQuestionData(){
        this.current_question_index++;
        document.querySelector("#main_choose_word_index").innerHTML = this.current_question_index;

        if(this.current_question_index >= this.random_words_list.length){
            console.log("Koniec quizu");
            this.restartQuiz();
            return;
        }

        const question = this.random_words_list[this.current_question_index];
        this.main_display_word_to_guess.innerHTML = question.q;
        this.answer1_text.innerHTML = question.answers[0];
        this.answer2_text.innerHTML = question.answers[1];
        this.answer3_text.innerHTML = question.answers[2];
        this.correct_answer_num = question.correctAnswerNum;
        document.querySelectorAll("input[type='radio']").forEach((el) => {
            el.checked = false;
        });

    }
    restartQuiz = () =>{
        this.current_question_index = -1;
        this.correct_answer_num = 0;
        this.setNextQuestionData();
        document.querySelector(".main_answer_buttons").style.visibility = "hidden";
        document.querySelector("#test_wybierz_slowo_form_submit_button").style.visibility = "hidden";
        if(this.user_correct_answers / this.word_list_length >= 0.8){
            this.main_display_word_to_guess.style.color = "green";
        }else if(this.user_correct_answers / this.word_list_length >= 0.5){
            this.main_display_word_to_guess.style.color = "yellow";
        }else{
            this.main_display_word_to_guess.style.color = "red";
        }
        this.main_display_word_to_guess.innerHTML = `Twój wynik ${this.user_correct_answers}/${this.word_list_length}`;
    }

    
    
    
}
const quiz = new Quiz();