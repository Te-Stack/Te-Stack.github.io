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

 // helper function for sending an AJAX request
      
 function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
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

    const form = document.getElementById("my-form");
    const button = document.getElementById("my-form-button");
    const status = document.getElementById("my-form-status");

    // Success and Error functions for after the form is submitted
    
    function success() {
      form.reset();
      button.style = "display: none";
      status.innerHTML = "Thanks for reaching out !";
      if (button.style.display === "none") {
          status.style.display = 'block';
      }
      setTimeout(() => {
          button.style = "display: block";
          status.style.display = 'none';
      }, 5000)
    }

    function error() {
      status.innerHTML = "Oops! There was a problem.";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });

    
}


//Dark and Light Theme
function toggleTheme(theme) {
  const body = document.querySelector("body");
  body.classList.remove('dark', 'light')
  if (theme == 'dark') {
      body.classList.add('dark')
  } else {
      body.classList.add('light')
  }
}