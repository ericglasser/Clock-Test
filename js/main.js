var CurrentTime = 0;
var toggle = 'min';
var power = 'off';

$(document).ready(function() {
	        $( "#slider" ).slider({
            range: "min",
            value:0,
            min: 0,
            max: 55,
            step: 1,
            slide: function( event, ui ) {
                CurrentTime = ui.value;
                ChangeTime (CurrentTime);
            }
        });
	
	/* Limit set to 55 units to match the number of notches im the design.*/
	
	$('div#up').click(function () {
		if (CurrentTime < 55) {
			if (power == 'on') {
				TimeUp ();
			}
		}
	});
	
	$('div#down').click(function () {
		if (CurrentTime > 0) {
			if (power == 'on') {
				TimeDown ();
			}
		}
	});

	$('div#toggle').click(function () {
		ToggleTimeType ();
	})
	
	$('div#power, div#power-led').click(function () {
		Power ();
	});

	
});

function TimeUp () {
	CurrentTime++;
	ChangeTime(CurrentTime);
}

function TimeDown () {
	CurrentTime--;
	ChangeTime(CurrentTime);
}
function ChangeTime (time) {
	time = time+'';
	var TimeArray = time.split("");	
	var TimeArraySize = TimeArray.length;
	if (TimeArraySize < 4) {
		var TimeArrayTemp = TimeArray;
		TimeArray = Array('no-num','no-num','no-num','no-num');
		for (var i = 0; i < 4; i++) {
			if (i < TimeArraySize) {
				TimeArray[3-i] = TimeArrayTemp[TimeArraySize-i-1];
			}
		}
	}
	for (var ii = 1; ii < 5; ii++) {
	$('#num-' + ii + ' img').attr("src", "img/numbers/" + TimeArray[ii - 1] + ".png");
	}
	$( "#slider" ).slider( "value", time );
}

function Power () {

	if (power == 'off') {
		$('.num img').attr("src", "img/numbers/8.png");
		$('div#face div, div#power-led').fadeIn(200,function () {
			ChangeTime(CurrentTime);
			SetScreenToggle (toggle);
		});
		power = 'on';
	} else {
		$('div#face div, div#power-led').fadeOut(100);
		power = 'off';
	}
}
function ToggleTimeType () {
	if (toggle == 'min') {
		toggle = 'hour';
	} else {
		toggle = 'min';
	}
	if (power == 'on') {
	SetScreenToggle(toggle);
	}
	$("div#toggle").toggleClass('hour min');
}

function SetScreenToggle (type) {
	if (type == 'min') {
		$('div#minute').fadeIn(0);
		$('div#hour').fadeOut(0);
	} else {
		$('div#hour').fadeIn(0);
		$('div#minute').fadeOut(0);
	}
}