window.onload = function(){
    lessons.init();
}
class Lessons {
    lessons = {
        basics: [
            {p: "tak", e: "yes", isKnown: false},
            {p: "Dzień dobry(rano)", e: "Good morning", isKnown: false},
            {p: "Dowidzenia", e: "Goodbye", isKnown: false},
            {p: "Dobry wieczór", e: "Good evening", isKnown: false},
            {p: "przepraszam", e: "sorry", isKnown: false},
            {p: "Mówisz po angielsku", e: "do you speak english", isKnown: false},
            {p: "Jak masz na imię", e: "What is your name", isKnown: false},
            {p: "Mam na imię", e: "My name is", isKnown: false},
            {p: "Skąd jesteś", e: "Where are you from", isKnown: false},
            {p: "Jestem z Polski", e: "I am from Poland", isKnown: false},
            {p: "Która godzina", e: "What time is it", isKnown: false},
            {p: "nie", e: "no", isKnown: false},
            {p: "Cześć", e: "Hello", isKnown: false},
            {p: "Do zobaczenia", e: "See you", isKnown: false},
            {p: "płatny", e: "paid", isKnown: false},
            {p: "bezpłatny", e: "free", isKnown: false},
            {p: "wejście", e: "entrance", isKnown: false},
            {p: "otwarte", e: "open", isKnown: false},
            {p: "zamknięte", e: "closed", isKnown: false},
            {p: "Lubię to", e: "I like it", isKnown: false},
            {p: "oczywiście", e: "of course", isKnown: false},
            {p: "być", e: "be", isKnown: false},
        ],
        simple_conversations: [
            {p: "Czy mogę wejść", e: "May I enter", isKnown: false},
            {p: "Jutro", e: "tomorrow", isKnown: false},
            {p: "Do jutra", e: "See you tomorrow", isKnown: false},
            {p: "Do wieczora", e: "See you in the evening", isKnown: false},
            {p: "Do zobaczenia wkrótce", e: "See you soon", isKnown: false},
            {p: "Gratulacie", e: "Congratulations", isKnown: false},
            {p: "Nie odpowiada mi", e: "I don't like it", isKnown: false},
            {p: "Nieważne", e: "It doesn't matter", isKnown: false},
            {p: "Nie rozumiem", e: "I dont understand", isKnown: false},
            {p: "Jestem przeciw", e: "I'm against it", isKnown: false},
            {p: "Nie martw się", e: "Don't be afraid", isKnown: false},
            {p: "Nie ma za co", e: "Not at all", isKnown: false},
            {p: "Proszę", e: "Please", isKnown: false},
            {p: "Całuski", e: "Kisses", isKnown: false},
            {p: "Uściski", e: "Hugs", isKnown: false},
            {p: "Z przyjemnością", e: "With pleasure", isKnown: false},
            {p: "Hej", e: "Hi", isKnown: false},
            {p: "No co ty", e: "No way", isKnown: false},
            {p: "Pada deszcz", e: "It's raining", isKnown: false},
            {p: "pada śnieg", e: "It's snowing", isKnown: false},
            {p: "grad", e: "hail", isKnown: false},
            {p: "wiatr", e: "wind", isKnown: false},
        ],
        family: [
            {p: "rodzina", e: "family", isKnown: false},
            {p: "rodzice", e: "parents", isKnown: false},
            {p: "matka", e: "mother", isKnown: false},
            {p: "ojciec", e: "father", isKnown: false},
            {p: "mama", e: "mum", isKnown: false},
            {p: "tata", e: "dad", isKnown: false},
            {p: "dziadkowie", e: "grandparents", isKnown: false},
            {p: "babcia", e: "grandmother", isKnown: false},
            {p: "dziadek", e: "grandfather", isKnown: false},
            {p: "ciocia", e: "aunt", isKnown: false},
            {p: "wujek", e: "uncle", isKnown: false},
            {p: "dziecko", e: "child", isKnown: false},
            {p: "dzieci", e: "children", isKnown: false},
            {p: "córka", e: "daughter", isKnown: false},
            {p: "syn", e: "son", isKnown: false},
            {p: "brat", e: "brother", isKnown: false},
            {p: "siostra", e: "sister", isKnown: false},
            {p: "małżeństwo", e: "marriage", isKnown: false},
            {p: "mąż", e: "husband", isKnown: false},
            {p: "żona", e: "wife", isKnown: false},
            {p: "wnuk", e: "grandson", isKnown: false},
            {p: "wnuczka", e: "granddaughter", isKnown: false},
        ]
    };
    lesson_word_index = -1;
    arrow_left = null;
    arrow_right = null;
    polish_word_html = null;
    english_word_html = null;
    lessons_name = null;
    know_word_btn = null;
    unknow_word_btn = null;


    
    word_curtain = null;
    init(){
        this.word_curtain = document.querySelector("#english_word_curtain");
        this.word_curtain.addEventListener("click", () => this.showTranslate());

        this.arrow_left = document.querySelector("#arrow_left");
        this.arrow_right = document.querySelector("#arrow_right");

        this.polish_word_html = document.querySelector("#polish_word");
        this.english_word_html = document.querySelector("#english_word");
        
        this.arrow_right.addEventListener("click", () => this.nextWord());
        this.arrow_left.addEventListener("click", () => this.previousWord());

        this.lessons_name = document.querySelectorAll(".submenu_item");
        this.lessons_name.forEach( (el) => {
            el.addEventListener("click", (e) => {
                this.lessons_name = e.target.getAttribute("data-lesson-name");
                this.lesson_word_index = 0;
                this.setWords();
            });
        });

        this.know_word_btn = document.querySelector("#known");
        this.unknow_word_btn = document.querySelector("#unknown");

        this.know_word_btn.addEventListener("click", (e) => this.setWordKnown(e));
        this.unknow_word_btn.addEventListener("click", (e) => this.setWordUnknown(e));
    }
    showTranslate(){
        this.word_curtain.style.display = "none";
    }
    setWords(){
        this.polish_word_html.innerHTML = this.lessons[this.lessons_name][0].p
        this.english_word_html.innerHTML = this.lessons[this.lessons_name][0].e
        this.checkKnown();
    }
    nextWord(){
        if(this.lesson_word_index < this.lessons[this.lessons_name].length - 1){
            this.lesson_word_index++;
            this.changeWord();
        }else return;
    }
    previousWord(){
        if(this.lesson_word_index > 0){
            this.lesson_word_index--;
            this.changeWord();
        }else return;
    }
    setWordKnown(e){
        if(this.lesson_word_index >= 0){
            this.lessons[this.lessons_name][this.lesson_word_index].isKnown = true;
            this.changeWord();
        }
    }
    setWordUnknown(e){
        if(this.lesson_word_index >= 0){
            this.lessons[this.lessons_name][this.lesson_word_index].isKnown = false;
            this.changeWord();
        }
        

    }
    changeWord(){
        this.polish_word_html.innerHTML = this.lessons[this.lessons_name][this.lesson_word_index].p;
        this.english_word_html.innerHTML = this.lessons[this.lessons_name][this.lesson_word_index].e;
        this.word_curtain.style.display = "block";
        this.checkKnown();
    }
    checkKnown(){
        if(this.lessons[this.lessons_name][this.lesson_word_index].isKnown == true){
            this.know_word_btn.classList.add("is_known_true");
            this.know_word_btn.classList.remove("is_known_false");
            this.unknow_word_btn.classList.add("is_known_false");
            this.unknow_word_btn.classList.remove("is_known_true");
        }else{
            this.know_word_btn.classList.remove("is_known_true");
            this.know_word_btn.classList.add("is_known_false");
            this.unknow_word_btn.classList.add("is_known_true");
            this.unknow_word_btn.classList.remove("is_known_false");
        }
    }
}
const lessons = new Lessons();