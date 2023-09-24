window.onload = function(){
    wordToLearn.init();
}

class WordToLearn {
    words = [
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
    ];
    main_word_to_learn = null;
    arrow_left = null;
    arrow_right = null;
    main_word_index = null;
    main_word_index_value = 0;
    main_word_to_learn_to_change = null;
    
    init(){
        this.main_word_to_learn = document.querySelector("#main_word_to_learn");
        this.arrow_left = document.querySelector("#arrow_left");
        this.arrow_right = document.querySelector("#arrow_right");
        this.main_word_index = document.querySelector("#main_word_index");
        this.main_word_to_learn_to_change = document.querySelector("#main_word_to_learn_to_change");

        this.main_word_to_learn.addEventListener("click", () => this.switchWord(this.main_word_to_learn_to_change));
        this.arrow_right.addEventListener("click", () => this.nextWord(this.main_word_to_learn_to_change, this.main_word_index));
        this.arrow_left.addEventListener("click", () => this.previousWord(this.main_word_to_learn_to_change, this.main_word_index));

        

    }
    switchWord(word){
        if(word.innerHTML == this.words[this.main_word_index_value].p){
            word.innerHTML = this.words[this.main_word_index_value].e;
        }else{
           word.innerHTML =  this.words[this.main_word_index_value].p
        }
        
    }
    nextWord(word, index){
        if(this.main_word_index_value <= this.words.length){
            this.main_word_index_value++;
            word.innerHTML = this.words[this.main_word_index_value].p;
            index.innerHTML = this.main_word_index_value + 1;
        }
    }
    previousWord(word, index){
        if(this.main_word_index_value > 0){
            this.main_word_index_value--;
            word.innerHTML = this.words[this.main_word_index_value].p;
            index.innerHTML = this.main_word_index_value + 1;
        }
    }
    
}
const wordToLearn = new WordToLearn();