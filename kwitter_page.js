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
//YOUR FIREBASE LINKS

user_name = localStorage.getItem("user");
room_name = localStorage.getItem("room Name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            Name: user_name,
            Msg: msg,
            Like: 0
      });

      document.getElementById("msg").value = "";
}

function logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("room Name");
      window.location.replace("index.html");
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name1 = message_data['Name'];
                        message = message_data['Msg'];
                        Like = message_data['Like'];
                        nameWithTag = "<h4>" + name1 + "<img class='user_tick' src='tick.png'></h4>";
                        msgWithTag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + Like + " onclick='update_like(this.id)'>";
                        spanWithag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + Like + "</span></button><hr>";
                        row = nameWithTag + msgWithTag + like_button + spanWithag;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();

function update_like(message_id) {
      console.log("Clicked on like button" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            Like: updated_likes
      });
}