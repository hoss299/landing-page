/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navUl = document.getElementById('navbar__list');   // ul element
const sectionH2 = document.getElementsByTagName('h2');   // array of h2 elements
const sectionsArray = document.getElementsByTagName('section');   // array of sections elements
const anchors = document.getElementsByClassName('menu__link');   // array of anchor elements
const main = document.querySelector('main');    // main element
const scrollBtn = document.getElementById('scroll-btn');    // scroll button element

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

addNavList = () => {
    for (let i =0 ; i< sectionH2.length ; i++){

        const newLi = document.createElement('li');
        navUl.appendChild(newLi);

        const newAnchor = document.createElement ('a');
        newLi.appendChild(newAnchor);

        newAnchor.classList.add('menu__link'); 
        
        newAnchor.innerText = sectionH2[i].innerText ;     
    }
}

addSection = (n) => {
    for (let i=0 ; i<n ; i++){
        const newSection = document.createElement('section');
        main.appendChild(newSection);
        
        newSection.outerHTML = sectionsArray[1].outerHTML ;
        sectionsArray[i+3].id = `section${i+4}`;
        sectionH2[i+3].innerText = `section ${i+4}`;
    } 
}





// Add class 'active' to section when near top of viewport
makeActiveStyle = (event) => {
    
    for(let i=0 ; i<sectionsArray.length ; i++){
        const sectionDistance = sectionsArray[i].getBoundingClientRect();
        
        if(sectionDistance.top>-150 && sectionDistance.top<400){
            sectionsArray[i].classList.add('active-style');
            
            anchors[i].classList.add('active-link'); //Add an active state to your navigation items when a section is in the viewport.
        } else {
            sectionsArray[i].classList.remove('active-style');
            anchors[i].classList.remove('active-link');

        }
    }  
}


// Scroll to anchor ID using scrollTO event




/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

addSection(5);
addNavList();



// Scroll to section on link click
for( let i = 0 ; i < anchors.length ; i++ ){
    anchors[i].addEventListener('click', (event) => {
        event.preventDefault();
        let topDistance = sectionsArray[i].offsetTop;
        
        
        window.scrollTo(0,topDistance);
    },false);
};

// Set sections as active
window.addEventListener('scroll', makeActiveStyle , false);





// hide and show navigation bar

// window.setInterval(hideNav = () => {
//     const navBar = document.getElementById('header-navbar');
    
//     navBar.style.display = "none";
    
//     window.addEventListener('scroll' ,function showNav() {
//         navBar.style.display = "block";
//     }, false);

// }, 7000);

var timer = null;
window.addEventListener('scroll', () => {
    const navBar = document.getElementById('header-navbar');
    if(timer !== null) {
        clearTimeout(timer);        
    }
    navBar.style.display = "block";

    timer = setTimeout (() => {
        navBar.style.display = "none";
    }, 1500);
}, false);

//scroll to top button on the page that’s only visible when the user scrolls below the fold of the page


window.addEventListener('scroll' , addBtn = (event) => {
    event.preventDefault();

    if (main.getBoundingClientRect().top <= -580){
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
}, false);

scrollBtn.addEventListener('click',  scrollToTop = () => {
    document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})

// Make sections collapsible
for (let i =0 ; i<sectionH2.length ; i++){
    sectionH2[i].addEventListener('click', (event) => {
        event.preventDefault();
        var content = sectionH2[i].nextElementSibling;

        if(content.style.display === "block"){
            content.style.display = "none" ;
            content.nextElementSibling.style.display = "none" ;
        } else {
            content.style.display = "block" ;
            content.nextElementSibling.style.display = "block" ;
        };
    });
};

