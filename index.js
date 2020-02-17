var firebaseConfig = {
    apiKey: "AIzaSyDxPSEY7UsP9iaCk24-r8CxLOqIowGw_gA",
    authDomain: "febchatapp.firebaseapp.com",
    databaseURL: "https://febchatapp.firebaseio.com",
    projectId: "febchatapp",
    storageBucket: "febchatapp.appspot.com",
    messagingSenderId: "535632913562",
    appId: "1:535632913562:web:8fde5e4ae84335bb042b23"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.database().ref('/');
  var auth = firebase.auth();

  var app = angular.module("ChatApp",[]);
  app.controller("ChatAppCtrl",function($scope){

    $scope.msg = "";


    $scope.login = function(){
        auth.signInWithEmailAndPassword($scope.emailLogin,$scope.passwordLogin)
        .then(function(userData){
            window.location.replace("chat.html");
        })
        .catch(function(error){
            alert(error);
        })

    }

    $scope.signup= function(){
        auth.createUserWithEmailAndPassword($scope.emailSignup,$scope.passwordSignup)
        .then(function(userData){
            alert(userData.user.email+ " has been Registered");
            window.location.replace("index.html");
        })
        .catch(function(error){
            alert(error);
        })

    }

    $scope.send = function(){
        db.child("Msgs").push({
            msg : $scope.msg,
            email: auth.currentUser.email
        });
        $scope.msg = "";
    }

    db.child("Msgs").on("child_added",function(snapshot){
        $scope.readData = snapshot.val();

        if($scope.readData.email == auth.currentUser.email){
            document.getElementById("msgList").innerHTML += `
            <li class="list-group-item text-right">    <span class="badge badge-primary">${$scope.readData.msg}</span>  </li>` ;
        
        }
        else{
            document.getElementById("msgList").innerHTML += `
            <li class="list-group-item"> ${$scope.readData.email} :  ${$scope.readData.msg} </li>` ;
        
        }


        var h = $('#msgDiv').get(0).scrollHeight;
         $("#msgDiv").animate({
             scrollTop : h
         });
      
    })


    $scope.logout = function(){
        auth.signOut().then(function(){
            window.location.replace("index.html");
        })
    }



  });