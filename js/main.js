$(document).ready(function(){

	//initializing all required variables
	var strictOn = false;
	var pattern = [];
	var player = [];
	var count = 1;
	var gameOn = false;
	var next = 0;
	var quad='';
	var choice = "";
	var audio;
	var ind = 0;
	var color;
	var myColor='';
	//each color quadrant set up as an object within an array
	var quadrant = [
	{color: "green", 
	sound:'sounds/green.mp3'},
	{color: "red", 
	sound: 'sounds/red.mp3'},
	{color: "yellow", 
	sound: 'sounds/yellow.mp3'},
	{color: "blue", 
	sound: 'sounds/blue.mp3'}
	]
	var loops = 0;

	function init(){
		//initializing all required variables

		pattern = [];
		player = [];
		count = 1;

		next = 0;
		quad='';
		choice = "";
		audio;
		ind = 0;
		color;
		myColor='';
		quadrant = [
		{color: "green", 
		sound:'sounds/green.mp3'},
		{color: "red", 
		sound: 'sounds/red.mp3'},
		{color: "yellow", 
		sound: 'sounds/yellow.mp3'},
		{color: "blue", 
		sound: 'sounds/blue.mp3'}
		]
		loops = 0;

	}

	$('#strict').on('click',function(){
		if(strictOn===false){
			strictOn=true;
			$('#strict').addClass("strictOn");
		}
		else{
			strictOn=false;
			$('#strict').removeClass('strictOn');

		}
	})


	$('#start').on('click', function(){

		if(gameOn==false){

			gameOn = true;
			countAnimate(count);
			setTimeout(gamePlay, 3500);
		}
		


	})

	//just visuals for the transition from one level to the next
	function countAnimate(num){
		$('#count').delay(100).fadeOut().fadeIn('fast');
		$('#count').delay(100).fadeOut().fadeIn('fast');
		
		$('#count').delay(100).fadeOut().fadeIn('fast');
		setTimeout(function(){
			$('#count').html(num);
		},2500);

	}

	function gamePlay(){
		randomChoice();
		ind=0;
		quadAnimate();
		
		
		
	}

	function randomChoice(){
		choice = Math.floor(Math.random()*4);
		pattern.push(choice);
		
	}

	function quadAnimate(){
		
		myColor = quadrant[pattern[ind]].color;
		$('#'+ myColor).addClass(myColor+"-lit");
		audio = new Audio(quadrant.find(function(color){
			return color.color === myColor;
		}).sound);
		audio.play();
		setTimeout(function(){
			$('#'+myColor).removeClass(myColor+'-lit');
		},750);
		ind+=1;
		if(ind < pattern.length){
			
			
			setTimeout(quadAnimate,750);
		}
		else{
			
			ind =0;
			setTimeout(playerTry,750);
		}

	}

	function playerTry(){
		
		$('.quadrant').addClass('clickable');
		$('.quadrant').on('click', function(){
			$('.quadrant').off('click');
			myColor = $(this).attr('id');
			$(this).addClass(myColor + '-lit');
			audio = new Audio(quadrant.find(function(color){
				return color.color===myColor;
			}).sound)
			audio.play();
			setTimeout(function(){
				$('#'+myColor).removeClass(myColor + '-lit');
			},500);
			player.push(myColor);
			
			setTimeout(checkChoice,500);
		})
		

	}

	function checkChoice(){

		if(player[ind] == quadrant[pattern[ind]].color){
			ind+=1;
			if(player.length==pattern.length){
				count+=1;
				player = [];
				$('.quadrant').removeClass('clickable');
				setTimeout(countAnimate,750);
				countAnimate(count);
				setTimeout(gamePlay,5000);

			}
			else{
				playerTry();
			}
			
		}
		else{
			if(strictOn){
				player=[];
				$('#count').html("XX");
				$('.quadrant').off('click');
				$('.quadrant').removeClass('clickable');
				ind=0;
				count=1;
				pattern=[];
				setTimeout(countAnimate,750);
				countAnimate(count);
				setTimeout(gamePlay,5000);
			}



		else{
			player=[];
			$('#count').html("XX");
			$('.quadrant').off('click');
			$('.quadrant').removeClass('clickable');
			ind=0;
			setTimeout(countAnimate,750);
			countAnimate(count);
			setTimeout(quadAnimate,5000);
		}
	}

}




})