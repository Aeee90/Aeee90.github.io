var changeTheme = function( theme ) {
    var body = document.querySelector("body");

    // if(body.classList.contains("dark")) body.classList.remove("dark"); 
    // else body.classList.add("dark");

    body.classList.toggle(theme);
}