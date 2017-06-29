
<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" xml:lang="de">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js" type="text/javascript"></script>-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/osfunc.js"></script>
	<style>
	body { background-color: #111166; }
	.player { width: 200px;height: 40px;font-size: 20px; text-align: center; border: 1px solid #cacaca; background: url('images/za/bg.png') repeat-x scroll top left transparent; color: #fff;  float: left; }
	.player div {
		float: left;
	}
	.player .right {
		width: 155px;
		overflow: hidden;
	}
	.player .number {font-weight: bold; font-size: 30px; margin: 2px 0px 0px 5px; width: 40px; cursor: move;}
	.nocursor .number { cursor: auto; color: orange }
	.player .name {	padding: 0px; text-align: left; font-size: 14px; margin: 2px 0px 0px 5px; width: 200px; white-spaces:nobreak}
	.tor .name a {
		color: #FF0;
		text-decoration: none;
	}
	.abw .name a {
		color: #0F0;
		text-decoration: none;
	}
	.dmi .name a {
		color: #36F;
		text-decoration: none;
	}
	.mit .name a {
		color: #6FF;
		text-decoration: none;
	}
	.omi .name a {
		color: #F6F;
		text-decoration: none;
	}
	.stu .name a {
		color: #F00;
		text-decoration: none;
	}
	.player .stats {
		font-size: 13px;
		color: #fff;
		margin: 0px 5px;
		padding: 0px;
		text-align: left;
	}
	.helper {width: 50px;height: 50px;text-align: center; border: none; font-weight: bold; color: #116; background: url('images/za/Trikot-os-blau.png') no-repeat scroll top left transparent; cursor: move; z-index: 3; }
	.helper .number {
		font-size: 30px;
		color: #eee;
		font-weight: bold;
		margin: 5px;
		text-shadow: 0 -1px #000, 1px 0 #000, 0 1px #000, -1px 0 #000;
	}
	
	.abwhelper {
		background: url('images/za/Trikot-gruen.png') no-repeat scroll top left transparent;
	}
	
	.mithelper {
		background: url('images/za/Trikot-blau.png') no-repeat scroll top left transparent;
	}
	
	.stuhelper {
		background: url('images/za/Trikot-rot.png') no-repeat scroll top left transparent;
	}
	
	.torhelper {
		background: url('images/za/Trikot-gelb.png') no-repeat scroll top left transparent;
	}
	
	.ersatzhelper {
		background: url('images/za/Trikot-os-blau.png') no-repeat scroll top left transparent;
	}
	
	#sortable {
		width: 404px;
		margin-top: 50px;
	}
	#goal {
		color: #fff;
	}
	
	/* TABS */
	
	ul.ui-tabs-nav {
		width: 1027px;
		height: 40px;
		margin: 0px;
		padding: 0px;
	}
	
	ul.ui-tabs-nav li {
		display: block;
		float: left;
		width: 337px;
		height: 40px;
		border: 2px inset #CACACA;
		font-size: 30px;
		background: url("images/za/bg.png") repeat-x scroll left top transparent;
		text-align: center;
	}
	
	ul.ui-tabs-nav li.ui-tabs-selected {
		border: 2px ridge #CACACA;
	}
	
	ul.ui-tabs-nav li a {
		color: #fff;
		text-decoration: none;
	}
	
	ul.ui-tabs-nav li a:hover {
		color: #CACACA;
		text-decoration: underline;
	}
	
	div.ui-tabs-hide {
		display: none;
	}	
	</style>
	<script>
	var lastclear = '';
	function loadAufstellung() {
		if ($('#player_105508').length > 0) moveOneDropClone($('#player_105508'),6);
if ($('#player_111254').length > 0) moveOneDropClone($('#player_111254'),0);
if ($('#player_111249').length > 0) moveOneDropClone($('#player_111249'),1);
if ($('#player_68491').length > 0) moveOneDropClone($('#player_68491'),2);
if ($('#player_111245').length > 0) moveOneDropClone($('#player_111245'),3);
if ($('#player_110564').length > 0) moveOneDropClone($('#player_110564'),4);
if ($('#player_81726').length > 0) moveOneDropClone($('#player_81726'),5);
if ($('#player_75105').length > 0) moveFieldClone($('#player_75105'),2,3);
if ($('#player_83700').length > 0) moveFieldClone($('#player_83700'),2,7);
if ($('#player_87418').length > 0) moveFieldClone($('#player_87418'),5,2);
if ($('#player_106389').length > 0) moveFieldClone($('#player_106389'),5,8);
if ($('#player_41361').length > 0) moveFieldClone($('#player_41361'),7,5);
if ($('#player_89863').length > 0) moveFieldClone($('#player_89863'),9,2);
if ($('#player_45662').length > 0) moveFieldClone($('#player_45662'),9,8);
if ($('#player_92290').length > 0) moveFieldClone($('#player_92290'),12,2);
if ($('#player_58271').length > 0) moveFieldClone($('#player_58271'),12,5);
if ($('#player_100690').length > 0) moveFieldClone($('#player_100690'),12,8);
countSpieler();
	}
	
	function moveFieldClone(sp, top, left) {
		if (!sp.hasClass('nocursor') && !sp.hasClass('amateur'))
				sp.toggleClass('nocursor');
		if ($(sp).hasClass("amateur")) {
			for (var i = 1; i<= 99; i++) {
				if ( $('#helper_amateur_'+i).length == 0) break;
			}
			$item = $( "<div class='helper amateur' origin='"+$(sp).attr('id')+"' title='Amateur' id='helper_amateur_"+i+"'>"+$(sp).children('.number')[0].outerHTML+"</div>" );
		} else {
			$item = $( "<div class='helper "+$(sp).attr('id')+"' origin='"+$(sp).attr('id')+"' title='"+$(sp).find("p.name a").html()+"' id='helper_"+$(sp).attr('id')+"'>"+$(sp).children('.number')[0].outerHTML+"</div>" );
		}
		top = top * 45;
		left = left * 45;
		var h = $('#field').innerHeight()-6;
		top = Math.round((h/15)*Math.round(top/(h/15)));
		var w = $('#field').innerWidth() - 5;
		left = Math.round((w/11)*Math.round(left/(w/11)));
		if (top >= Math.round(h/15)*10) $item.toggleClass('abwhelper');
		else if (top >= Math.round(h/15)*5) $item.toggleClass('mithelper');
		else $item.toggleClass('stuhelper');
		$item.css('top',top);
		$item.css('left',left);
		$item.css('position','absolute');
		$('#field').append($item);
		
	}
	function moveOneDropClone(sp, nr) {
		if (!sp.hasClass('nocursor') && !sp.hasClass('amateur'))
			sp.toggleClass('nocursor');
		if ($(sp).hasClass("amateur")) {
			for (var i = 1; i<= 99; i++) {
				if ( $('#helper_amateur_'+i).length == 0) break;
			}
			$item = $( "<div class='helper amateur' origin='"+$(sp).attr('id')+"' title='Amateur' id='helper_amateur_"+i+"'>"+$(sp).children('.number')[0].outerHTML+"</div>" );
		} else {
			$item = $( "<div class='helper "+$(sp).attr('id')+"' origin='"+$(sp).attr('id')+"' title='"+$(sp).find("p.name a").html()+"' id='helper_"+$(sp).attr('id')+"'>"+$(sp).children('.number')[0].outerHTML+"</div>" );
		}			
		if (nr == 5 || nr == 6) $item.toggleClass('torhelper');
		else $item.toggleClass('ersatzhelper');
		$item.css('position','absolute');
		$item.css('top',1);
		$item.css('left',1);
		$('.oneDrop').eq(nr).append($item);
	}
	$(function() {	
		$('#sortable > div').draggable({connectToSortable:'#sortable', revert: 'invalid', cursorAt: {top:25, left: 25}, handle: 'div.number', helper: function( event ) {
			var $a = $(this);
			if ($(this).hasClass("amateur")) {
				for (var i = 1; i<= 99; i++) {
					if ( $('#helper_amateur_'+i).length == 0) break;
				}
				return $( "<div class='helper amateur' origin='"+event.currentTarget.id+"' title='Amateur' id='helper_amateur_"+i+"'>"+event.currentTarget.childNodes[0].outerHTML+"</div>" );
			} else {
				return $( "<div class='helper "+event.currentTarget.id+"' origin='"+event.currentTarget.id+"' title='"+$(event.currentTarget).find("p.name a").html()+"' id='helper_"+event.currentTarget.id+"'>"+event.currentTarget.childNodes[0].outerHTML+"</div>" );
			}
		}, start: function ( event ) {
			if ($('.'+event.currentTarget.id).length > 1) {return false; }
		}});
		$('#sort').sortable();
		$('#field').droppable({
			drop: function( event, ui ) {
				if (ui.draggable.hasClass('helper')) 
				{
					var $item = ui.draggable;
				} else {
					var $item = ui.helper.clone();
					if (!ui.draggable.hasClass('nocursor') && !ui.draggable.hasClass('amateur'))
						ui.draggable.toggleClass('nocursor');
				}
				var left = ui.offset.left - $('#field').position().left;
				var w = $('#field').innerWidth() - 5;
				left = Math.round((w/11)*Math.round(left/(w/11)));
				if (left > (w/11)*10) left = (w/11)*10;
				if (left < 0) left = 0;
				$item.css('left',left);
				var top = ui.offset.top - 50- $('#field').position().top;
				var h = $('#field').innerHeight()-6;
				top = Math.round((h/15)*Math.round(top/(h/15)));
				if (top > (h/15)*14) top = (h/15)*14;
				if (top < 0) top = 0;
				$item.css('top',top);

				if (top >= Math.round(h/15)*10) $item.toggleClass('abwhelper');
				else if (top >= Math.round(h/15)*5) $item.toggleClass('mithelper');
				else $item.toggleClass('stuhelper');
				
				$(this).find('.helper').each(function(id, elem) {
					if ($(this).position().top == top && $(this).position().left == left && elem.id != $item.attr('id')) {
						$(this).dblclick();
					}
				})
				$('#'+$item.attr('id')).remove();

				$(this).append($item[0].outerHTML);
				if ($(this).children().length > 10) alert('Es sind mehr als 10 Spieler am Feld aufgestellt!');
				countSpieler();
				initJs();
			}
		});
		$('.oneDrop').droppable({
			drop: function( event, ui ) {
				if (ui.draggable.hasClass('helper')) 
				{
					$item = ui.draggable;
				} else {
					var $item = ui.helper.clone();
					if (!ui.draggable.hasClass('nocursor') && !ui.draggable.hasClass('amateur'))
						ui.draggable.toggleClass('nocursor');
				}
				$item.css('left',1);
				$item.css('top',1);
				
				if ($(this).attr('id') == 'goal' || $(this).attr('id') == 'ersatz_goal') {
					$item.toggleClass('torhelper');
				} else {
					$item.toggleClass('ersatzhelper');
				}
				
				$('#'+$item.attr('id')).remove();
				if ($(this).children().length > 0) {
					$(this).find('.helper').dblclick();
				}
				$(this).html($item[0].outerHTML);
				countSpieler();
				initJs();
			}
		});
		$('input[name="delete"]').click(function() {
			$('div.helper').dblclick();
		});
		
		$('input[name="save"]').click(function() {
			//alert('Speichern [nur Demo!]');
			var aufstellung = new Array();
			var error = false;
			var tor = $('#goal').children();
			if (tor.length != 1) { alert('Du musst einen Torwart aufstellen!'); error = true; }
			else aufstellung.push(new Array($(tor).eq(0).attr('origin'),0,0));
			var feld = $('#field').children();
			if (feld.length != 10) { alert('Du musst genau 10 Feldspieler aufstellen!'); error = true; }
			else {
				for (var i = 0; i<10; i++) {
					var s = feld.eq(i);
					var pos = s.position();
					var left = Math.round(pos.left/45)+1;
					var top = Math.round(pos.top/45)+1;
					aufstellung.push(new Array($(s).attr('origin'),left,top));
				};
			}
			var ersatz = $('#ersatz div').children('.helper');
			if (ersatz.length != 6) { alert('Du musst genau 6 Ersatzspieler aufstellen!'); error = true; }
			else $.each($(ersatz), function(i,v) {
				aufstellung.push(new Array($(v).attr('origin'),i*(-1),-1));
			});
			
			if (error == false) {
				$('input[name="aufstellung"]').val(JSON.stringify(aufstellung));
				$('input[name="aufstellung"]').parent('form').submit();
			}
		});
		$('#tabs').tabs();
		loadAufstellung();
		initJs();
	});
	
	function countSpieler() {
		var spieler = 0;
		var alter = 0;
		var skill = 0;
		var opti = 0;
		
		$('#field').children().each(function() {
			spieler = spieler + 1;
			var origin = $(this).attr('origin');
			alter = alter + parseFloat($('#'+origin).find('.alter').html());
			skill = skill + parseFloat($('#'+origin).find('.skill').html());
			opti = opti + parseFloat($('#'+origin).find('.opti').html());
		});
		
		$('#goal').children().each(function() {
			spieler = spieler + 1;
			var origin = $(this).attr('origin');
			alter = alter + parseFloat($('#'+origin).find('.alter').html());
			skill = skill + parseFloat($('#'+origin).find('.skill').html());
			opti = opti + parseFloat($('#'+origin).find('.opti').html());
		});
		
		if (spieler == 0) {
			var alterCount = 0;
			var skillCount = 0;
			var optiCount = 0;
		} else {
			var alterCount = Math.round(100 * (alter / spieler))/100;
			var skillCount = Math.round(100 * (skill / spieler))/100;
			var optiCount = Math.round(100 * (opti / spieler))/100;
		}
		
		$('span.aufgestelltCount').html(spieler);
		$('span.alterCount').html(alterCount);
		$('span.skillCount').html(skillCount);
		$('span.optiCount').html(optiCount);
	}
	
	function initJs() {
		$(".helper").dblclick(function() {
			var $id = $(this).attr('origin');
			if ($('#'+$id).hasClass('nocursor'))
				$('#'+$id).toggleClass('nocursor');
			var l = $(this).offset().left;
			var t = $(this).offset().top;
			
			var o = $(this).attr('origin');
			//alert(o);
			var nl = $('#'+o).offset().left;
			var nt = $('#'+o).offset().top;
			var diffl = nl - l;
			var difft = nt - t;
			
			//alert(t + ' : ' + l + ' / ' + nt + ' : ' + nl + ' / ' + difft + ' : '+diffl);
			
			$(this).animate({
				left: '+='+diffl,
				top: '+='+difft
			}, 500, function() {
				$(this).remove();
			});
			setTimeout(function(){countSpieler();}, 600);
		});
		$('.helper').draggable({cursorAt: {top:25, left: 25}, start: function( event ) {
			clearClass($(this));
		}, revert: function(is_valid_drop){
			$(this).toggleClass(lastclear);
			return true;
		}
		});
	}
	
	function clearClass($item) {
		if ($item.hasClass('abwhelper')) {
			$item.toggleClass('abwhelper');
			lastclear = 'abwhelper';
		}
		
		if ($item.hasClass('mithelper')) {
			$item.toggleClass('mithelper');
			lastclear = 'mithelper';
		}
		
		if ($item.hasClass('stuhelper')) {
			$item.toggleClass('stuhelper');
			lastclear = 'stuhelper';
		}
		
		if ($item.hasClass('torhelper')) {
			$item.toggleClass('torhelper');
			lastclear = 'torhelper';
		}
		
		if ($item.hasClass('ersatzhelper')) {
			$item.toggleClass('ersatzhelper');
			lastclear = 'ersatzhelper';
		}
	}
</script>
</head>
<body>
	<p><span style="color: red; font-weight: bold; font-size: 24px">ACHTUNG! Diese Seiten sind noch in Entwicklung und k&ouml;nnen daher Fehler aufweisen! <br />
	Bitte die Zugabgabe in jedem Fall im Orginal-Formular nachpr&uuml;fen!</span></p>
	<p style="color: white">Eine Kurzanleitung:
	<ul style="color: white">
	<li>Ausgew&auml;hlten Spieler &uuml;ber Druck auf die R&uuml;ckennummer ausw&auml;hlen. Es sollte ein Trikot unter der Maus erscheinen.</li>
	<li>Maus gedr&uuml;ckt halten und Spieler an die gew&uuml;nschte Position ziehen.</li>
	<li>Der Torwart sizt unten, zentral unterhalb des Feldes, die St&uuml;rmer stehen oben.</li>
	<li>Die Ersatzspieler k&ouml;nnen links neben dem Feld auf den mit den Trikots markierten Feldern platziert werden, Der Ersatztorwart steht dabei ganz unten.</li>
	<li>Um die Aufstellung abzuschlie&szlig;en unten auf "Aufstellung speichern" dr&uuml;cken. Es m&uuml;ssen daf&uuml;r alle Positionen besetzt sein.</li>
	<li>Ein Spieler der auf die Position eines anderen Spielers gezogen wird ersetzt diesen, die Spieler tauschen nicht Platz</li>
	<li>Ein Spieler kann mit einem Doppelklick vom Spielfeld gel&ouml;scht werden</li>
	<li>Wenn die Maus &uuml;ber das Spielertrikot gezogen wird erscheint der Name des Spielers</li>
	<li>Legende zu den Spielerdaten: Alter / Skill / Opti / FIT / MOR</li>
	<li>Legende f&uuml;r die Spielerpositionen: Gelb: Torwart / Ersatztorwart, Gr&uuml;n: Abwehr, Hellblau: Mittelfeld, Rot: Sturm, Dunkelblau: Ersatzspieler</li>
	<li>Positionsbezogene Abz&uuml;ge werden f&uuml;r die Durchschnittswerte nicht beachtet.</li>
	</ul>
	</p>
	<form method = "POST" action="zugabgabe_beta.php" style="display: none">
		<input type="hidden" name="aufstellung" value="" />
	</form>
	<div id="tabs">
		<ul>
			<li><a href="#aufstellung">Aufstellung</a></li>
			<li><a href="#einstellungen">Einstellungen</a></li>
			<li><a href="#aktionen">Aktionen</a></li>
		</ul>
		<div id="aufstellung">
				<div style="width: 1027px; height: 780px; float: left; background: url('images/za/Spielfeld.png') no-repeat scroll top left transparent;">
				<div id="ersatz" style="float: left; width: 80px; height: 430px; margin-top: 332px;">
					<div class="drop oneDrop" style="position: relative; width:52px; height: 52px; margin-bottom: 18px"></div>
					<div class="drop oneDrop" style="position: relative; width:52px; height: 52px; margin-bottom: 18px"></div>
					<div class="drop oneDrop" style="position: relative; width:52px; height: 52px; margin-bottom: 18px"></div>
					<div class="drop oneDrop" style="position: relative; width:52px; height: 52px; margin-bottom: 18px"></div>
					<div class="drop oneDrop" style="position: relative; width:52px; height: 52px; margin-bottom: 18px"></div>
					<div class="drop oneDrop" id="ersatz_goal" style="position: relative; width:52px; height: 52px; margin-bottom: 18px"></div>
				</div>
				<div style="float: left; width: 503px; height: 782px;margin-right: 40px; ">
					<div class="drop" id="field" style="width: 503px; height: 682px; position: relative; margin-top: 50px;" >
						
					</div>
					<div style="width: 503px;">
						<div class="drop oneDrop" id="goal" style="width: 52px; height: 52px; margin: 0px 225px; position: relative; z-index: 2;">
						</div>
					</div>
				</div>
				<div id="sortable" style="position: relative;float: left;width: 404px" >
					<div class="player tor" id="player_41930"><div class="number">1</div><div class="right"><p class="name"><a href="sp.php?s=41930" onclick="spielerinfo(41930); return false">Steve Stapleton</a></p><p class="stats"><span class="alter">28</span>j / <span class="skill">55.76</span> / <span class="opti">85.48</span>/ <span class="fit">73</span> / <span class="mor">99</span></p></div></div><div class="player tor" id="player_81726"><div class="number">33</div><div class="right"><p class="name"><a href="sp.php?s=81726" onclick="spielerinfo(81726); return false">Anthony Madden</a></p><p class="stats"><span class="alter">24</span>j / <span class="skill">50.71</span> / <span class="opti">81.85</span>/ <span class="fit">99</span> / <span class="mor">99</span></p></div></div><div class="player tor" id="player_105508"><div class="number">0</div><div class="right"><p class="name"><a href="sp.php?s=105508" onclick="spielerinfo(105508); return false">Christopher McCann</a></p><p class="stats"><span class="alter">20</span>j / <span class="skill">39.29</span> / <span class="opti">65.93</span>/ <span class="fit">99</span> / <span class="mor">98</span></p></div></div><div class="player abw" id="player_4147"><div class="number">20</div><div class="right"><p class="name"><a href="sp.php?s=4147" onclick="spielerinfo(4147); return false">Willie Cragg</a></p><p class="stats"><span class="alter">30</span>j / <span class="skill">52.29</span> / <span class="opti">79.15</span>/ <span class="fit">99</span> / <span class="mor">99</span></p></div></div><div class="player abw" id="player_58271"><div class="number">28</div><div class="right"><p class="name"><a href="sp.php?s=58271" onclick="spielerinfo(58271); return false">Karl Fitzgerald</a></p><p class="stats"><span class="alter">25</span>j / <span class="skill">48.12</span> / <span class="opti">77.85</span>/ <span class="fit">99</span> / <span class="mor">95</span></p></div></div><div class="player abw" id="player_58642"><div class="number">29</div><div class="right"><p class="name"><a href="sp.php?s=58642" onclick="spielerinfo(58642); return false">Ian Quigley</a></p><p class="stats"><span class="alter">26</span>j / <span class="skill">57.35</span> / <span class="opti">85.44</span>/ <span class="fit">47</span> / <span class="mor">99</span></p></div></div><div class="player abw" id="player_60807"><div class="number">4</div><div class="right"><p class="name"><a href="sp.php?s=60807" onclick="spielerinfo(60807); return false">Roman OLeary</a></p><p class="stats"><span class="alter">26</span>j / <span class="skill">61.12</span> / <span class="opti">88.56</span>/ <span class="fit">47</span> / <span class="mor">99</span></p></div></div><div class="player abw" id="player_92290"><div class="number">0</div><div class="right"><p class="name"><a href="sp.php?s=92290" onclick="spielerinfo(92290); return false">Clinton Reid</a></p><p class="stats"><span class="alter">21</span>j / <span class="skill">42.12</span> / <span class="opti">76.59</span>/ <span class="fit">99</span> / <span class="mor">98</span></p></div></div><div class="player abw" id="player_100065"><div class="number">0</div><div class="right"><p class="name"><a href="sp.php?s=100065" onclick="spielerinfo(100065); return false">Niall Mannion</a></p><p class="stats"><span class="alter">21</span>j / <span class="skill">47.00</span> / <span class="opti">81.30</span>/ <span class="fit">47</span> / <span class="mor">99</span></p></div></div><div class="player abw" id="player_100690"><div class="number">0</div><div class="right"><p class="name"><a href="sp.php?s=100690" onclick="spielerinfo(100690); return false">Darren Dempsey</a></p><p class="stats"><span class="alter">21</span>j / <span class="skill">44.59</span> / <span class="opti">67.33</span>/ <span class="fit">99</span> / <span class="mor">66</span></p></div></div><div class="player abw" id="player_111254"><div class="number">0</div><div class="right"><p class="name"><a href="sp.php?s=111254" onclick="spielerinfo(111254); return false">Paul Stewart</a></p><p class="stats"><span class="alter">18</span>j / <span class="skill">42.53</span> / <span class="opti">65.74</span>/ <span class="fit">99</span> / <span class="mor">99</span></p></div></div><div class="player dmi" id="player_29915"><div class="number">1</div><div class="right"><p class="name"><a href="sp.php?s=29915" onclick="spielerinfo(29915); return false">Gerard Paisley</a></p><p class="stats"><span class="alter">31</span>j / <span class="skill">63.82</span> / <span class="opti">87.15</span>/ <span class="fit">47</span> / <span class="mor">99</span></p></div></div><div class="player dmi" id="player_43418"><div class="number">1</div><div class="right"><p class="name"><a href="sp.php?s=43418" onclick="spielerinfo(43418); return false">Martin Downey</a></p><p class="stats"><span class="alter">26</span>j / <span class="skill">56.18</span> / <span class="opti">84.41</span>/ <span class="fit">46</span> / <span class="mor">99</span></p></div></div><div class="player dmi" id="player_45479"><div class="number">21</div><div class="right"><p class="name"><a href="sp.php?s=45479" onclick="spielerinfo(45479); return false">Joseph Mulligan</a></p><p class="stats"><span class="alter">25</span>j / <span class="skill">51.29</span> / <span class="opti">80.44</span>/ <span class="fit">-3</span> / <span class="mor">99</span></p></div></div><div class="player dmi" id="player_45662"><div class="number">23</div><div class="right"><p class="name"><a href="sp.php?s=45662" onclick="spielerinfo(45662); return false">Christopher Donovan</a></p><p class="stats"><span class="alter">26</span>j / <span class="skill">44.35</span> / <span class="opti">75.48</span>/ <span class="fit">77</span> / <span class="mor">98</span></p></div></div><div class="player dmi" id="player_89863"><div class="number">31</div><div class="right"><p class="name"><a href="sp.php?s=89863" onclick="spielerinfo(89863); return false">Robert Higgins</a></p><p class="stats"><span class="alter">22</span>j / <span class="skill">38.71</span> / <span class="opti">72.52</span>/ <span class="fit">99</span> / <span class="mor">95</span></p></div></div><div class="player dmi" id="player_111249"><div class="number">0</div><div class="right"><p class="name"><a href="sp.php?s=111249" onclick="spielerinfo(111249); return false">Owen Deeney</a></p><p class="stats"><span class="alter">19</span>j / <span class="skill">39.71</span> / <span class="opti">65.74</span>/ <span class="fit">85</span> / <span class="mor">25</span></p></div></div><div class="player mit" id="player_41361"><div class="number">24</div><div class="right"><p class="name"><a href="sp.php?s=41361" onclick="spielerinfo(41361); return false">Conrad Nash</a></p><p class="stats"><span class="alter">27</span>j / <span class="skill">53.41</span> / <span class="opti">81.63</span>/ <span class="fit">99</span> / <span class="mor">97</span></p></div></div><div class="player mit" id="player_65138"><div class="number">25</div><div class="right"><p class="name"><a href="sp.php?s=65138" onclick="spielerinfo(65138); return false">Clifford Murphy</a></p><p class="stats"><span class="alter">24</span>j / <span class="skill">40.88</span> / <span class="opti">73.89</span>/ <span class="fit">99</span> / <span class="mor">99</span></p></div></div><div class="player mit" id="player_75108"><div class="number">32</div><div class="right"><p class="name"><a href="sp.php?s=75108" onclick="spielerinfo(75108); return false">Anthony Downes</a></p><p class="stats"><span class="alter">24</span>j / <span class="skill">53.06</span> / <span class="opti">83.19</span>/ <span class="fit">47</span> / <span class="mor">99</span></p></div></div><div class="player mit" id="player_113417"><div class="number">0</div><div class="right"><p class="name"><a href="sp.php?s=113417" onclick="spielerinfo(113417); return false">Shay Masterson</a></p><p class="stats"><span class="alter">17</span>j / <span class="skill">22.94</span> / <span class="opti">36.81</span>/ <span class="fit">99</span> / <span class="mor">0</span></p></div></div><div class="player omi" id="player_41344"><div class="number">34</div><div class="right"><p class="name"><a href="sp.php?s=41344" onclick="spielerinfo(41344); return false">Darragh Johnston</a></p><p class="stats"><span class="alter">27</span>j / <span class="skill">50.94</span> / <span class="opti">80.81</span>/ <span class="fit">48</span> / <span class="mor">99</span></p></div></div><div class="player omi" id="player_68491"><div class="number">8</div><div class="right"><p class="name"><a href="sp.php?s=68491" onclick="spielerinfo(68491); return false">Gareth Lyons</a></p><p class="stats"><span class="alter">26</span>j / <span class="skill">59.47</span> / <span class="opti">87.37</span>/ <span class="fit">48</span> / <span class="mor">99</span></p></div></div><div class="player omi" id="player_87418"><div class="number">17</div><div class="right"><p class="name"><a href="sp.php?s=87418" onclick="spielerinfo(87418); return false">Richie Brown</a></p><p class="stats"><span class="alter">22</span>j / <span class="skill">48.06</span> / <span class="opti">81.22</span>/ <span class="fit">99</span> / <span class="mor">95</span></p></div></div><div class="player omi" id="player_106389"><div class="number">0</div><div class="right"><p class="name"><a href="sp.php?s=106389" onclick="spielerinfo(106389); return false">Gleeson Lynch</a></p><p class="stats"><span class="alter">19</span>j / <span class="skill">46.35</span> / <span class="opti">78.37</span>/ <span class="fit">99</span> / <span class="mor">98</span></p></div></div><div class="player stu" id="player_519"><div class="number">30</div><div class="right"><p class="name"><a href="sp.php?s=519" onclick="spielerinfo(519); return false">Wes Robinson</a></p><p class="stats"><span class="alter">32</span>j / <span class="skill">45.94</span> / <span class="opti">73.67</span>/ <span class="fit">99</span> / <span class="mor">97</span></p></div></div><div class="player stu" id="player_30081"><div class="number">14</div><div class="right"><p class="name"><a href="sp.php?s=30081" onclick="spielerinfo(30081); return false">Jonathan Croly</a></p><p class="stats"><span class="alter">31</span>j / <span class="skill">56.24</span> / <span class="opti">82.37</span>/ <span class="fit">48</span> / <span class="mor">99</span></p></div></div><div class="player stu" id="player_46019"><div class="number">9</div><div class="right"><p class="name"><a href="sp.php?s=46019" onclick="spielerinfo(46019); return false">Rory Francis</a></p><p class="stats"><span class="alter">28</span>j / <span class="skill">59.47</span> / <span class="opti">85.59</span>/ <span class="fit">48</span> / <span class="mor">99</span></p></div></div><div class="player stu" id="player_75105"><div class="number">18</div><div class="right"><p class="name"><a href="sp.php?s=75105" onclick="spielerinfo(75105); return false">Gavin Sheehan</a></p><p class="stats"><span class="alter">25</span>j / <span class="skill">49.29</span> / <span class="opti">81.26</span>/ <span class="fit">95</span> / <span class="mor">99</span></p></div></div><div class="player stu" id="player_83700"><div class="number">19</div><div class="right"><p class="name"><a href="sp.php?s=83700" onclick="spielerinfo(83700); return false">Nick Keogh</a></p><p class="stats"><span class="alter">23</span>j / <span class="skill">47.47</span> / <span class="opti">77.74</span>/ <span class="fit">99</span> / <span class="mor">98</span></p></div></div><div class="player stu" id="player_110564"><div class="number">0</div><div class="right"><p class="name"><a href="sp.php?s=110564" onclick="spielerinfo(110564); return false">Ross Manning</a></p><p class="stats"><span class="alter">18</span>j / <span class="skill">44.35</span> / <span class="opti">69.11</span>/ <span class="fit">99</span> / <span class="mor">95</span></p></div></div><div class="player stu" id="player_111245"><div class="number">0</div><div class="right"><p class="name"><a href="sp.php?s=111245" onclick="spielerinfo(111245); return false">Trevor Scanlon</a></p><p class="stats"><span class="alter">19</span>j / <span class="skill">46.76</span> / <span class="opti">68.85</span>/ <span class="fit">99</span> / <span class="mor">25</span></p></div></div><div class="player stu" id="player_113415"><div class="number">0</div><div class="right"><p class="name"><a href="sp.php?s=113415" onclick="spielerinfo(113415); return false">Jim Thornton</a></p><p class="stats"><span class="alter">18</span>j / <span class="skill">34.94</span> / <span class="opti">44.07</span>/ <span class="fit">99</span> / <span class="mor">0</span></p></div></div>					
					<div class="player amateur" id="player_0"><div class="number">A</div><div class="right"><p class="name">Amateur</p><p class="stats"><span class="alter">18</span>j / <span class="skill">20.00</skill> / <span class="opti">20.00</spani> / <span class="fit">99</span> / <span class="mor">99</span></p></div></div>
				</div>
			</div>
			<div style="width: 503px; text-align:center; margin-left: 80px;">
				<input type="button" name="save" value="Aufstellung speichern" />
				<input type="button" name="delete" value="Aufstellung l&ouml;schen" />
			</div>
			<div style="width: 503px; text-align:center; margin-left: 80px; color: #fff;">
				Aufgestellt: <span class="aufgestelltCount">0</span> | &#216;Alter: <span class="alterCount">0</span> | &#216;Skill: <span class="skillCount">0</span> | &#216;Opti: <span class="optiCount">0</span>
			</div>
		</div>
		<div id="einstellungen">
		</div>
		<div id="aktionen">
		</div>
	</div>
</body>
</html>