// Elements selected from html
let menu = document.querySelector('.hamburger');
let navs = document.querySelector('.mobile-nav');
let mbNavLi = document.querySelectorAll('.mobile-nav li');


menuToggle = () => {
    menu.classList.toggle('change');
    navs.classList.toggle('hide');
    if (navs.classList.contains('nonezz')){
        navs.classList.add('hide')
        navs.classList.remove('nonezz');
    }
}

// Close mobile menu on link click
closeOnNavClick = () => {  
    setTimeout(()=> {
        menu.classList.toggle('change');
        navs.classList.add('nonezz');
    }, 500) 
}

menu.addEventListener('click', menuToggle);
mbNavLi.forEach((li)=> {
    li.addEventListener('click', closeOnNavClick)
})
