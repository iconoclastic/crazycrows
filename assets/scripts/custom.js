var canvas;
var context;
var queue;
var WIDTH = 1024;
var HEIGHT = 768;
var crowXPosition;
var crowYPosition;
var stage;
var flyAnimation;
var fallAnimation;
var flySpritesheet;
var fallSpritesheet;
var score = 0
var scoreText;
var startTime;
var startContainer;
var gameTimer = 0;
var timerText = "";
var ipAddress = "";
var minuteTimer = 0;
var theProgress;
var speeed = 3000;
var initialPositions = {
	x: [
			950, 200, 480, 50, 0, 0, 140, 233, 325, 450, 560, 665, 768, 830, 931
	],
	y: [
			10, 70, 10, 15, 305, 212, 226, 223, 233, 227, 234, 225, 227, 225, 205
	]
}

var crows = [];
var signs = [];
var startBtn;
var startText;
var numbers = [];
var fail = [];
var successArray = [];
var currentAudio = -1;
var busy = true;
var correctOnes = [];
var cloud;
var cable;
var mute;
var unmute;

var jarLevel2;
var jarsLevel2;
var crowLevel2;
var crowsLevel2;
var stonesLevel2;
var stones = [];
var chosenStones = [];
var correctAnswerLevel2;
var intervalCounter, intervalCounter1, intervalCounter2;

var stonesLevel3, correctAnswerLevel31 = [], correctAnswerLevel32 = [], level3StonePickupCounter = 0;
var crowsLevel31Spritesheet, crowsLevel31, crowsLevel32;
var jarsLevel3BigSpritesheet, jarsLevel3Big1, jarsLevel3Big2, jarsLevel3Spritesheet, jarsLevel3 = [];
var stones1 = [], stones2 = [], chosenStones1 = [], chosenStones2 = [], randomStoneNumberLevel3 = Math.round(Math.random()*2 + 1); 


window.onload = init;

function init() {

	// Initializing the Stage	

	theProgress = document.getElementById("progress");

    canvas = document.getElementById('crazy-crows-canvas');
    context = canvas.getContext('2d');
    context.canvas.width = WIDTH;
    context.canvas.height = HEIGHT;
    stage = new createjs.Stage("crazy-crows-canvas");

    // Set up Asset Queue  and load sounds 

    queue = new createjs.LoadQueue(false);
    createjs.Sound.alternateExtensions = ["ogg"];
    queue.installPlugin(createjs.Sound);
    queue.on("complete", queueLoaded, this);

	queue.addEventListener("progress", handleFileLoad);

    createjs.Sound.alternateExtensions = ["ogg"];

    queue.loadManifest([

    	{id: 'bgImg', src: 'assets/images/bg.png'},
    	{id: 'cable', src: 'assets/images/cable.png'},
    	{id: 'cloud', src: 'assets/images/cloud.png'},
    	{id: 'crowLeft', src: 'assets/images/crow-left-1.png'},
    	{id: 'crowLeftSign', src: 'assets/images/crow-left-1-sign.png'},
    	{id: 'crowRight', src: 'assets/images/crow-right-1.png'},
    	{id: 'crowRightSign', src: 'assets/images/crow-right-1-sign.png'},
    	{id: 'crow2Left', src: 'assets/images/crow-left-2.png'},
    	{id: 'crow2LeftSign', src: 'assets/images/crow-left-2-sign.png'},
    	{id: 'crow2Right', src: 'assets/images/crow-right-2.png'},
    	{id: 'crow2RightSign', src: 'assets/images/crow-right-2-sign.png'},    	
    	{id: 'crowFlySpritesheet', src: 'assets/images/crow-fly.png'},
    	{id: 'crowFallSpritesheet', src: 'assets/images/crow-fall.png'},
    	{id: 'logo', src: 'assets/images/logo.png'},
    	{id: 'mute', src: 'assets/images/mute.png'},
    	{id: 'unmute', src: 'assets/images/unmute.png'},    
    	{id: 'restart', src: 'assets/images/restart.png'}, 	
    	{id: 'signs', src: 'assets/images/signs.png'},   
    	{id: 'bgLevel2', src: 'assets/images/bg-level2.png'},
    	{id: 'jarLevel2', src: 'assets/images/jar-level2.png'},
    	{id: 'jarsLevel2', src: 'assets/images/jars-level2.png'},  	
    	{id: 'crowsLevel2', src: 'assets/images/crows-level2.png'},
    	{id: 'stonesLevel2', src: 'assets/images/stones-level2.png'},
    	{id: 'stonesLevel3', src: 'assets/images/stones-level3.png'},
    	{id: 'jarsLevel3Big', src: 'assets/images/jars-level3-big.png'},
    	{id: 'jarsLevel3', src: 'assets/images/jars-level3.png'},
    	{id: 'crowsLevel3', src: 'assets/images/crows-level3.png'},
    	{id: 'diamonds', src: 'assets/images/diamonds.png'},
    	{id: 'bgSound', src: 'assets/audio/bg.mp3'},
    	{id: 'crowSound', src: 'assets/audio/crow2.mp3'},
    	{id: 'successSound', src: 'assets/audio/success.mp3'},
    	{id: 'cheersSound', src: 'assets/audio/cheers.mp3'},
    	{id: 'smashSound', src: 'assets/audio/smash.mp3'},
    	{id: '1', src: 'assets/audio/1.mp3'},
    	{id: '2', src: 'assets/audio/2.mp3'},
    	{id: '3', src: 'assets/audio/3.mp3'},
    	{id: '4', src: 'assets/audio/4.mp3'},
    	{id: '5', src: 'assets/audio/5.mp3'},
    	{id: '6', src: 'assets/audio/6.mp3'},
    	{id: '7', src: 'assets/audio/7.mp3'},
    	{id: '8', src: 'assets/audio/8.mp3'},
    	{id: '9', src: 'assets/audio/9.mp3'},
    	{id: '10', src: 'assets/audio/10.mp3'},
    	{id: '11', src: 'assets/audio/11.mp3'},
    	{id: '12', src: 'assets/audio/12.mp3'},
    	{id: '13', src: 'assets/audio/13.mp3'},
    	{id: '14', src: 'assets/audio/14.mp3'},
    	{id: '15', src: 'assets/audio/15.mp3'},
    	{id: '16', src: 'assets/audio/16.mp3'},
    	{id: '17', src: 'assets/audio/17.mp3'},
    	{id: '18', src: 'assets/audio/18.mp3'},
    	{id: '19', src: 'assets/audio/19.mp3'},
    	{id: '20', src: 'assets/audio/20.mp3'},
    	{id: '21', src: 'assets/audio/21.mp3'},
    	{id: '22', src: 'assets/audio/22.mp3'},
    	{id: '23', src: 'assets/audio/23.mp3'},
    	{id: '24', src: 'assets/audio/24.mp3'},
    	{id: '25', src: 'assets/audio/25.mp3'},
    	{id: '26', src: 'assets/audio/26.mp3'},
    	{id: '27', src: 'assets/audio/27.mp3'},
    	{id: '28', src: 'assets/audio/28.mp3'},
    	{id: '29', src: 'assets/audio/29.mp3'},
    	{id: '30', src: 'assets/audio/30.mp3'}
	]);
	queue.load();

	stratTime = new Date().today() + " at " + new Date().timeNow();
	gameTimer = setInterval(updateTime, 1000);
	this.startTime = stratTime;
	this.ipAddress = ipAddress;

}

function handleFileLoad(event) {
	theProgress.innerHTML = Math.round((event.progress * 100)).toString() + "%";
}

function queueLoaded(event) {

	document.getElementById("loading-img").style.display = "none";
	theProgress.style.display = "none";

	var theOk;
	while (numbers.length < 10) {
		var randomNumber = Math.round(Math.random() * 29 + 1);
		theOk = true;
		for(var j = 0; j < numbers.length; j++) {		
			if (numbers[j] == randomNumber) {
				theOk = false;
				continue;
			}
		}			
		if (theOk) {
			numbers.push(randomNumber);
		}	
	}

	correctOnes = numbers.slice(0);

	bgImg = new createjs.Bitmap(queue.getResult("bgImg"));
	bgImg.x = 0;
	bgImg.y = 0;
	stage.addChild(bgImg);	

	createjs.Ticker.setFPS(15);
	createjs.Ticker.addEventListener('tick', stage);
	createjs.Ticker.addEventListener('tick', tickEvent);

	createjs.MotionGuidePlugin.install();

	startBtn = new createjs.Shape();
	startBtn.graphics.ss(3,"round").s("#007630").f("#EF8900").rr(0, 0, 300, 70, 10);
	startText = new createjs.Text("START", "35px sans-serif", "#007630");
	startContainer = new createjs.Container();
	startContainer.addChild(startBtn, startText);
	startContainer.x = WIDTH/2 - 150;
	startContainer.y = HEIGHT/2 - 90;
	startText.x = 90;
	startText.y = 15;
	startContainer.alpha = 0;
	stage.addChild(startContainer);
	createjs.Tween.get(startContainer, {loop: false}).to({alpha: 1, y: HEIGHT/2 - 70}, 500);
	stage.update();

	startContainer.addEventListener("click", function(){

			createjs.Sound.play("bgSound", {loop: -1});

			stage.removeChild(startContainer);

			cloud = new createjs.Bitmap(queue.getResult("cloud"));
			cloud.x = initialPositions.x[2];
			cloud.y = initialPositions.y[2];
			stage.addChild(cloud);

			createjs.Tween.get(cloud, {loop: true}).to({x: 310}, 10000).wait(1500).to({x: 480}, 10000).wait(1500);

			mute = new createjs.Bitmap(queue.getResult("mute"));
			mute.x = initialPositions.x[1];
			mute.y = initialPositions.y[1];
			mute.visible = false;
			stage.addChild(mute);	

			unmute = new createjs.Bitmap(queue.getResult("unmute"));
			unmute.x = initialPositions.x[1];
			unmute.y = initialPositions.y[1];
			stage.addChild(unmute);	

			restart = new createjs.Bitmap(queue.getResult("restart"));
			restart.x = initialPositions.x[0];
			restart.y = initialPositions.y[0];
			stage.addChild(restart);		

			var logo = new createjs.Bitmap(queue.getResult("logo"));
			logo.x = initialPositions.x[3];
			logo.y = initialPositions.y[3];
			stage.addChild(logo);	

			cable = new createjs.Bitmap(queue.getResult("cable"));
			cable.x = initialPositions.x[4];
			cable.y = initialPositions.y[4];
			stage.addChild(cable);	

			scoreText = new createjs.Text("SCORE: " + score.toString(), "25px sans-serif", "#FFF");
			scoreText.x = 50;
			scoreText.y = 70;
			stage.addChild(scoreText);

			timerText = new createjs.Text("TIME: " + gameTimer.toString(), "25px sans-serif", "#FFF");
			timerText.x = 50;
			timerText.y = 105;
			stage.addChild(timerText);

			startTimeText = new createjs.Text("Start Date/Time: " + this.startTime.toString(), "15px sans-serif", "#FFF");
			startTimeText.x = 50;
			startTimeText.y = 135;
			stage.addChild(startTimeText);	

			startTimeText = new createjs.Text("IP Address: " + this.ipAddress.toString() , "15px sans-serif", "#FFF");
			startTimeText.x = 50;
			startTimeText.y = 155;
			stage.addChild(startTimeText);	

			flySpritesheet = new createjs.SpriteSheet({
				"images": [queue.getResult('crowFlySpritesheet')],
				"frames": {"width": 128, "height": 113},
				"animations": {"fly": [0,4]}
			});

			fallSpritesheet = new createjs.SpriteSheet({
				"images": [queue.getResult('crowFallSpritesheet')],
				"frames": {"width": 131, "height": 154},
				"animations": {"fall": [0,1,false,1]}
			});

			signsSpritesheet = new createjs.SpriteSheet({
				"images": [queue.getResult('signs')],
				"frames": {"width": 40, "height": 57},
				"animations": {"all": [0,93,1]}
			});	

			setTimeout(crowsLaterState, speeed);

			unmute.addEventListener("click", function(){
				createjs.Sound.setMute(true);
				unmute.visible = false;
				mute.visible = true;
			});

			mute.addEventListener("click", function(){
				createjs.Sound.setMute(false);
				unmute.visible = true;
				mute.visible = false;
			});	

			restart.addEventListener("click", function(){
				window.location.reload();
			});	

			crowsFirstState();		

		}); //StartContainer Clicked

} // Queue Load Finished

 function DisplayIP(response) {
    this.ipAddress = response.ip;
} 

function updateTime() {
	if (gameTimer<59) {
		gameTimer++;
		if (minuteTimer != 0) {
			timerText.text = "TIME " + minuteTimer + " : " + gameTimer;			
		} else {
			timerText.text = "TIME " + gameTimer;	
		}
		
	} else {
		gameTimer = 0;
		minuteTimer++;
		timerText.text = "TIME " + minuteTimer + " : " + gameTimer;
	}

}

function tickEvent(event) {
	stage.update();
}

function crowsFirstState() {

	for(var i=0; i<10; i++) {	
		switch(i) {
			case 0:
				crows[i] = new createjs.Bitmap(queue.getResult("crowRight"));
				break;
			case 1:
				crows[i] = new createjs.Bitmap(queue.getResult("crow2Left"));
				break;
			case 2:
				crows[i] = new createjs.Bitmap(queue.getResult("crowRight"));
				break;
			case 3:
				crows[i] = new createjs.Bitmap(queue.getResult("crow2Right"));
				break;
			case 4:
				crows[i] = new createjs.Bitmap(queue.getResult("crowRight"));
				break;
			case 5:
				crows[i] = new createjs.Bitmap(queue.getResult("crow2Left"));
				break;			
			case 6:
				crows[i] = new createjs.Bitmap(queue.getResult("crowLeft"));
				break;
			case 7:
				crows[i] = new createjs.Bitmap(queue.getResult("crow2Left"));
				break;
			case 8:
				crows[i] = new createjs.Bitmap(queue.getResult("crow2Right"));
				break;
			case 9:
				crows[i] = new createjs.Bitmap(queue.getResult("crowRight"));
				break;		
		}			
		crows[i].x = initialPositions.x[i+5];
		crows[i].y = initialPositions.y[i+5];
		stage.addChild(crows[i]);
	}				
}

function crowsLaterState() {

	createjs.Sound.play("successSound");

	for(var i=0; i<10; i++) {
		stage.removeChild(crows[i]);
		signs[i] = new createjs.Sprite(signsSpritesheet, "all");
		signs[i].regX = 20;
		signs[i].regY = 28;		
		switch(i) {
			case 0:
				crows[i] = new createjs.Bitmap(queue.getResult("crowRightSign"));
				crows[i].x = initialPositions.x[i+5];
				crows[i].y = initialPositions.y[i+5];

				signs[i].x = initialPositions.x[i+5] + 35;
				signs[i].y = initialPositions.y[i+5] + 28;				
				break;
			case 1:
				crows[i] = new createjs.Bitmap(queue.getResult("crow2LeftSign"));
				crows[i].x = initialPositions.x[i+5] - 28;
				crows[i].y = initialPositions.y[i+5] - 7;

				signs[i].x = initialPositions.x[i+5] - 8;
				signs[i].y = initialPositions.y[i+5] + 21;				
				break;
			case 2:
				crows[i] = new createjs.Bitmap(queue.getResult("crowRightSign"));
				crows[i].x = initialPositions.x[i+5];
				crows[i].y = initialPositions.y[i+5];

				signs[i].x = initialPositions.x[i+5] + 35;
				signs[i].y = initialPositions.y[i+5] + 28;				
				break;
			case 3:
				crows[i] = new createjs.Bitmap(queue.getResult("crow2RightSign"));
				crows[i].x = initialPositions.x[i+5];
				crows[i].y = initialPositions.y[i+5] - 7;

				signs[i].x = initialPositions.x[i+5] + 104;
				signs[i].y = initialPositions.y[i+5] + 21;				
				break;
			case 4:
				crows[i] = new createjs.Bitmap(queue.getResult("crowRightSign"));
				crows[i].x = initialPositions.x[i+5];
				crows[i].y = initialPositions.y[i+5];

				signs[i].x = initialPositions.x[i+5] + 35;
				signs[i].y = initialPositions.y[i+5] + 28;				
				break;
			case 5:
				crows[i] = new createjs.Bitmap(queue.getResult("crow2LeftSign"));
				crows[i].x = initialPositions.x[i+5] - 28;
				crows[i].y = initialPositions.y[i+5] - 7;

				signs[i].x = initialPositions.x[i+5] - 8;
				signs[i].y = initialPositions.y[i+5] + 21;				
				break;			
			case 6:
				crows[i] = new createjs.Bitmap(queue.getResult("crowLeftSign"));
				crows[i].x = initialPositions.x[i+5];
				crows[i].y = initialPositions.y[i+5];

				signs[i].x = initialPositions.x[i+5] + 57;
				signs[i].y = initialPositions.y[i+5] + 28;				
				break;
			case 7:
				crows[i] = new createjs.Bitmap(queue.getResult("crow2LeftSign"));
				crows[i].x = initialPositions.x[i+5] - 28;
				crows[i].y = initialPositions.y[i+5] - 7;

				signs[i].x = initialPositions.x[i+5] - 8;
				signs[i].y = initialPositions.y[i+5] + 21;				
				break;
			case 8:
				crows[i] = new createjs.Bitmap(queue.getResult("crow2RightSign"));
				crows[i].x = initialPositions.x[i+5];
				crows[i].y = initialPositions.y[i+5] - 7;

				signs[i].x = initialPositions.x[i+5] + 104;
				signs[i].y = initialPositions.y[i+5] + 21;				
				break;
			case 9:
				crows[i] = new createjs.Bitmap(queue.getResult("crowRightSign"));
				crows[i].x = initialPositions.x[i+5];
				crows[i].y = initialPositions.y[i+5];

				signs[i].x = initialPositions.x[i+5] + 35;
				signs[i].y = initialPositions.y[i+5] + 28;					
				break;		
		}
		signs[i].gotoAndStop((numbers[i] * 3));
		stage.addChild(crows[i]);
		stage.addChild(signs[i]);		
	
	}							


	playAudio();

	for(var i=0; i<10; i++) {
		if(typeof window.addEventListener === 'function') {
			(function(_i) {
				crows[i].addEventListener('click', function _func(){
					clickedCrow(_i);
				});
			})(i);
		}
	}	

}

function playAudio() {		
	var thatIsOk = false;
	var firstTime = true;
	busy = true;
	for(var i= 0; i < numbers.length; i++) {
		if(numbers[i] != "") {
			thatIsOk = true;
		} else {
			firstTime = false;
		}
	}
	if(thatIsOk) {
		var audioIsNotOkYet = true;
		if(firstTime) {
			setTimeout(theRest, 2000);			
		} else {
			theRest();
		}
		function theRest() {
			while (audioIsNotOkYet == true) {
				var theIndex = Math.round(Math.random() * 10);
				if (numbers[theIndex]) {
					createjs.Sound.play(numbers[theIndex].toString());
					audioIsNotOkYet = false;
					currentAudio = numbers[theIndex];
					setTimeout(function(){
						busy = false;		
					}, 2000);					
				}
			}			
		}
	} else {

		var Level1BtnFinished = new createjs.Shape();
		Level1BtnFinished.graphics.ss(3,"round").s("#007630").f("#EF8900").rr(0, 0, 700, 70, 10);
		var Level1FinishedText = new createjs.Text("LEVEL 1 FINISHED - SCORE: " + score.toString(), "35px sans-serif", "#007630");
		var Level1FinishedContainer = new createjs.Container();
		Level1FinishedContainer.addChild(Level1BtnFinished, Level1FinishedText);
		Level1FinishedContainer.x = WIDTH/2 - 350;
		Level1FinishedContainer.y = HEIGHT/2 - 90;
		Level1FinishedText.x = 90;
		Level1FinishedText.y = 15;
		Level1FinishedContainer.alpha = 0;
		stage.addChild(Level1FinishedContainer);
		createjs.Tween.get(Level1FinishedContainer, {loop: false}).to({alpha: 1, y: HEIGHT/2 - 70}, 500).wait(speeed).call(function(){
			createjs.Tween.get(Level1FinishedContainer, {loop: false}).to({alpha: 0}, 500).call(level2);
		});
	}
}

function clickedCrow(theNumber) {
	if (busy == false) {
		busy = true;
		crowXPosition = crows[theNumber].x + 70;
		crowYPosition = crows[theNumber].y + 130;
		if (correctOnes[theNumber] == currentAudio) {
			tada(theNumber);
		} else {
			nooo(theNumber);
		}
	}	
}

function tada(nomer) {
	var innerNomer = nomer;
	score += 100;
	createjs.Sound.play('cheersSound');

	signs[innerNomer].gotoAndStop((correctOnes[nomer] * 3) + 1);

	setTimeout(function(){
		stage.removeChild(crows[innerNomer]);
		stage.removeChild(signs[innerNomer]);		
		flyAnimation(innerNomer);	
		scoreText.text = "SCORE: " + score.toString();
		successArray.push(numbers[innerNomer]);
		numbers[innerNomer] = "";
		setTimeout(playAudio, 2500);
	}, 500); 
}

function nooo(nomer) {
	busy = true;
	signs[nomer].gotoAndStop((correctOnes[nomer] * 3) + 2);	
	setTimeout(function(){
		createjs.Sound.play('crowSound');
		stage.removeChild(crows[nomer]);
		if(Math.round(Math.random()) == 0) {
			createjs.Tween.get(signs[nomer]).to({y: 744, rotation: 410}, 1000);
		} else {
			createjs.Tween.get(signs[nomer]).to({y: 744, rotation: 320}, 1000);
		}
		score -= 100;
		scoreText.text = "SCORE: " + score.toString();
		fail.push(numbers[nomer]);
		numbers[nomer] = "";
		fallAnimation();
		setTimeout(playAudio, 2000);
	}, 500);
}

function flyAnimation(nomer) {
	var flyAnimation = new createjs.Sprite(flySpritesheet, "fly");
	flyAnimation.regX = 64;
	flyAnimation.regY = 56;
	flyAnimation.x = crowXPosition;
	flyAnimation.y = crowYPosition;
	flyAnimation.gotoAndPlay("fly");
	stage.addChild(flyAnimation);


	createjs.Tween.get(flyAnimation).to({y: 620}, 1000).call(function(){
		setTimeout(function(){
			stage.removeChild(flyAnimation);
			//stage.removeChild(theSign);	

			var theSign = new createjs.Sprite(signsSpritesheet, "all");
				theSign.regX = 20;
				theSign.regY = 28;
				theSign.x = initialPositions.x[nomer+5] + 35;
				theSign.y = initialPositions.y[nomer+5] + 33;
				theSign.gotoAndStop((correctOnes[nomer] * 3) + 1);
				stage.addChild(theSign);

			theSign.y = 594;
			var successSign = new createjs.Bitmap(queue.getResult("crowLeftSign"));		
			successSign.y = 566;
			successSign.x = crowXPosition - 100;
			switch(nomer) {
				case 0:
					successSign.x += 30;
					theSign.x += 22;
					break;
				case 1:
					theSign.x -= 36;
					break;
				case 2:
					theSign.x -= 8;
					break;
				case 3:
					theSign.x -= 8;
					break;
				case 4:
					theSign.x -= 8;
					break;
				case 5:
					theSign.x -= 36;
					break;			
				case 6:
					theSign.x -= 8;
					break;
				case 7:
					theSign.x -= 36;
					break;
				case 8:
					theSign.x -= 8;
					break;
				case 9:
					theSign.x -= 8;
					break;		
			}			
			stage.addChildAt(successSign, 1);						
		}, 200);
	});	
}

function fallAnimation() {
	var fallAnimation = new createjs.Sprite(fallSpritesheet, "fall");
	fallAnimation.regX = 64;
	fallAnimation.regY = 56;
	fallAnimation.x = crowXPosition;
	fallAnimation.y = crowYPosition;
	fallAnimation.gotoAndPlay("fall");
	stage.addChild(fallAnimation);
}

function level2() {
	//createjs.Sound.stop();
	stage.removeAllChildren();

	bgLevel2 = new createjs.Bitmap(queue.getResult("bgLevel2"));
	bgLevel2.x = 0;
	bgLevel2.y = 0;
	stage.addChild(bgLevel2);	

	mute = new createjs.Bitmap(queue.getResult("mute"));
	mute.x = initialPositions.x[3];
	mute.y = initialPositions.y[1] - 20;
	mute.visible = false;
	stage.addChild(mute);	

	unmute = new createjs.Bitmap(queue.getResult("unmute"));
	unmute.x = initialPositions.x[3];
	unmute.y = initialPositions.y[1] - 20;
	stage.addChild(unmute);	

	restart = new createjs.Bitmap(queue.getResult("restart"));
	restart.x = initialPositions.x[0];
	restart.y = initialPositions.y[0];
	stage.addChild(restart);		

	var logo = new createjs.Bitmap(queue.getResult("logo"));
	logo.x = initialPositions.x[3];
	logo.y = 5;
	stage.addChild(logo);	

	crowsLevel2 = new createjs.SpriteSheet({
		"images": [queue.getResult('crowsLevel2')],
		"frames": {"width": 510, "height": 327},
		"animations": {"all": [0,2]}
	});	

	jarsLevel2 = new createjs.SpriteSheet({
		"images": [queue.getResult('jarsLevel2')],
		"frames": {"width": 100, "height": 121},
		"animations": {"all": [0,59]}
	});		

	stonesLevel2 = new createjs.SpriteSheet({
		"images": [queue.getResult('stonesLevel2')],
		"frames": {"width": 42, "height": 40},
		"animations": {"all2": [0,6]}
	});	

	jarLevel2 = new createjs.Bitmap(queue.getResult("jarLevel2"));
	jarLevel2.x = 180;
	jarLevel2.y = 300;
	stage.addChild(jarLevel2);	

	crowLevel2 = new createjs.Sprite(crowsLevel2, "all");
	crowLevel2.regX = 20;
	crowLevel2.regY = 28;
	crowLevel2.x = 270;
	crowLevel2.y = 150;
	crowLevel2.gotoAndStop(0);
	stage.addChild(crowLevel2);

	for (var i=0; i<20; i++) {
		stones[i] = new createjs.Sprite(stonesLevel2, "all2");
		if (i < 6) {
			stones[i].x = 700 + (i*25);
			stones[i].y = 450;
		} else if (i >= 6 && i < 11) {
			stones[i].x = 715 + ((i-6)*25);
			stones[i].y = 430;			
		} else if (i >= 11 && i < 15) {
			stones[i].x = 730 + ((i-11)*25);
			stones[i].y = 410;			
		} else if (i >= 15 && i < 18) {
			stones[i].x = 740 + ((i-15)*25);
			stones[i].y = 390;			
		} else {
			stones[i].x = 755 + ((i-18)*25);
			stones[i].y = 370;			
		}

		stones[i].gotoAndStop(Math.round(Math.random() * 6));	
		stage.addChild(stones[i]);	

	}

	setTimeout(level2StonePickup, 3000);	

	unmute.addEventListener("click", function(){
		createjs.Sound.setMute(true);
		unmute.visible = false;
		mute.visible = true;
	});

	mute.addEventListener("click", function(){
		createjs.Sound.setMute(false);
		unmute.visible = true;
		mute.visible = false;
	});	

	restart.addEventListener("click", function(){
		window.location.reload();
	});			
}

function level2StonePickup() {

	var randomStoneNumber = Math.round(Math.random()*10 + 1);
	correctAnswerLevel2 = randomStoneNumber;

	if(randomStoneNumber == 1) {
		addingToJar();
		setTimeout(jarsListLevel2, speeed);				
	} else {
		addingToJar();
		randomStoneNumber--;
		intervalCounter = setInterval(function(){					
			if(--randomStoneNumber <= 0) {		
				jarsListLevel2();										
			}			
			addingToJar();			

		}, speeed);

	}		

}

function addingToJar() {

	crowLevel2.gotoAndStop(1);
	crowLevel2.x = 320;
	crowLevel2.y = 220;

	var randomHeight = Math.round(Math.random()*10);
	chosenStones.push(stones[stones.length - 1]);
	stones[stones.length - 1].visible = false;
	chosenStones[chosenStones.length - 1].visible = true;
	chosenStones[chosenStones.length - 1].y = 367;	
	chosenStones[chosenStones.length - 1].x = 710;
	stones.pop();
	stage.addChild(chosenStones[chosenStones.length - 1]);

	setTimeout(function(){

		crowLevel2.x = 170;
		crowLevel2.y = 150;
		crowLevel2.gotoAndStop(2);
		chosenStones[chosenStones.length - 1].y = 230;
		chosenStones[chosenStones.length - 1].x = 190 + randomHeight*5;	
		createjs.Tween.get(chosenStones[chosenStones.length - 1], {loop: false}).wait(500).to({y: 430 - randomHeight*3}, 300, createjs.Ease.bounceOut);				
		
	}, 1000);

}

function jarsListLevel2() {
	window.clearInterval(intervalCounter);	
	setTimeout(function(){

		crowLevel2.x = 270;
		crowLevel2.y = 150;
		crowLevel2.gotoAndStop(0);		

	}, speeed);


	askLevel2Btn = new createjs.Shape();
	askLevel2Btn.graphics.ss(3,"round").s("#000").f("#FFF").rr(0, 0, 700, 60, 10);
	askLevel2Text = new createjs.Text("How many stones did the crow put in the jar?", "25px sans-serif", "#000");
	askLevel2Container = new createjs.Container();
	askLevel2Container.addChild(askLevel2Btn, askLevel2Text);
	askLevel2Container.x = 150;
	askLevel2Container.y = 550;
	askLevel2Text.x = 90;
	askLevel2Text.y = 15;
	askLevel2Container.alpha = 0;
	stage.addChild(askLevel2Container);
	createjs.Tween.get(askLevel2Container, {loop: false}).to({alpha: 1}, 500);	

	var jarStart = Math.round((Math.random() * 2) + 2);
	var correctAnswerBoolean = false;
	var correctGotoAndStop;
	for (var i = 0; i < 7; i++) {
		jarsLevel2[i] = new createjs.Sprite(jarsLevel2, "all");
		jarsLevel2[i].x = 150 + i*100;
		jarsLevel2[i].y = 630;
		var tempCorrect = chosenStones.length - jarStart;
		jarsLevel2[i].gotoAndStop((tempCorrect)*3);
		jarStart--;		
		stage.addChild(jarsLevel2[i]);	
	};
	for (var i = 0; i < 7; i++) {
		jarsLevel2[i].addEventListener('click', function(event){
			var currentFrame = event.target.currentFrame + 1;
			var currentNumber = Math.ceil(currentFrame / 3);
			if (currentNumber == chosenStones.length) {
				event.currentTarget.gotoAndStop(((currentNumber - 1) * 3) + 1);
				createjs.Sound.play("cheersSound");
				setTimeout(Level3Start, 500)
			} else {
				event.currentTarget.gotoAndStop(((currentNumber - 1) * 3) + 2);
				createjs.Sound.play("smashSound");
			}
		});
	};

}

function Level3Start() {
	var Level1BtnFinished = new createjs.Shape();
	Level1BtnFinished.graphics.ss(3,"round").s("#007630").f("#EF8900").rr(0, 0, 700, 70, 10);
	var Level1FinishedText = new createjs.Text("LEVEL 2 FINISHED", "35px sans-serif", "#007630");
	var Level1FinishedContainer = new createjs.Container();
	Level1FinishedContainer.addChild(Level1BtnFinished, Level1FinishedText);
	Level1FinishedContainer.x = WIDTH/2 - 350;
	Level1FinishedContainer.y = HEIGHT/2 - 90;
	Level1FinishedText.x = 90;
	Level1FinishedText.y = 15;
	Level1FinishedContainer.alpha = 0;
	stage.addChild(Level1FinishedContainer);
	createjs.Tween.get(Level1FinishedContainer, {loop: false}).to({alpha: 1, y: HEIGHT/2 - 70}, 500).wait(speeed).call(function(){
		createjs.Tween.get(Level1FinishedContainer, {loop: false}).to({alpha: 0}, 500).call(level3);
	});	
}

function level3() {
	stage.removeAllChildren();

	bgLevel2 = new createjs.Bitmap(queue.getResult("bgLevel2"));
	bgLevel2.x = 0;
	bgLevel2.y = 0;
	stage.addChild(bgLevel2);	

	mute = new createjs.Bitmap(queue.getResult("mute"));
	mute.x = initialPositions.x[3];
	mute.y = initialPositions.y[1] - 20;
	mute.visible = false;
	stage.addChild(mute);	

	unmute = new createjs.Bitmap(queue.getResult("unmute"));
	unmute.x = initialPositions.x[3];
	unmute.y = initialPositions.y[1] - 20;
	stage.addChild(unmute);	

	restart = new createjs.Bitmap(queue.getResult("restart"));
	restart.x = initialPositions.x[0];
	restart.y = initialPositions.y[0];
	stage.addChild(restart);		

	var logo = new createjs.Bitmap(queue.getResult("logo"));
	logo.x = initialPositions.x[3];
	logo.y = 5;
	stage.addChild(logo);	

	stonesLevel3 = new createjs.SpriteSheet({
		"images": [queue.getResult('stonesLevel3')],
		"frames": {"width": 33, "height": 32},
		"animations": {"all3": [0,6]}
	});	

	for (var i=0; i<20; i++) {
		stones[i] = new createjs.Sprite(stonesLevel3, "all3");
		if (i < 6) {
			stones[i].x = 420 + (i*25);
			stones[i].y = 452;
		} else if (i >= 6 && i < 11) {
			stones[i].x = 435 + ((i-6)*25);
			stones[i].y = 430;			
		} else if (i >= 11 && i < 15) {
			stones[i].x = 450 + ((i-11)*25);
			stones[i].y = 410;			
		} else if (i >= 15 && i < 18) {
			stones[i].x = 460 + ((i-15)*25);
			stones[i].y = 390;			
		} else {
			stones[i].x = 475 + ((i-18)*25);
			stones[i].y = 370;			
		}

		stones[i].gotoAndStop(Math.round(Math.random() * 6));	
		stage.addChild(stones[i]);	

	}		

	crowsLevel31Spritesheet = new createjs.SpriteSheet({
		"images": [queue.getResult('crowsLevel3')],
		"frames": {"width": 381, "height": 278},
		"animations": {"all4": [0,3]}
	});		

	crowsLevel31 = new createjs.Sprite(crowsLevel31Spritesheet, "all4");
	crowsLevel31.regX = 190;
	crowsLevel31.regY = 139;
	crowsLevel31.x = 285;
	crowsLevel31.y = 320;
	crowsLevel31.gotoAndStop(0);
	stage.addChild(crowsLevel31);		

	crowsLevel32 = new createjs.Sprite(crowsLevel31Spritesheet, "all4");
	crowsLevel32.regX = 190;
	crowsLevel32.regY = 139;
	crowsLevel32.x = 720;
	crowsLevel32.y = 320;
	crowsLevel32.scaleX = -1;
	crowsLevel32.gotoAndStop(0);
	stage.addChild(crowsLevel32);	

	jarsLevel3BigSpritesheet = new createjs.SpriteSheet({
		"images": [queue.getResult('jarsLevel3Big')],
		"frames": {"width": 128, "height": 169},
		"animations": {"all5": [0,20]}
	});	

	jarsLevel3Big1 = new createjs.Sprite(jarsLevel3BigSpritesheet, "all5");
	jarsLevel3Big1.regX = 64;
	jarsLevel3Big1.regY = 84;
	jarsLevel3Big1.x = 100;
	jarsLevel3Big1.y =400;
	jarsLevel3Big1.gotoAndStop(0);
	stage.addChild(jarsLevel3Big1);	

	jarsLevel3Big2 = new createjs.Sprite(jarsLevel3BigSpritesheet, "all5");
	jarsLevel3Big2.regX = 64;
	jarsLevel3Big2.regY = 84;
	jarsLevel3Big2.x = 920;
	jarsLevel3Big2.y = 400;
	jarsLevel3Big2.gotoAndStop(0);
	stage.addChild(jarsLevel3Big2);		

	setTimeout(level3StonePickup, 3000);

	unmute.addEventListener("click", function(){
		createjs.Sound.setMute(true);
		unmute.visible = false;
		mute.visible = true;
	});

	mute.addEventListener("click", function(){
		createjs.Sound.setMute(false);
		unmute.visible = true;
		mute.visible = false;
	});	

	restart.addEventListener("click", function(){
		window.location.reload();
	});			
}

function addingToJarLevel3(crowsLevel3) {
	if(crowsLevel3 === crowsLevel31) {
		crowsLevel3.gotoAndStop(1);
		crowsLevel3.x = 310;
		crowsLevel3.y = 404;

		var randomHeight = Math.round(Math.random()*5);
		chosenStones1.push(stones[stones.length - 1]);
		stones[stones.length - 1].visible = false;
		chosenStones1[chosenStones1.length - 1].visible = true;
		chosenStones1[chosenStones1.length - 1].y = 350;	
		chosenStones1[chosenStones1.length - 1].x = 443;
		stones.pop();
		stage.addChild(chosenStones1[chosenStones1.length - 1]);

		setTimeout(function(){

			crowsLevel3.x = 215;
			crowsLevel3.y = 350;
			crowsLevel3.gotoAndStop(2);
			chosenStones1[chosenStones1.length - 1].y = 280;
			chosenStones1[chosenStones1.length - 1].x = 55 + randomHeight*5;	
			createjs.Tween.get(chosenStones1[chosenStones1.length - 1], {loop: false}).wait(500).to({y: 430 - randomHeight*3}, 300, createjs.Ease.bounceOut);				
			
		}, 1000);		
	} else if(crowsLevel3 === crowsLevel32) {
		crowsLevel3.gotoAndStop(1);
		crowsLevel3.x = 680;
		crowsLevel3.y = 424;

		var randomHeight = Math.round(Math.random()*10);
		chosenStones2.push(stones[stones.length - 1]);
		stones[stones.length - 1].visible = false;
		chosenStones2[chosenStones2.length - 1].visible = true;
		chosenStones2[chosenStones2.length - 1].y = 368;	
		chosenStones2[chosenStones2.length - 1].x = 523;
		stones.pop();
		stage.addChild(chosenStones2[chosenStones2.length - 1]);

		setTimeout(function(){

			crowsLevel3.x = 785;
			crowsLevel3.y = 350;
			crowsLevel3.gotoAndStop(2);
			chosenStones2[chosenStones2.length - 1].y = 285;
			chosenStones2[chosenStones2.length - 1].x = 875 + randomHeight*5;	
			createjs.Tween.get(chosenStones2[chosenStones2.length - 1], {loop: false}).wait(500).to({y: 430 - randomHeight*3}, 300, createjs.Ease.bounceOut);				
			
		}, 1000);			
	}

}

function level3StonePickup() {	

	if(level3StonePickupCounter == 0 || level3StonePickupCounter == 2 || level3StonePickupCounter == 4) {

		correctAnswerLevel31.push(randomStoneNumberLevel3);

			addingToJarLevel3(crowsLevel31);
			intervalCounter1 = setInterval(function(){					
				if(--randomStoneNumberLevel3 <= 0) {		
					jarsListLevel3(crowsLevel31);										
				} else {
					addingToJarLevel3(crowsLevel31);
				}						

			}, 3000);

	} else if(level3StonePickupCounter == 1 || level3StonePickupCounter == 3 || level3StonePickupCounter == 5) {

			addingToJarLevel3(crowsLevel32);
			intervalCounter2 = setInterval(function(){					
				if(--randomStoneNumberLevel3 <= 0) {	
					jarsListLevel3(crowsLevel32);										
				} else {
					addingToJarLevel3(crowsLevel32);					
				}
			
			}, 3000);

	} else if(level3StonePickupCounter == 6) {jarsListLevel3('bla');}

}

function jarsListLevel3(crowsLevel3) {	
	if(crowsLevel3 !== 'bla') {		
		if(++level3StonePickupCounter<=6) {
			if(crowsLevel3 === crowsLevel31) {				
				window.clearInterval(intervalCounter1);				
				crowsLevel3.x = 285;
				crowsLevel3.y = 320;	
				randomStoneNumberLevel3 = Math.round(Math.random()*2 + 1);				
				crowsLevel3.gotoAndStop(0);					
				level3StonePickup();

			} else if(crowsLevel3 === crowsLevel32) {
				window.clearInterval(intervalCounter2);				
				crowsLevel3.x = 720;
				crowsLevel3.y = 320;	
				randomStoneNumberLevel3 = Math.round(Math.random()*2 + 1);
				crowsLevel3.gotoAndStop(0);					
				level3StonePickup();

			}
		}
	} else {
		showJarsLevel3();
	}

}

function showJarsLevel3() {
	setTimeout(function(){
		crowsLevel31.y -= 8;
		crowsLevel31.gotoAndStop(3);		
	}, 1000);

	setTimeout(function(){
		/*var jarStart = Math.round((Math.random() * 2) + 2);
		var correctAnswerBoolean = false;
		var correctGotoAndStop;*/

		jarsLevel3Spritesheet = new createjs.SpriteSheet({
			"images": [queue.getResult('jarsLevel3')],
			"frames": {"width": 100, "height": 121},
			"animations": {"all": [0,59]}
		});

		jarStartLevel3 = Math.round((Math.random() * 2) + 2);

		for (var i = 0; i < 7; i++) {
			jarsLevel3[i] = new createjs.Sprite(jarsLevel3Spritesheet, "all");
			jarsLevel3[i].x = 120;
			jarsLevel3[i].y = 470;
			jarsLevel3[i].scaleX = jarsLevel3[i].scaleY = 0.3;
			jarsLevel3[i].aplpha = 0;
			var tempCorrect = chosenStones1.length - jarStartLevel3;
			jarsLevel3[i].gotoAndStop((tempCorrect)*3);
			jarStartLevel3--;		
			stage.addChild(jarsLevel3[i]);	
			createjs.Ticker.setFPS(60);			
			createjs.Tween.get(jarsLevel3[i]).to({guide:{ path:[120,470, 200,550, jarsLevel3[i].x + i*100 + 50, 600] }, alpha: 1, scaleX: 1, scaleY: 1},1500).call(function(){
				createjs.Ticker.setFPS(15);
			});
		};		
	}, 1500);

	/*
	askLevel2Btn = new createjs.Shape();
	askLevel2Btn.graphics.ss(3,"round").s("#000").f("#FFF").rr(0, 0, 700, 60, 10);
	askLevel2Text = new createjs.Text("How many stones did the crow put in the jar?", "25px sans-serif", "#000");
	askLevel2Container = new createjs.Container();
	askLevel2Container.addChild(askLevel2Btn, askLevel2Text);
	askLevel2Container.x = 150;
	askLevel2Container.y = 550;
	askLevel2Text.x = 90;
	askLevel2Text.y = 15;
	askLevel2Container.alpha = 0;
	stage.addChild(askLevel2Container);
	createjs.Tween.get(askLevel2Container, {loop: false}).to({alpha: 1}, 500);	


	for (var i = 0; i < 7; i++) {
		jarsLevel2[i].addEventListener('click', function(event){
			var currentFrame = event.target.currentFrame + 1;
			var currentNumber = Math.ceil(currentFrame / 3);
			if (currentNumber == chosenStones.length) {
				event.currentTarget.gotoAndStop(((currentNumber - 1) * 3) + 1);
				createjs.Sound.play("cheersSound");
				setTimeout(Level3Start, 500)
			} else {
				event.currentTarget.gotoAndStop(((currentNumber - 1) * 3) + 2);
				createjs.Sound.play("smashSound");
			}
		});
	};*/
}


// For the date now
Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}













