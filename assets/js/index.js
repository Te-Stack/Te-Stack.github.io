const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


class TypeWriter{
    constructor(txtElement,words,wait=3000){
        this.txtElement= txtElement
        this.words = words
        this.txt = ""
        this.wordIndex = 0
        this.wait = parseInt(wait,10)
        this.type()
        this.isDeleting = false
    }

    type(){
        //current index of word 
    const current = this.wordIndex % this.words.length
    //Get Full text of current word
    const fullTxt = this.words[current]

    //  Check if deleting 
    if(this.isDeleting){
        //Remove char
        this.txt = fullTxt.substring(0,this.txt.length - 1)
    }
    else{
        //Add Char 
        this.txt = fullTxt.substring(0,this.txt.length + 1)   
    }

    //Insert txt into element 
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    //Initial Type Speed
    let typeSpeed = 300

    if(this.isDeleting){
        typeSpeed /= 2
    }

    //If word is complete
    if(!this.isDeleting && this.txt === fullTxt){
        //Make Pause at end
        typeSpeed = this.wait
        //set delete to true
        this.isDeleting = true
    }
    else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false
        //move to next word
        this.wordIndex++
        //pause before start typing
        typeSpeed = 500
    }

    setTimeout(()=> this.type(),typeSpeed)

    }

}



//Init on DOM Load
document.addEventListener('DOMContentLoaded',init)

//Init App
function init(){
    const txtElement = document.querySelector(".txt-type")
    const words = JSON.parse(txtElement.getAttribute('data-words'))
    const wait = txtElement.getAttribute('data-wait')
    //Init TypeWriter
    new TypeWriter(txtElement,words,wait)

    
}