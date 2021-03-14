function add_user(){
    var user = document.getElementById("userName").value;

    localStorage.setItem("user", user);
    window.location = "kwitter_room.html";
}