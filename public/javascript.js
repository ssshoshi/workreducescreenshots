var pay = 0;
var bonus = 0;
var clients = ["Maxpoint", "Maxpoint RUSH", "Mobilefuse", "Mobilefuse RUSH", "Digilant", "Digilant RUSH", "OIQ", "OIQ RUSH"];

//populate client dropdown
for(var i = 0; i < clients.length; i++){
    $("#client").append('<option value="' + clients[i] + '">' + clients[i] +'</option>');
}

//populate the amount dropdown with 1-60
for(var i = 1; i <= 60; i++){
    $("#amount").append('<option value="' + i + '">' + i + '</option>');
}

  $( function() {
    $( "#datepicker" ).datepicker({
        dateFormat: "yy-mm-dd",
        maxDate: 0
    });
  } );

// function underHour(x){
//     hours < 1 ? $(x).append(name + ', ' + amount +" SS, " + minutes +  'min, ' + bonus + '<br>') : $(x).append(name + ', ' + amount +" SS, " + hours +'hr ' + minutes +  'min, ' + bonus + '<br>');
// }

// $(document).ready(function(){
//   $("#revision").click(function(){
//   $("#pay").toggle("fast");
//   });
// });


//returns the pay
function money(){
    bonus = screenshot[0][$("#amount").val()][$("#client").val()];
    return pay = Number(bonus.replace("$",""));
    $("#pay").val(pay);
}

var lastIndex = "",
		changedText = document.getElementById('pay');
function listQ(){
	changedText.value = money();
}
/* $("#list").on("change",listQ); */
document.getElementById("amount").onchange = listQ;
document.getElementById("client").onchange = listQ;
document.getElementById('revision').onchange = function() {
document.getElementById('pay').readOnly = !this.checked;
};

//convert to hours and minutes
// function convertToHHMM(pay){
//     var hrs = parseInt(Number(pay));
//     var min = Math.round((Number(pay)-hrs) * 60);
//     if(min < 10){
//         return hrs+':0'+min;
//     } else {
//         return hrs+':'+min;
//     }
// }



// $("input[type='submit']").click(function(){
//     money();
// });


//========================================Beginning of timer============================================


var h2 = document.getElementsByTagName('h2')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    reset = document.getElementById('reset'),
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
    $("#time").val(minutes);
}


/* Start button */
start.onclick = function(){
timer();
$("#start").hide();
}

/* Stop button */
stop.onclick = function() {
    clearTimeout(t);
    $("#start").show();
}

/* Clear button */
reset.onclick = function() {
    h2.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    clearTimeout(t);
    $("#start").show();
    
}

