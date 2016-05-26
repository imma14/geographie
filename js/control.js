/*********************

thomas-lallier.fr
https://github.com/imma14

*********************/

$(function(){
	var ajout = 0;
	function shuffle(a) {
		  var j, x, i;
		  for (i = a.length; i; i -= 1) {
		      j = Math.floor(Math.random() * i);
		      x = a[i - 1];
		      a[i - 1] = a[j];
		      a[j] = x;
		  }
	}
	var score = 0;
	// Création du svg avec raphael
	var paper = Raphael(0, 0, "800", "530");
	var rect = paper.rect(270,0,550,530);
	rect.attr({
		fill : "#dff9ff",
		stroke:"none"
	});
	$.ajaxSetup({ cache: false });
	// récupération des pays issus du Json 
	$.getJSON("europe.json", function(data){ 
	// On mélange
	shuffle(data);
	//On boucle
	$.each(data, function(index, d){  
			// On crée les path svg de l'image à dragger (draggable), de la cible (target) et du nom (titre)
			var target = paper.path(d.path).attr({fill:"#ccc", stroke:"#ccc"}),
			draggable = paper.path(d.vignette);
			draggable.node.id = index;
			target.node.id= d.pays;
			var titre =	paper.text(50, 20, d.pays, paper.getFont("Times", 800), 60);
			
			titre.attr({"font-size": 24});
			titre.transform("t75, 0");
			// On met le premier de la liste en orange, les autres transparents
				if(index == data.length-1){
					draggable.attr({fill:"#CD853F", stroke:"none"});
					titre.attr({fill:"#f6f6f6"});
					var premierTitre = $(titre.node).text();
					if(premierTitre == "Russie") {
							$('#boite').hide();
							$('#boiteRussie').show();
							$('#titre').css('width', '301px');
							rect.transform("t50, 0");
							titre.transform("t100, 0");
					}
				}
				else {
					draggable.attr({fill:"none", stroke:"none"});
					titre.attr({fill:"none"});
				}
		// Les 3 fonction start, move et end liées au drag  
		var startPath = function () {
    	this.ox = 0;
    	this.oy = 0;
  	},
  	movePath = function (dx, dy) {
		  var trans_x = dx-this.ox;
		  var trans_y = dy-this.oy;
		  this.translate(trans_x,trans_y);
		  this.ox = dx;
		  this.oy = dy;
  	},
  	upPath = function (e, ui) {
			// Un petit transform pour augmenter la taille de la cible et donner une tolérance au drop
			var targB = target.transform("s1.2,1.2");
			// Utilisation de isPointInsideBBox pour vérifier l'intersection des path
			if ( Raphael.isPointInsideBBox(targB.getBBox(),draggable.getBBox().x, draggable.getBBox().y)){
				target.attr({fill : "#88C574", stroke:"#88C574"});
				ion.sound.play("button_tiny");
				score++;
				ajout++;
				if(ajout == 39){
					$.colorbox({html: function(){
  					if (score == 39) {
  					return '<img src="/drag/images/etoile5.png"/><span class="score">Score</span><img src="/drag/images/etoile5.png"/><br/><span class="total">' + score + ' / 44</span><br/><p>Score parfait !!</p>';
						} else if (score < 39 && score >= 35) {
  					return '<img src="/drag/images/etoile4.png"/><span class="score">Score</span><img src="/drag/images/etoile4.png"/><br/><span class="total">' + score + ' / 44</span><br/><p>Presque parfait, ça vaut le coup de re-tenter...</p>';
						} else if (score < 35 && score >= 25) {
  					return '<img src="/drag/images/etoile3.png"/><span class="score">Score</span><img src="/drag/images/etoile3.png"/><br/><span class="total">' + score + ' / 44</span><br/><p>Pas mal, encore un peu de pratique ?</p>';
						} else if (score < 25 && score >= 15) {
  					return '<img src="/drag/images/etoile2.png"/><span class="score">Score</span><img src="/drag/images/etoile2.png"/><br/><span class="total">' + score + ' / 44</span><br/><p>Il faut réviser un peu la géographie européenne, on dirait...</p>';
						} else if (score < 15) {
  					return '<img src="/drag/images/etoile.png"/><span class="score">Score</span><img src="/drag/images/etoile.png"/><br/><span class="total">' + score + ' / 44</span><br/><p>La géographie, c\'est pas ton truc, non ?</p>';
						}},
						width : '500px',
						height : '150px'    
					});
				}
				$('#score').text(score);
			} else {
				target.attr({fill : "#DF6E6E", stroke:"#DF6E6E"});
				ion.sound.play("tap");
				ajout++;
				if(ajout == 39){
					$.colorbox({
						html: function(){
  					if (score == 39) {
  					return '<img src="/drag/images/etoile5.png"/><span class="score">Score</span><img src="/drag/images/etoile5.png"/><br/><span class="total">' + score + ' / 44</span><br/><p>Score parfait !!</p>';
						} else if (score < 39 && score >= 35) {
  					return '<img src="/drag/images/etoile4.png"/><span class="score">Score</span><img src="/drag/images/etoile4.png"/><br/><span class="total">' + score + ' / 44</span><br/><p>Presque parfait, ça vaut le coup de re-tenter...</p>';
						} else if (score < 35 && score >= 25) {
  					return '<img src="/drag/images/etoile3.png"/><span class="score">Score</span><img src="/drag/images/etoile3.png"/><br/><span class="total">' + score + ' / 44</span><br/><p>Pas mal, encore un peu de pratique ?</p>';
						} else if (score < 25 && score >= 15) {
  					return '<img src="/drag/images/etoile2.png"/><span class="score">Score</span><img src="/drag/images/etoile2.png"/><br/><span class="total">' + score + ' / 44</span><br/><p>Il faut réviser un peu la géographie européenne, on dirait...</p>';
						} else if (score < 15) {
  					return '<img src="/drag/images/etoile.png"/><span class="score">Score</span><img src="/drag/images/etoile.png"/><br/><span class="total">' + score + ' / 44</span><br/><p>La géographie, c\'est pas ton truc, non ?</p>';
						}},
						width : '500px',
						height : '150px'  
				});
				}
			}   
			// On utilise l'index pour récupérer les prochains draggables et titres et les faire apparaitre
			if(index > 0) {
			var nextCountry = paper.getById(draggable.id-3);
			var nextTitre = paper.getById(draggable.id-2);
			var titreText = $(nextTitre.node).text();
			if(titreText == "Russie"){
				$('#boite').hide();
				$('#boiteRussie').show();
				$('#titre').css('width', '301px');
				rect.transform("t50, 0");
				nextTitre.transform("t100, 0");
			} else {
				$('#boite').show();
				$('#boiteRussie').hide();
				$('#titre').css('width', '246px');
				rect.transform("t0, 0");
			}				
			nextCountry.attr({fill:"#CD853F"}); 
			}
			else {
				var nextCountry = paper.getById(index+1);
			}
			nextCountry.toFront();
			if (index > 0){ 
				nextTitre.attr({fill:"#f6f6f6"}); 
			}
			titre.hide();
			draggable.hide();
			// on remet la cible aux bonnes proportions
			targB.transform("s1,1");
		}; 
		// On rend tout ça draggable
		draggable.drag(movePath, startPath, upPath);
		});
	});
	ion.sound({
		  sounds: [
		      {
		          name: "button_tiny"
		      },
					{
		          name: "tap"
		      }
		  ],
		  volume:0.5,
		  path: "sounds/",
		  preload: true
	});
});


