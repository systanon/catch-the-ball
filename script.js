var cvs = document.getElementById('canvas');
var ctx = cvs.getContext ('2d');

var basket = new Image();
var bg = new Image();
var xPos = 300;
var yPos = 350;
var ball = new Image();
var score = 0;
var bingo = new Audio();
var lose = new Audio();
var miss = new Audio();
var fall = [];
fall [0] = {
	x : 0 ,
	y : 0
}
bingo.src ='audio/score.mp3';
lose.src = 'audio/lose.mp3';
miss.src = 'audio/Sound_05879.mp3'
basket.src = 'image/full2.png';
bg.src = 'image/небо.jpeg';
ball.src = 'image/tennis_PNG10405.png';


document.addEventListener('keydown',moveLeft, false)
	function moveLeft (e) {
		if (e.code =='ArrowLeft') xPos -= 15;
		if (xPos < 0) xPos = 0;
	}

		
document.addEventListener('keydown',moveRight, false)
	function moveRight (e) {
		if (e.code =='ArrowRight') xPos += 15;
	    if (xPos > (cvs.width - basket.width) ) xPos = (cvs.width - basket.width);
		
	}
document.addEventListener('mousemove',mouseMove,false)
		function mouseMove (e){
		//курсор посреди корзины	
	    var r = cvs.getBoundingClientRect();
		xPos = e.clientX - r.left - 0.5*basket.width;
		if (xPos > (cvs.width - basket.width) ) xPos = (cvs.width - basket.width);
	    if (xPos < 0) xPos = 0;
		}
function draw () {
	ctx.drawImage(bg,0,0);
	// Рисуем мячи.
	for (var i = 0; i < fall.length; i++) {
		ctx.drawImage(ball, fall[i].x, fall[i].y);
		fall[i].y+=2;
		// По достижению определенного расстояния, добавляем новый.
		if (fall[i].y == (cvs.height - 250)){
			fall.push ({
				x : Math.floor(Math.random()*(cvs.width-ball.width)),
				y : 0
			});
		}
		if ((fall[i].y == (cvs.height - 104))){
			// Считаем растояние к мячу.
			var l = ((fall[i].x+20) - (xPos+32));
			var al = Math.abs(l);
			var b = l>0;
			// Если в раёне корзины...
			if(al<=52){
				// Попал в корзину, удаляем и плюсуем очки.
				if (al<=22){
					fall.shift();
					bingo.play();
					score++;
					// Тут плюсуем очки.
				// Попал на ребро, отбиваем, крутим финты и очки нетрогаем:).
				}else{
					// Тут отбиваем и пока неудаляем.
					if(b == true){
						// Отбиваем в право.
						fall[i].x += 20;
						miss.play();
					}else{
						// Отбиваем в лево.
						fall[i].x -= 20;
						miss.play();
					}

				}
			}
		}
		// если упал ниже экрана, удаляем и минусуем очки.
		if (fall[i].y >= cvs.height){
			fall.shift();
			lose.play();
			score--;
		if (score == -3) location.reload()	;
			// Тут минусуем очки.
		}

	}




	ctx.drawImage(basket,xPos,yPos);
	ctx.fillStyle = '#800000';
	ctx.font = '25px Arial';
	ctx.fillText('Score:'+ score,10,cvs.height-390);
	requestAnimationFrame(draw);
}
ball.onload = draw;