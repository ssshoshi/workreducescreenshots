
var clients = ["Maxpoint", "Maxpoint RUSH", "Mobilefuse", "Mobilefuse RUSH", "Digilant", "Digilant RUSH", "OIQ", "OIQ RUSH"];



for(var i = 0; i < 8; i++){
    $("#client").append('<option value="' + clients[i] + '">' +'</option>');
}


for(var i = 1; i <= 60; i++){
    $("#amount").append('<option value="' + i + '">' + i + '</option>');
}


var total = 0;
var pay = 0;
var bonus = 0;
var obj = [];
var actualTime = [];
var client = document.getElementById('client');
var name = document.getElementById('screenshot');
var amount = document.getElementById('amount');
var maxpoint = document.getElementById('maxpoint');
var mobilefuse = document.getElementById('mobilefuse');
var digilant = document.getElementById('digilant');
var oiq = document.getElementById('oiq');


function submit(){
  bonus = screenshot[$("#amount").val()][$("#client").val()];
	name = $("#screenshot").val();
	amount = $("#amount").val();
	pay = Number(bonus.replace("$","")) / Number($("input[type='text']").val());
	$("#screenshot").val("");
  if(name === "") {
        $("#warning").text(" Please enter Screenshot name!");
    } else {
        total += pay;
        $("#time").text(convertToHHMM(total));
        if (client.value === "MAXPOINT" || client.value === "MAXPOINT RUSH") {
            underHour(maxpoint);
        } else if (client.value === "MOBILEFUSE" || client.value === "MOBILEFUSE RUSH") {
            underHour(mobilefuse);
        } else if(client.value === "DIGILANT" || client.value === "DIGILANT RUSH") {
            underHour(digilant);
        } else if(client.value === "OIQ" || client.value === "OIQ RUSH"){
            underHour(oiq);
        }
        hits.push({name: name});
        actualTime.push(hours + (minutes/60));
        $("#actual").text("$" + actual() + "/hr");
        $("#warning").text("");
        clear.onclick();
    }
    
}



function underHour(x){
    hours < 1 ? $(x).append(name + ', ' + amount +" SS, " + minutes +  'min, ' + bonus + '<br>') : $(x).append(name + ', ' + amount +" SS, " + hours +'hr ' + minutes +  'min, ' + bonus + '<br>');
}

function actual(){
    var actualHourly = 0;
    var fullTime = 0;
    for(i = 0; i < hits.length-1; i++){
        actualHourly += hits[i];
    }
    for(i = 0; i < actualTime.length- 1; i++) {
        fullTime += actualTime[i];
    }
    return actualHourly / fullTime;
    
}

$("input[type='submit']").click(function(){
    submit();
});


function convertToHHMM(pay){
    var hrs = parseInt(Number(pay));
    var min = Math.round((Number(pay)-hrs) * 60);
    if(min < 10){
        return hrs+':0'+min;
    } else {
        return hrs+':'+min;
    }
}


//========================================Beginning of timer============================================


// var h2 = document.getElementsByTagName('h2')[0],
//     start = document.getElementById('start'),
//     stop = document.getElementById('stop'),
//     clear = document.getElementById('clear'),
//     seconds = 0, minutes = 0, hours = 0,
//     t;

// function add() {
//     seconds++;
//     if (seconds >= 60) {
//         seconds = 0;
//         minutes++;
//         if (minutes >= 60) {
//             minutes = 0;
//             hours++;
//         }
//     }
    
//     h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

//     timer();
// }
// function timer() {
//     t = setTimeout(add, 1000);
// }


// /* Start button */
// start.onclick = function(){
// timer();
// $("#start").hide();
// }

// /* Stop button */
// stop.onclick = function() {
//     clearTimeout(t);
//     $("#start").show();
// }

// /* Clear button */
// clear.onclick = function() {
//     h2.textContent = "00:00:00";
//     seconds = 0; minutes = 0; hours = 0;
//     clearTimeout(t);
//     $("#start").show();
    
// }

var timer = new Timer();
$('#timer .startButton').click(function () {
    timer.start();
});
$('#timer .pauseButton').click(function () {
    timer.pause();
});
$('#timer .stopButton').click(function () {
    timer.stop();
});
$('#timer .resetButton').click(function () {
    timer.reset();
});
timer.addEventListener('secondsUpdated', function (e) {
    $('#timer .values').html(timer.getTimeValues().toString());
});
timer.addEventListener('started', function (e) {
    $('#timer .values').html(timer.getTimeValues().toString());
});
timer.addEventListener('reset', function (e) {
    $('#timer .values').html(timer.getTimeValues().toString());
});

    


