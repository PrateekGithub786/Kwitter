var firebaseConfig = {
      apiKey: "AIzaSyDr7YnsCq9n1G6hjGer0SqKiOSYD7VUBrU",
      authDomain: "kwitter-29e56.firebaseapp.com",
      databaseURL: "https://kwitter-29e56-default-rtdb.firebaseio.com",
      projectId: "kwitter-29e56",
      storageBucket: "kwitter-29e56.appspot.com",
      messagingSenderId: "293463708740",
      appId: "1:293463708740:web:3def1aaa28045a45a61811"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE

user_name = localStorage.getItem("user");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!"; 

function add_room(){
      roomName = document.getElementById("roomName").value;
      firebase.database().ref("/").child(roomName).update({purpose: "Adding Room Name"});
      localStorage.setItem("room Name", roomName);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("Room Name: "+Room_names);
                  row = "<div class='room_name' id=" + Room_names + "onclick='redirectToPage(this.id)'>#" + Room_names + "</div><hr>"
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirectToPage(name){
      console.log(name);
      localStorage.setItem("room Name", name);
      window.location = "kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user");
      localStorage.removeItem("room Name");
      window.location = "index.html";
}