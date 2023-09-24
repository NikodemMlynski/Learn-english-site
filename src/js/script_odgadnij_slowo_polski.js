window.onload = function(){
    quiz_guess_word_english.init();
}

class Quiz_guess_word_english {
    arrays = {
        basics: [
            {p: "tak", e: "yes"},
            {p: "Dzień dobry(rano)", e: "Good morning"},
            {p: "Dowidzenia", e: "Goodbye"},
            {p: "Dobry wieczór", e: "Good evening"},
            {p: "przepraszam", e: "sorry"},
            {p: "Mówisz po angielsku", e: "do you speak english"},
            {p: "Jak masz na imię", e: "What is your name"},
            {p: "Mam na imię", e: "My name is"},
            {p: "Skąd jesteś", e: "Where are you from"},
            {p: "Jestem z Polski", e: "I am from Poland"},
            {p: "Która godzina", e: "What time is it"},
            {p: "nie", e: "no"},
            {p: "Cześć", e: "Hello"},
            {p: "Do zobaczenia", e: "See you"},
            {p: "płatny", e: "paid"},
            {p: "bezpłatny", e: "free"},
            {p: "wejście", e: "entrance"},
            {p: "otwarte", e: "open"},
            {p: "zamknięte", e: "closed"},
            {p: "Lubię to", e: "I like it"},
            {p: "oczywiście", e: "of course"},
            {p: "byc", e: "be"},
        ],
        simple_conversations: [
            {p: "Czy mogę wejść", e: "May I enter"},
            {p: "Jutro", e: "tomorrow"},
            {p: "Do jutra", e: "See you tomorrow"},
            {p: "Do wieczora", e: "See you in the evening"},
            {p: "Do zobaczenia wkrótce", e: "See you soon"},
            {p: "Gratulacie", e: "Congratulations"},
            {p: "Nie odpowiada mi", e: "I don't like it"},
            {p: "Nieważne", e: "It doesn't matter"},
            {p: "Nie rozumiem", e: "I don't understand"},
            {p: "Jestem przeciw", e: "I'm against it"},
            {p: "Nie martw się", e: "Don't be afraid"},
            {p: "Nie ma za co", e: "Not at all"},
            {p: "Proszę", e: "Please"},
            {p: "Całuski", e: "Kisses"},
            {p: "Uściski", e: "Hugs"},
            {p: "Z przyjemnością", e: "With pleasure"},
            {p: "Hej", e: "Hi"},
            {p: "No co ty", e: "No way"},
            {p: "Pada deszcz", e: "It's raining"},
            {p: "pada śnieg", e: "It's snowing"},
            {p: "grad", e: "hail"},
            {p: "wiatr", e: "wind"},
        ],
        family: [
            {p: "rodzina", e: "family"},
            {p: "rodzice", e: "parents"},
            {p: "matka", e: "mother"},
            {p: "ojciec", e: "father"},
            {p: "mama", e: "mum"},
            {p: "tata", e: "dad"},
            {p: "dziadkowie", e: "grandparents"},
            {p: "babcia", e: "grandmother"},
            {p: "dziadek", e: "grandfather"},
            {p: "ciocia", e: "aunt"},
            {p: "wujek", e: "uncle"},
            {p: "dziecko", e: "child"},
            {p: "dzieci", e: "children"},
            {p: "córka", e: "daughter"},
            {p: "syn", e: "son"},
            {p: "brat", e: "brother"},
            {p: "siostra", e: "sister"},
            {p: "małżeństwo", e: "marriage"},
            {p: "mąż", e: "husband"},
            {p: "żona", e: "wife"},
            {p: "wnuk", e: "grandson"},
            {p: "wnuczka", e: "granddaughter"},
        ]
    }
    
    
    number_of_words_to_guess = 10;
    correct_answer_num = null;
    correct_answer_num_value = 0;
    question_index = null;
    question_index_value = 0;
    main_display_word_to_guess = null;
    main_guess_word_form = null;
    main_guess_word_test_input = null;
    random_words = [];
    main_test_buttons = null;
    init(){

        this.main_display_word_to_guess = document.querySelector("#main_display_word_to_guess");
        this.main_guess_word_form = document.querySelector("#test_odgadnij_slowo_angielski_form");
        this.main_guess_word_test_input = document.querySelector("#main_guess_word_test_input");
        this.question_index = document.querySelector("#main_guess_word_index");
        this.correct_answer_num = document.querySelector("#main_guess_word_correct_answers_value");
        this.main_test_buttons = document.querySelectorAll(".main_test_buttons");
        this.main_test_buttons.forEach(el => {
                el.addEventListener("click", () => {
                    this.setWordsList(el.getAttribute("data-lists"))
                    this.actualizeData( document.querySelector("#word_list_length"),this.number_of_words_to_guess);
        });
                

        });


        this.main_guess_word_form.addEventListener("submit", (e) => {
            e.preventDefault();
            if(this.main_guess_word_test_input.value.length > 0) this.checkAnswer(this.main_guess_word_test_input);

        });
    }
    setWordsList(data_lists){
        this.main_display_word_to_guess.style.color = "white";
        this.main_guess_word_test_input.value = "";
        this.random_words = [];
        for(let i = 0; i < this.number_of_words_to_guess; i++){
            this.random_words.push(this.arrays[data_lists][Math.floor(Math.random() * 21)]);
        }

        this.actualizeData(this.main_display_word_to_guess, this.random_words[this.question_index_value].e);
        console.log(this.random_words);
        console.log(this.question_index_value);
        document.querySelector("#word_list_length").innerHTML = this.random_words.length;
    }
    last_call = true;
    checkAnswer(input){
        
        const guessed_word = input.value.trim();
        if(guessed_word.toLowerCase() == this.random_words[this.question_index_value].p.toLowerCase()){
            this.correct_answer_num_value++;
        }
        if(this.question_index_value < this.random_words.length - 1){
            this.question_index_value++;
        }else{
            if(this.last_call){
                this.last_call = false;
                this.actualizeData(this.correct_answer_num, this.correct_answer_num_value);
                if(this.correct_answer_num_value / this.question_index_value >= 0.8){
                    this.main_display_word_to_guess.style.color = "green";
                }else if(this.correct_answer_num_value / this.question_index_value >= 0.5){
                    this.main_display_word_to_guess.style.color = "yellow";
                }else{
                    this.main_display_word_to_guess.style.color = "red";
                }
                this.actualizeData(this.main_display_word_to_guess, `Twój wynik ${this.correct_answer_num_value}/${this.question_index_value + 1}`);
                return;
            }else{
                return;
            }
            
        }
        console.log("index: ", this.question_index_value);
        
        input.value = "";
        this.actualizeData(this.question_index, this.question_index_value + 1);
        this.actualizeData(this.correct_answer_num, this.correct_answer_num_value);
        this.actualizeData(this.main_display_word_to_guess, this.random_words[this.question_index_value].e);  
    }
    actualizeData(data, value){
        data.innerHTML = value;
    }
}
const quiz_guess_word_english = new Quiz_guess_word_english();