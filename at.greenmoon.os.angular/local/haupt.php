<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"

        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="de" xml:lang="de">

<head>

<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />

<title>Online-Soccer 2.0</title>

<script src="js/sorttable.js" type="text/javascript"></script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>

<link rel="STYLESHEET" type="text/css" href="js/dxhtml/codebase/dhtmlxgrid.css">

<link rel="stylesheet" href="css/os_styles.css" />

<link rel="stylesheet" href="css/print.css" media="print" />

<link rel="SHORTCUT ICON" href="images/favicon.ico" type="image/ico" />

<script type="text/javascript" src="js/osfunc.js"></script>

</head>

<body><div>
<p class="noprint" id="TopThema"><iframe src="//rcm-eu.amazon-adsystem.com/e/cm?t=onlinsocce20-21&o=3&p=48&l=ur1&category=lastminuteangebote&banner=0EW5EC41V3DT7ETYVWG2&f=ifr" width="728" height="90" scrolling="no" border="0" marginwidth="0" style="border:none;max-width:800px;max-height:600px;" frameborder="0"></iframe></p><script src="js/livepipe/lib/prototype.js" type="text/javascript"></script>

<script src="js/livepipe/src/livepipe.js" type="text/javascript"></script>

<script src="js/livepipe/src/tabs.js" type="text/javascript"></script>

<script src="js/scriptaculous/lib/prototype.js" type="text/javascript"></script>

<script src="js/scriptaculous/src/scriptaculous.js" type="text/javascript"></script>

<script src="js/scriptaculous/src/effects.js" type="text/javascript"></script>

<script src="js/scriptaculous/src/controls.js" type="text/javascript"></script>



<script type="text/javascript">

function saveNotes() {

	var notes = document.getElementById('notes').value;

	new Ajax.Updater('notemsg', 'rpc.php', {method: 'post', postBody:'action=saveNotes&notes='+escape(notes)});

}

function changeNotes() {

	document.getElementById('notemsg').innerHTML = '';

}

top.window.os_wappen.location.reload(true);

</script>

<style>



div.autocomplete {

  position:absolute;

  width:250px;

  background-color:#FEF1B5

  color:black;

  border:1px solid #888;

  margin:0;

  padding:0;

}

div.autocomplete ul {

  list-style-type:none;

  margin:0;

  padding:0;

}

div.autocomplete ul li.selected { background-color: blue;}

div.autocomplete ul li {

  list-style-type:none;

  display:block;

  margin:0;

  padding:2px;

  height:42px;

  cursor:pointer;

}



ul.subsection_tabs{

	list-style:none;

	margin:0 0 5px 0;

	padding:0;

	clear:both;

	border-bottom:1px solid #ccc;

	height:20px;clear:both

}



ul.subsection_tabs li.tab{

	float:left;

	margin-right:7px;

	text-align:center

}



ul.subsection_tabs li.tab a{

	display:block;

	height:20px;

	padding:0 6px 0 6px;

	color:#FBF9B3;

	width:150px

}



ul.subsection_tabs li.tab a:hover{

	color:red;

}



ul.subsection_tabs li.tab a.active{

	background-color:#FBF9B3;

	color:#111166;

}



ul.order {

	list-style:none;

}



table.caltable td {

	border: 1px solid #aaaaaa;

	border-collapse: collapse;

	width: 100px;

	height: 100px;

	vertical-align: top;

}



table.caltable td.currentday {

	background-color:#990000;

}

</style>



<ul id="te" class="subsection_tabs">  

	<li class="tab"><a href="#a">B&uuml;ro</a></li>  

	<li class="tab"><a href="#b">Kalender</a></li>  

	<li class="tab"><a href="#c">Spielerbeobachtung</a></li>  

	<li class="tab"><a href="#d">Notizblock</a></li>  

</ul>  



<div id="a" width="650px">

<table border="0" width="650px">

	<tr>

		<td>

			<table border="0" width="100%">

				<tr>

					<td><img src="images/wappen/00000019.png" height="75" width="75"></td>

					<td valign="bottom" align="center"><b>Willkommen im Managerb&uuml;ro von FC Cork</b><br>2. Liga A Belgien<a href="?changetosecond=true"><br />Zu FC Nivelois wechseln</a><br><br><a href="http://os.ongapo.com/forum/index.php?page=Board&boardID=41" target="_blank">Zum L&auml;nderforum</a><br /></td>

					<td><img src="images/wappen/00000019.png" height="75" width="75"></td>

			</table>

		</td>

	</tr>

	<tr>

		<td></td>

	</tr>

	<tr>

		<td style="color:orange">

			<b>Der n&auml;chste ZAT ist ZAT 35 und liegt auf Dienstag, den 9. Mai 2017 ab 19:30 Uhr.</b>

		</td>

	</tr>

	<tr>

		<td>&nbsp;</td>

	</tr>

	<tr>

		<td>

			<table border="0" cellspacing="0" cellpadding="0">

				<tr>

					<td style="color:orange"><b>Dein letztes Spiel:&nbsp;</b></td>

					<td class="TOR">Liga  Ausw&auml;rts:&nbsp;</td>

					<td><a href="javascript:teaminfo(411);">AA Oud-Heverlee</a> <a href="javascript:os_bericht(411,57,34,11)">(Spielbericht)</a></td>

				</tr>

			</table>

		</td>

	</tr>

	<tr>

		<td>

			<table border="0" cellspacing="0" cellpadding="0">

				<tr>

					<td style="color:orange"><b>Dein n&auml;chstes Spiel:&nbsp;</b></td>

					<td class="OMI">Friendly  Ausw&auml;rts:&nbsp;</td>

					<td><a href="javascript:teaminfo(245);">Mechelen 01</a> (Vorschau nicht m&ouml;glich)</td>

				</tr>

			</table>

		</td>

	</tr>

	<tr>

		<td>

			<table border="0" cellspacing="0" cellpadding="0">

				<tr>

					<td style="color:orange"><b>Deine Spiele in</b></td>

					<td>&nbsp;</td>

					<td><a href="livegame/index.php?spiele=57,34">LIVEGAME</a></td>

				</tr>

			</table>

		</td>

	</tr>

	<tr>

		<td>&nbsp;</td>

	</td>

	<tr>

		<td align="center">

			<table border="1" style="Border-collapse:collapse;border-color:#AAAAAA" cellpadding="5">

				<tr>

					<td>Logins</td>

					<td>Zugabgabe</td>

					<td>Kontostand</td>

					<td>PMs</td>

					<td>FSS-Einladungen</td>

					<td>NMR (5/20/alle)</td>

				</tr>

				<tr>

					<td>2796</td>

					<td class="ABW"><a href="zugabgabe.php">G&uuml;ltig</a></td>

					<td class="ABW"><a href="ka.php">7.470.845 Euro</a></td>

					<td class="LEI"><a href="pm.php">0 neu</a></td>

					<td class="LEI"><a href="friendly.php">0 neue Einladungen</a></td>

					<td>0 / 0 / 0</td>

			</table>

		</td>

	</tr>

	<tr>

		<td>&nbsp;</td>

	</tr>

	<tr>

		<td class="STU"><b></b></td>

	</tr>

	<tr>

		<td style="color:orange">

			<b>Tipp des Tages:</b><br>Wusstest du, dass man im Forum mit der Suchfunktion oft schneller an die Antwort kommst?

		</td>

	</tr>

</table>

</div>

<div id="b">

	<script type="text/javascript">

function loadCal() {

	document.getElementById('insertEvent').style.display='none';

	var month = document.getElementById('month').options[document.getElementById('month').selectedIndex].value;

	var year = document.getElementById('year').options[document.getElementById('year').selectedIndex].value;

	document.getElementById('monthhidden').value=month;

	document.getElementById('yearhidden').value=year;

	new Ajax.Updater('cal', 'rpc.php', {method: 'post', postBody:'action=startCalendar&month='+month+'&year='+year});

	document.getElementById('details').innerHTML='';

}



function calSelect(day) {

	document.getElementById('e1v').value=0;

	document.getElementById('e1').value='';

	document.getElementById('e2v').value=0;

	document.getElementById('e2').value='';

	document.getElementById('e3v').value=0;

	document.getElementById('e3').value='';

	document.getElementById('e4v').value=0;

	document.getElementById('e4').value='';

	document.getElementById('e5v').value=0;

	document.getElementById('e5').value='';

	document.getElementById('e6v').value=0;

	document.getElementById('e6').value='';

	document.getElementById('e7v').value=0;

	document.getElementById('e7').value='';

	document.getElementById('e8v').value=0;

	document.getElementById('e8').value='';

	document.getElementById('e9v').value=0;

	document.getElementById('e9').value='';

	document.getElementById('e10v').value=0;

	document.getElementById('e10').value='';

	

	document.getElementById('U1').value=00;

	document.getElementById('U2').value=00;

	

	document.getElementById('intitel').value='';

	document.getElementById('intext').value='';



	document.getElementById('details').innerHTML = '';

	//alert('Show');

	var month = document.getElementById('monthhidden').value;

	var year = document.getElementById('yearhidden').value;

	//new Ajax.Updater('details', 'rpc.php', {method: 'post', postBody:'action=showEvents&month='+month+'&year='+year+'&day='+day});

	document.getElementById('insertEvent').style.display='';

	document.getElementById('inday').value = day;

	document.getElementById('disday').innerHTML = day;

	document.getElementById('inmonth').value = month;

	document.getElementById('dismonth').innerHTML = month;

	document.getElementById('inyear').value = year;

	document.getElementById('disyear').innerHTML = year;

}



function eventDetails(event) {

	document.getElementById('insertEvent').style.display='none';

	new Ajax.Updater('details', 'rpc.php', {method: 'post', postBody:'action=showEvent&event='+event});

}



function delEvent(event) {

	document.getElementById('insertEvent').style.display='none';

	new Ajax.Updater('details', 'rpc.php', {method: 'post', postBody:'action=deleteEvent&event='+event});

	var month = document.getElementById('monthhidden').value;

	var year = document.getElementById('yearhidden').value;

	new Ajax.Updater('cal', 'rpc.php', {method: 'post', postBody:'action=startCalendar&month='+month+'&year='+year});

}



function saveEvent() {

	var day = document.getElementById('inday').value;

	var month = document.getElementById('inmonth').value;

	var year = document.getElementById('inyear').value;

	var titel = document.getElementById("intitel").value;

	if (titel.length < 3) {

		alert("Bitte einen Titel eingeben!");return;

	}

	var text = document.getElementById("intext").value;

	if (text.length < 10) {

		alert("Bitte einen Text eingeben!");return;

	}

	var to = new Array();

	var e1 = parseInt(document.getElementById('e1v').value);

	if (e1 > 0) to.push(e1);

	var e2 = parseInt(document.getElementById('e2v').value);

	if (e2 > 0) to.push(e2);

	var e3 = parseInt(document.getElementById('e3v').value);

	if (e3 > 0) to.push(e3);

	var e4 = parseInt(document.getElementById('e4v').value);

	if (e4 > 0) to.push(e4);

	var e5 = parseInt(document.getElementById('e5v').value);

	if (e5 > 0) to.push(e5);

	var e6 = parseInt(document.getElementById('e6v').value);

	if (e6 > 0) to.push(e6);

	var e7 = parseInt(document.getElementById('e7v').value);

	if (e7 > 0) to.push(e7);

	var e8 = parseInt(document.getElementById('e8v').value);

	if (e8 > 0) to.push(e8);

	var e9 = parseInt(document.getElementById('e9v').value);

	if (e9 > 0) to.push(e9);

	var e10 = parseInt(document.getElementById('e10v').value);

	if (e10 > 0) to.push(e10);

	

	var tarr = to.join(";");

	

	var u1 = parseInt(document.getElementById("U1").value);

	if (u1 < 0 || u1 > 23) {

		alert("Ungueltige Stunde");return;

	}

	var u2 = parseInt(document.getElementById("U2").value);

	if (u2 < 0 || u2 > 59) {

		alert("Ungueltige Minute");return;

	}

	//alert("Eintragen");

	new Ajax.Updater('details', 'rpc.php', {method: 'post', postBody:'action=insert&month='+month+'&year='+year+'&day='+day+'&text='+encodeURI(text)+'&titel='+encodeURI(titel)+'&u1='+u1+'&u2='+u2+'&to='+encodeURI(tarr)});

	document.getElementById('monthhidden').value=month;

	document.getElementById('yearhidden').value=year;

	new Ajax.Updater('cal', 'rpc.php', {method: 'post', postBody:'action=startCalendar&month='+month+'&year='+year});

	document.getElementById('insertEvent').style.display='none';

}



</script>



<p><form method="POST">

Monat: <select name="month" id="month">

	<option value="1">Januar</option><option value="2">Februar</option><option value="3">M&auml;rz</option><option value="4">April</option><option value="5" SELECTED>Mai</option><option value="6">Juni</option><option value="7">Juli</option><option value="8">August</option><option value="9">September</option><option value="10">Oktober</option><option value="11">November</option><option value="12">Dezember</option>

</select>&nbsp;

Jahr: <select name="year" id="year">

	<option value="2009">2009</option><option value="2010">2010</option><option value="2011">2011</option><option value="2012">2012</option><option value="2013">2013</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017" SELECTED>2017</option><option value="2018">2018</option>

</select>&nbsp;

<input type="button" value="anzeigen" onclick="loadCal()">

</form>

<form method="POST">

	<input type="hidden" name="year" id="yearhidden">

	<input type="hidden" name="month" id="monthhidden">

</form>

</p>

<div id="cal"></div>

<br>

<div id="details"></div>



<div id="insertEvent" style="display:none">

	<form method="POST">

	<input type="hidden" name="e1v" id="e1v">

	<input type="hidden" name="e2v" id="e2v">

	<input type="hidden" name="e3v" id="e3v">

	<input type="hidden" name="e4v" id="e4v">

	<input type="hidden" name="e5v" id="e5v">

	<input type="hidden" name="e6v" id="e6v">

	<input type="hidden" name="e7v" id="e7v">

	<input type="hidden" name="e8v" id="e8v">

	<input type="hidden" name="e9v" id="e9v">

	<input type="hidden" name="e10v" id="e10v">

		<b>Neues Event eintragen am <span id="disday">0</span>.<span id="dismonth">0</span>.<span id="disyear">0</span></b>

		<input type="hidden" name="inday" id="inday" value="0">

		<input type="hidden" name="inmonth" id="inmonth" value="0">

		<input type="hidden" name="inyear" id="inyear" value="0">

		<table border="0">

			<tr><td>Uhrzeit</td><td colspan="2"><input type="text" name="U1" size="2" id="U1">:<input type="text" name="U2" size="2" id="U2"></td></tr>

			<tr><td>Titel</td><td colspan="2"><input type="text" name="Titel" id="intitel"></td></tr>

			<tr><td>Text</td><td colspan="2"><textarea cols="40" rows="20" name="Text" id="intext"></textarea></td></tr>

			<tr>

				<td>Empf&auml;nger</td>

				<td>

					<table border="0" cellspacing="0" cellpadding="0">

						<tr><td><input type="text" name="e1" id="e1" size="30"><div id="autocomplete_choices1" class="autocomplete"></td></tr>

						<tr><td><input type="text" name="e2" id="e2" size="30"><div id="autocomplete_choices2" class="autocomplete"></td></tr>

						<tr><td><input type="text" name="e3" id="e3" size="30"><div id="autocomplete_choices3" class="autocomplete"></td></tr>

						<tr><td><input type="text" name="e4" id="e4" size="30"><div id="autocomplete_choices4" class="autocomplete"></td></tr>

						<tr><td><input type="text" name="e5" id="e5" size="30"><div id="autocomplete_choices5" class="autocomplete"></td></tr>

						<tr><td><input type="text" name="e6" id="e6" size="30"><div id="autocomplete_choices6" class="autocomplete"></td></tr>

						<tr><td><input type="text" name="e7" id="e7" size="30"><div id="autocomplete_choices7" class="autocomplete"></td></tr>

						<tr><td><input type="text" name="e8" id="e8" size="30"><div id="autocomplete_choices8" class="autocomplete"></td></tr>

						<tr><td><input type="text" name="e9" id="e9" size="30"><div id="autocomplete_choices9" class="autocomplete"></td></tr>

						<tr><td><input type="text" name="e10" id="e10" size="30"><div id="autocomplete_choices10" class="autocomplete"></td></tr>

					</table>

				</td>

				<td><input type="button" onclick="saveEvent()" value="Speichern"></td>

			</tr>

			<tr><td colspan="3"><b>Achtung!</b> Namen m&uuml;ssen aus dem Dropdown ausgew&auml;hlt werden um das Event zu erhalten!</td></tr>

		</table>

	</form>

</div>

<script type="text/javascript">

		//alert("Initiating");

		new Ajax.Autocompleter("e1", "autocomplete_choices1", "rpc.php?action=evus", {afterUpdateElement : getSelectionId1});

		function getSelectionId1(text,li) {

			document.getElementById('e1v').value = li.id;

		}

		new Ajax.Autocompleter("e2", "autocomplete_choices2", "rpc.php?action=evus", {afterUpdateElement : getSelectionId2});

		function getSelectionId2(text,li) {

			document.getElementById('e2v').value = li.id;

		}

		new Ajax.Autocompleter("e3", "autocomplete_choices3", "rpc.php?action=evus", {afterUpdateElement : getSelectionId3});

		function getSelectionId3(text,li) {

			document.getElementById('e3v').value = li.id;

		}

		new Ajax.Autocompleter("e4", "autocomplete_choices4", "rpc.php?action=evus", {afterUpdateElement : getSelectionId4});

		function getSelectionId4(text,li) {

			document.getElementById('e4v').value = li.id;

		}

		new Ajax.Autocompleter("e5", "autocomplete_choices5", "rpc.php?action=evus", {afterUpdateElement : getSelectionId5});

		function getSelectionId5(text,li) {

			document.getElementById('e5v').value = li.id;

		}

		new Ajax.Autocompleter("e6", "autocomplete_choices6", "rpc.php?action=evus", {afterUpdateElement : getSelectionId6});

		function getSelectionId6(text,li) {

			document.getElementById('e6v').value = li.id;

		}

		new Ajax.Autocompleter("e7", "autocomplete_choices7", "rpc.php?action=evus", {afterUpdateElement : getSelectionId7});

		function getSelectionId7(text,li) {

			document.getElementById('e7v').value = li.id;

		}

		new Ajax.Autocompleter("e8", "autocomplete_choices8", "rpc.php?action=evus", {afterUpdateElement : getSelectionId8});

		function getSelectionId8(text,li) {

			document.getElementById('e8v').value = li.id;

		}

		new Ajax.Autocompleter("e9", "autocomplete_choices9", "rpc.php?action=evus", {afterUpdateElement : getSelectionId9});

		function getSelectionId9(text,li) {

			document.getElementById('e9v').value = li.id;

		}

		new Ajax.Autocompleter("e10", "autocomplete_choices10", "rpc.php?action=evus", {afterUpdateElement : getSelectionId10});

		function getSelectionId10(text,li) {

			document.getElementById('e10v').value = li.id;

		}

</script>



<script type="text/javascript">

	loadCal();

</script>

</div>

<div id="c">

	<div id="vps">

		<table border="0">

	<tr><td align="center">Spieler</td><td align="center">Team</td><td align="center">Alter</td><td align="center">Skill</td><td align="center">Opti</td><td align="center">Marktwert</td><td align="center">Notiz</td><td align="center">Aktion</td></tr>

	<tr>

	<td class="TOR" align="left"><a href="javascript:spielerinfo(56383)">Billy OBrien</a></td>

	<td class="TOR" align="center"><a href="javascript:teaminfo(322)">Union Gueugnon</a></td>

	<td class="TOR" align="center">25</td>

	<td class="TOR" align="center">45.94</td>

	<td class="TOR" align="center">80.63</td>

	<td class="TOR" align="center">11.257.614</td>

	<td><input type="text" id="snote[56383]" value="interessant" size="50"></td>

	<td><input type="button" value="speichern" onClick="changePlayer(56383)"><input type="button" value="l&ouml;schen" onClick="deletePlayer(56383)"></td>

</tr><tr>

	<td class="DMI" align="left"><a href="javascript:spielerinfo(72266)">Christopher Elliott</a></td>

	<td class="DMI" align="center"><a href="javascript:teaminfo(1158)">Strabane Cloverleafes</a></td>

	<td class="DMI" align="center">23</td>

	<td class="DMI" align="center">41.53</td>

	<td class="DMI" align="center">70.89</td>

	<td class="DMI" align="center">7.139.909</td>

	<td><input type="text" id="snote[72266]" value="interessant" size="50"></td>

	<td><input type="button" value="speichern" onClick="changePlayer(72266)"><input type="button" value="l&ouml;schen" onClick="deletePlayer(72266)"></td>

</tr><tr>

	<td class="MIT" align="left"><a href="javascript:spielerinfo(72673)">Matthew Nash</a></td>

	<td class="MIT" align="center"><a href="javascript:teaminfo(1906)">Yeovil Rovers</a></td>

	<td class="MIT" align="center">24</td>

	<td class="MIT" align="center">49.76</td>

	<td class="MIT" align="center">83.33</td>

	<td class="MIT" align="center">15.285.305</td>

	<td><input type="text" id="snote[72673]" value="sehr interessant" size="50"></td>

	<td><input type="button" value="speichern" onClick="changePlayer(72673)"><input type="button" value="l&ouml;schen" onClick="deletePlayer(72673)"></td>

</tr><tr>

	<td class="STU" align="left"><a href="javascript:spielerinfo(56634)">Noel Goodwin</a></td>

	<td class="STU" align="center"><a href="javascript:teaminfo(791)">SK Nevezis Gelezinis</a></td>

	<td class="STU" align="center">27</td>

	<td class="STU" align="center">52.88</td>

	<td class="STU" align="center">83.67</td>

	<td class="STU" align="center">13.855.154</td>

	<td><input type="text" id="snote[56634]" value="interessant" size="50"></td>

	<td><input type="button" value="speichern" onClick="changePlayer(56634)"><input type="button" value="l&ouml;schen" onClick="deletePlayer(56634)"></td>

</tr><tr>

	<td class="STU" align="left"><a href="javascript:spielerinfo(66997)">Noel McDonnell</a></td>

	<td class="STU" align="center"><a href="javascript:teaminfo(383)">CF Acui de Jos</a></td>

	<td class="STU" align="center">25</td>

	<td class="STU" align="center">57.41</td>

	<td class="STU" align="center">85.63</td>

	<td class="STU" align="center">20.036.090</td>

	<td><input type="text" id="snote[66997]" value="interessant" size="50"></td>

	<td><input type="button" value="speichern" onClick="changePlayer(66997)"><input type="button" value="l&ouml;schen" onClick="deletePlayer(66997)"></td>

</tr><tr>

	<td class="STU" align="left"><a href="javascript:spielerinfo(56566)">Philip Thornton</a></td>

	<td class="STU" align="center"><a href="javascript:teaminfo(621)">Pirin Kjustendil</a></td>

	<td class="STU" align="center">25</td>

	<td class="STU" align="center">48.35</td>

	<td class="STU" align="center">75.78</td>

	<td class="STU" align="center">9.770.225</td>

	<td><input type="text" id="snote[56566]" value="interessant" size="50"></td>

	<td><input type="button" value="speichern" onClick="changePlayer(56566)"><input type="button" value="l&ouml;schen" onClick="deletePlayer(56566)"></td>

</tr><tr>

	<td class="STU" align="left"><a href="javascript:spielerinfo(6086)">Robert Heary</a></td>

	<td class="STU" align="center"><a href="javascript:teaminfo(939)">SC Kruje</a></td>

	<td class="STU" align="center">27</td>

	<td class="STU" align="center">60.35</td>

	<td class="STU" align="center">87.48</td>

	<td class="STU" align="center">20.627.712</td>

	<td><input type="text" id="snote[6086]" value="Tausch" size="50"></td>

	<td><input type="button" value="speichern" onClick="changePlayer(6086)"><input type="button" value="l&ouml;schen" onClick="deletePlayer(6086)"></td>

</tr><tr>

	<td class="DMI" align="left"><a href="javascript:spielerinfo(55287)">Thomas Mooney</a></td>

	<td class="DMI" align="center"><a href="javascript:teaminfo(0)">DemoTeam</a></td>

	<td class="DMI" align="center">27</td>

	<td class="DMI" align="center">66.35</td>

	<td class="DMI" align="center">92.15</td>

	<td class="DMI" align="center">32.155.776</td>

	<td><input type="text" id="snote[55287]" value="R.I.P." size="50"></td>

	<td><input type="button" value="speichern" onClick="changePlayer(55287)"><input type="button" value="l&ouml;schen" onClick="deletePlayer(55287)"></td>

</tr><tr>

	<td class="MIT" align="left"><a href="javascript:spielerinfo(55852)">Wayne Coghlan</a></td>

	<td class="MIT" align="center"><a href="javascript:teaminfo(911)">AFC Tralee United</a></td>

	<td class="MIT" align="center">26</td>

	<td class="MIT" align="center">54.65</td>

	<td class="MIT" align="center">84.78</td>

	<td class="MIT" align="center">15.892.682</td>

	<td><input type="text" id="snote[55852]" value="verliehen vom AFC" size="50"></td>

	<td><input type="button" value="speichern" onClick="changePlayer(55852)"><input type="button" value="l&ouml;schen" onClick="deletePlayer(55852)"></td>

</tr>

</table>

	</div>

	<form method="POST">

<input type="hidden" name="sid" id="sid" value="0">

<table border="0">

		<tr><td colspan="8"><b>Spieler zum beobachten hinzuf&uuml;gen (Per Name)</b></td></tr>

		<tr><td><input type="text" size="30" name="spn" value="SpielerName" id="spn"><div id="autocomplete_choices" class="autocomplete"></div></td>

			<td colspan="6"><input type="text" id="snote" name="snote" size="50" value="Notizen zum Spieler"><input type="button" onClick="newPlayer()" value="Speichern"></td></tr>

		<tr><td colspan="8"><b>Spieler zum beobachten hinzuf&uuml;gen (Per ID)</b></td></tr>

		<tr><td><input type="text" size="30" name="sidid" value="SpielerId" id="sidid"></div></td>

			<td colspan="6"><input type="text" id="snoteid" name="snoteid" size="50" value="Notizen zum Spieler"><input type="button" onClick="newPlayerById()" value="Speichern"></td></tr>

</table>



</form>

<script type="text/javascript">

	new Ajax.Autocompleter("spn", "autocomplete_choices", "rpc.php?action=sidb", {afterUpdateElement : getSelectionId});

	function getSelectionId(text,li) {

		document.getElementById('sid').value = li.id;

	}

</script><script type="text/javascript">

function newPlayer() {

	var id = document.getElementById('sid').value;

	var note = document.getElementById('snote').value;

	new Ajax.Updater('vps', 'rpc.php', {method: 'post', postBody:'action=addPlayer&sid='+id+'&snote='+note});

	document.getElementById('sid').value = 0;

	document.getElementById('snote').value = 'Notizen zum Spieler';

	document.getElementById('spn').value = 'SpielerName';

}

function newPlayerById() {

	var id = parseInt(document.getElementById('sidid').value);

	if (isNaN(id)) { alert("Bitte eine Id eingeben!"); return; }

	var note = document.getElementById('snoteid').value;

	new Ajax.Updater('vps', 'rpc.php', {method: 'post', postBody:'action=addPlayer&sid='+id+'&snote='+note});

	document.getElementById('sidid').value = 'SpielerId';

	document.getElementById('snoteid').value = 'Notizen zum Spieler';

}

function changePlayer(i) {

	var note = document.getElementById('snote['+i+']').value;

	new Ajax.Updater('vps', 'rpc.php', {method: 'post', postBody:'action=changePlayer&sidc='+i+'&snote='+note});

}

function deletePlayer(i) {

	new Ajax.Updater('vps', 'rpc.php', {method: 'post', postBody:'action=deletePlayer&sidc='+i});

}

</script>

</div>

<div id="d">

	<form method="POST">

		<textarea cols="80" rows="25" name="notes" id="notes" onKeyDown="changeNotes()">
---

Notizen vom 30.12.2014

</textarea>

		<br><input type="button" value="Speichern" onClick="saveNotes()">

	</form>

	<p style="color:red" id="notemsg"></p>

</div>

<script type="text/javascript">



var te = new Control.Tabs('te');





</script>

</div>

</body>

</html>