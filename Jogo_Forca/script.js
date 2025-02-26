// Array dos temas com suas palavras \\
const themes = {
    Animals:  ['cachorro', 'gato', 'tigre', 'cigarra', 'cobra'],
    Fruits:   ['melancia', 'uva', 'laranja', 'kiwi', 'acerola'],
    Countrys: ['brasil', 'alemanha', 'inglaterra', 'portugal', 'jamaica'],
    Persons:  ['neymar', 'samuel', 'gabriel', 'joao', 'chad']
};
// Variaveis iniciais \\
var is_game_start = false;
var theme = 0;
var selected_theme = '';
var selected_word = '';
var hidden_word = [];
var attempts = 6;
var guessed_letters = [];
const key1 = document.getElementById("themes-1");
const key2 = document.getElementById("themes-2");
const forca = document.querySelector(".img-forca");
// Iniciando o jogo \\
document.getElementById("start").addEventListener("click",start_game);
// Função de inicialização do jogo \\
function start_game(){
    if(is_game_start) return;
    document.getElementById("forca").src = "./Imagens/forca.png";
    document.getElementById("attempts").innerText = "Escolha o tema!";
    forca.classList.add("move-left");
    key1.style.display = "flex";
    key2.style.display = "flex";
    is_game_start = true;
}
// Array para escolha do tema \\
["theme1","theme2","theme3","theme4"].forEach((id, index) => {
    document.getElementById(id).addEventListener("click", () => {
        theme = index+1;
        hide_themes();
    });
});
// Função para desaparecer os temas e ele ser selecionado \\
function hide_themes() {
    key1.style.display = "none";
    key2.style.display = "none";
    select_theme(theme);
}
// Função para seleção de tema \\
function select_theme(theme_index){
    const theme_keys = Object.keys(themes);
    selected_theme = theme_keys[theme_index-1];
    selected_word = themes[selected_theme][Math.floor(Math.random()*themes[selected_theme].length)].toUpperCase();
    hidden_word = Array(selected_word.length).fill('_');
    attempts = 6;
    guessedLetters = [];
    console.log(selected_theme);
    console.log(selected_word);
    update_display();
}
// Função para atualização do jogo \\
function update_display(){
    document.getElementById("word-display").innerText = hidden_word.join(" ");
    if(attempts>0 && is_game_start){
        document.getElementById("attempts").innerText = `Tentativas restantes: ${attempts}`;
    }
    const imgPaths = [
        "./Imagens/forca6.gif", 
        "./Imagens/forca5.png", 
        "./Imagens/forca4.png",
        "./Imagens/forca3.png",
        "./Imagens/forca2.png", 
        "./Imagens/forca1.png",
        "./Imagens/forca.png"
    ];
    document.getElementById("forca").src = imgPaths[attempts];
}
// Função para checagem da letra \\
function check_letter(letter){
    if(guessed_letters.includes(letter) || attempts<=0) return;
    guessed_letters.push(letter);
    if(selected_word.includes(letter)){
        selected_word.split("").forEach((char, i) => {
            if (char===letter) hidden_word[i] = letter;
        });
    } 
    else{
        attempts--;
    }
    update_display();
    game_status();
}
// Função para verificar o status do jogo \\
function game_status(){
    if(!hidden_word.includes("_")){
        update_display();
        document.getElementById("attempts").innerText = "Muito bem! Você ganhou.";
        setTimeout(wait,1500);
    } 
    else if(attempts <= 0){
        document.getElementById("attempts").innerText = "Game Over!";
        hidden_word = selected_word.split("");
        update_display();
        setTimeout(wait,3000);
    }
}
// Função para conclusão de finalização do jogo \\
function wait(){
    reset_game();
}
// Função de reinicialização do jogo \\
function reset_game() {
    is_game_start = false;
    hidden_word = [];
    guessed_letters = [];
    document.getElementById("word-display").innerText = '';
    const forca = document.querySelector(".img-forca");
    forca.classList.remove("move-left");
    key1.style.display = "none";
    key2.style.display = "none";
}
// Evento para digitação \\
document.addEventListener("keydown", (event) => {
    const letter = event.key.toUpperCase();
    if(/^[A-Z]$/.test(letter)) check_letter(letter);
});