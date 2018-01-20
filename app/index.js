angular.module('assign',['luegg.directives'])
       .controller('GlynkController', GlynkController)

function GlynkController ( $scope, $window, $anchorScroll) {

  $scope.showsend = false;
  $scope.messages = [];
  var obj = JSON.parse(localStorage.getItem("message"));
  if(obj != null){
    objlenght = obj.length;
    for(i = 0; i<objlenght; i++){
      $scope.messages.push(obj[i]);
    }
  }
  $scope.enterPressed = function(e) {
    var textar = document.getElementsByTagName('textarea')[0];
    $scope.showsend = true;
    if(e.key == 'Enter'){
      if($scope.textinput == undefined){
        e.preventDefault();
        textar.setSelectionRange(0, 0);
      } else {

        e.preventDefault();
        $scope.sendmessage();
        textar.setSelectionRange(0, 0);
      }
    } else if(e.key == ' ' && $scope.textinput == undefined ){
      e.preventDefault();
    }
  }
  $scope.sendmessage = function() {
    if($scope.textinput != '') {
      var date = new Date();
      $scope.time = formatAMPM(date);
      var length = $scope.messages.length;
      if(length != 0) {
        $scope.messages[length-1].messageseen = true;
        $scope.messages.push({
          textinput: $scope.textinput,
          time: $scope.time,
          messageseen: false
        });
      } else {
        $scope.messages.push({
          textinput: $scope.textinput,
          time: $scope.time,
          messageseen: false
        });
      }
      $scope.textinput = '';
      localStorage.setItem("message", JSON.stringify($scope.messages));
    }
  }
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
}
