<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"

        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="de" xml:lang="de">

<head>

<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />

<title>Online-Soccer 2.0 Spielerprofil von Anker Jensen</title>

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
<script src="js/livepipe/lib/prototype.js" type="text/javascript"></script>

<script src="js/livepipe/src/livepipe.js" type="text/javascript"></script>

<script src="js/livepipe/src/tabs.js" type="text/javascript"></script>

<script type="text/javascript">

function SpielerBeobachten() {

	var note = window.prompt("Bitte eine Notiz zum Spieler eingeben","Notiz zum Spieler");

	new Ajax.Updater('vps', 'rpc.php', {method: 'post', postBody:'action=addPlayer&sid=104071&snote='+note});

	document.getElementById("beobachten").disabled = true;

	document.getElementById("beobachten").value = "Unter beobachtung";

}

</script>

<style>

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

	width:100px

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

</style>



<ul id="te" class="subsection_tabs">  

	<li class="tab"><a href="#a">Spielerdaten</a></li>  

	<!--<li class="tab"><a href="#b">Statistiken</a></li>  -->

	<li class="tab"><a href="#c">Transferhistorie</a></li>  

	<li class="tab"><a href="#d">Leihhistorie</a></li>  

	<li class="tab"><a href="#e">Spielerhistorie</a></li>  

</ul>  

<div id="a"><table border="0">

	<tr align=right>

		<td rowspan="4">

			<img src="faceprev.php?sid=104071" alt="Face" style="width: 110px; height: 110px;">

		</td>

		<td class="stat">Name :</td><td class="stat">Anker Jensen</td><td width=30></td>

		<td class="stat">Alter :</td><td class="stat">20</td><td width=30></td>

		<td class="stat">Monatsgehalt :</td><td class="stat">43.919 EUR</td>

	</tr>

	<tr align=right>

		<td class="stat">Nationalität :</td><td class="stat"><img src="images/flaggen/DEN.gif" style="float:left"/>&nbsp;D&auml;nemark</td><td width=30></td>

		<td class="stat">Geburtstag :</td><td class="stat">ZAT 12</td><td width=30></td>

		<td class="stat">Vertragslaufzeit :</td><td class="stat">59</td>

	</tr>

	<tr align=right>

		<td class="stat">Marktwert :</td><td class="stat">5.756.644 EUR</td><td width=30></td>

		<!-- <td class="stat">Marktwert :</td><td class="stat">0,15&euro; (Flaschenpfand)</td><td width=30></td> -->

		<td class="stat">Stammposition :</td><td class="stat">STU</td><td width=30></td>

		<td class="stat" rowspan="2" style="vertical-align: top">Team : </td><td class="stat" rowspan="2" style="vertical-align: top"><a href="javascript:teaminfo(57)">FC Nivellois</a><br>2. Liga A <a href="http://os.ongapo.com/forum/index.php?page=Board&boardID=41" target="_blank">Belgien</a></td>

	</tr>

	<tr align=right>

		<td class="stat">Verletzt :</td><td class="stat"></td><td></td>

	</tr>

	</tr>

	<tr style:="visibility:hidden">

		<td colspan = 7><b><font color="#ffff00" size="-1"></font></b></td>

	</tr>

	<tr style:="visibility:hidden">

		<td colspan = 7><b><font color="#ffff00" size="-1"></font></b></td>

	</tr>

<br>

<table border="0">

	<tr>

		<td class="stats">Skillschnitt : 36.47</td><td><img SRC="images/balken/36.GIF" width="36" height=10></td>

		<td class="stats">Opt. Skill : 65.04</td><td><img SRC="images/balken/65.GIF" width="65" height=10></td>

	</tr>

	<tr>

		<td class="stats" style="font-weight: bold;"#>Schuss : 90</td><td style="width:99px"><img SRC="images/balken/90.GIF" width="90" height=10></td>

		<td class="stats">Ballkontrolle : 29</td><td style="width:99px"><img SRC="images/balken/29.GIF" width="29" height=10></td>

		<td class="stats" style="font-weight: bold;"#>Kopfball : 53</td><td style="width:99px"><img SRC="images/balken/53.GIF" width="53" height=10></td>

	</tr>

	<tr>

		<td class="stats" style="font-weight: bold;"#>Zweikampf  : 56</td><td><img SRC="images/balken/56.GIF" width="56" height=10></td>

		<td class="stats">Deckung : 21</td><td><img SRC="images/balken/21.GIF" width="21" height=10></td>

		<td class="stats" style="font-weight: bold;"#>Geschwindigkeit : 85</td><td><img SRC="images/balken/85.GIF" width="85" height=10></td>

	</tr>

	<tr>

		<td class="stats">Führungsfertigkeit : 0</td><td><img SRC="images/balken/0.GIF" width="0" height=10></td>

		<td class="stats">Erfahrung : 7</td><td><img SRC="images/balken/7.GIF" width="7" height=10></td>

		<td class="stats">Aggressivität : 31</td><td><img SRC="images/balken/31.GIF" width="31" height=10></td>

	</tr>

	<tr>

		<td class="stats">Passgenauigkeit : 15</td><td><img SRC="images/balken/15.GIF" width="15" height=10></td>

		<td class="stats">Ausdauer : 22</td><td><img SRC="images/balken/22.GIF" width="22" height=10></td>

		<td class="stats">Übersicht : 33</td><td><img SRC="images/balken/33.GIF" width="33" height=10></td>

	</tr>

	<tr>

		<td class="stats">Widerstandskraft : 49</td><td><img SRC="images/balken/49.GIF" width="49" height=10></td>

		<td class="stats">Selbstbewusstsein : 61</td><td><img SRC="images/balken/61.GIF" width="61" height=10></td>

		<td class="stats">Disziplin : 5</td><td><img SRC="images/balken/5.GIF" width="5" height=10></td>

	</tr>

	<tr>

		<td class="stats">Zuverlässigkeit : 29</td><td><img SRC="images/balken/29.GIF" width="29" height=10></td>

		<td class="stats">Einstellung : 34</td><td><img SRC="images/balken/34.GIF" width="34" height=10></td>

		<td></td><td></td>

	</tr>

</table>

<!--</div>

<div id="b">-->

<table border=0 cellspacing=5 cellpadding=0>

	<tr align=right>

		<td></td>

	</tr>

	<tr align=right>

		<td class="stat"></td>

		<td class="stat">LI</td>

		<td class="stat">LP</td>

		<td class="stat">IP</td>

		<td class="stat">FS</td>

		<td class="stat" colspan=2></td>

		<td class="stat">LI</td>

		<td class="stat">LP</td>

		<td class="stat">IP</td>

		<td class="stat">FS</td>

	</tr>

	<tr align=right>

		<td class="stat">Spiele Saison :</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>11</td>

		<td width=100></td>

		<td class="stat">Spiele Karriere :</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>43</td>

	</tr>

	<tr align=right>

		<td class="stat">Tore Saison :</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>5</td>

		<td width=100></td>

		<td class="stat">Tore Karriere :</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>16</td>

	</tr>

	<tr align=right>

		<td class="stat">Vorlagen Saison :</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>1</td>

		<td width=100></td>

		<td class="stat">Vorlagen Karriere :</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>3</td>

	</tr>

	<tr align=right>

		<td class="stat">Gelbe Karten Saison :</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td width=100></td>

		<td class="stat">Gelbe Karten Karriere :</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

	</tr>

	<tr align=right>

		<td class="stat">Rote Karten Saison :</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td width=100></td>

		<td class="stat">Rote Karten Karriere :</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

		<td class="stat" width=30>0</td>

	</tr>

</table>

</div>

<div id="c">

	<table border="0" width="750px">

		<tr>

			<td align="center">Datum</td>

			<td align="center">Von</td>

			<td align="center">Zu</td>

			<td align="center">ZAT</td>

			<td align="center">Saison</td>

		</tr>

		<tr>

	<td align="center">2017-05-30 11:35:31</td>

	<td align="center"><a href="javascript:teaminfo(1297)">Vorwärts Lustenau</a></td>

	<td align="center"><a href="javascript:teaminfo(57)">FC Nivellois</a></td>

	<td align="center">40</td>

	<td align="center">11</td>

	<td align="center"><a href="javascript:transferview(35822)">Details</a></td>

</tr><tr>

	<td align="center">2016-10-22 09:13:52</td>

	<td align="center"><a href="javascript:teaminfo(727)">Birkeroed FF</a></td>

	<td align="center"><a href="javascript:teaminfo(1297)">Vorwärts Lustenau</a></td>

	<td align="center">61</td>

	<td align="center">10</td>

	<td align="center"><a href="javascript:transferview(34414)">Details</a></td>

</tr>

	</table>

</div>

<div id="d">

	<table border="0" width="750px">

		<tr>

			<td align="center">Datum</td>

			<td align="center">Von</td>

			<td align="center">Zu</td>

			<td align="center">Dauer</td>

			<td align="center">Leihgeb&uuml;hr</td>

			<td align="center">ZAT</td>

			<td align="center">Saison</td>

		</tr>

		

	</table>

</div>

<div id="e">

	<table border="0" width="750px">

	<tr>

		<td align="center">Skill</td>

		<td align="center">Opti</td>

		<td align="center">Marktwert</td>

		<td align="center">Gehalt</td>

		<td align="center">ZAT</td>

		<td align="center">Saison</td>

	</tr>

		<tr>

		<td align="center">36.18</td>

		<td align="center">64.26</td>

		<td align="center">5.536.909</td>

		<td align="center">43.919</td>

		<td align="center">42</td>

		<td align="center">11</td>

	</tr>
	<tr>

		<td align="center">35.94</td>

		<td align="center">63.52</td>

		<td align="center">5.348.837</td>

		<td align="center">29.800</td>

		<td align="center">36</td>

		<td align="center">11</td>

	</tr>
	<tr>

		<td align="center">35.71</td>

		<td align="center">62.78</td>

		<td align="center">5.162.819</td>

		<td align="center">29.800</td>

		<td align="center">30</td>

		<td align="center">11</td>

	</tr>
	<tr>

		<td align="center">35.53</td>

		<td align="center">62.37</td>

		<td align="center">5.068.003</td>

		<td align="center">29.800</td>

		<td align="center">24</td>

		<td align="center">11</td>

	</tr>
	<tr>

		<td align="center">35.29</td>

		<td align="center">61.63</td>

		<td align="center">4.891.296</td>

		<td align="center">29.800</td>

		<td align="center">18</td>

		<td align="center">11</td>

	</tr>
	<tr>

		<td align="center">35.00</td>

		<td align="center">60.70</td>

		<td align="center">4.627.617</td>

		<td align="center">29.800</td>

		<td align="center">12</td>

		<td align="center">11</td>

	</tr>
	<tr>

		<td align="center">34.88</td>

		<td align="center">60.48</td>

		<td align="center">4.570.870</td>

		<td align="center">29.800</td>

		<td align="center">6</td>

		<td align="center">11</td>

	</tr>
	<tr>

		<td align="center">34.82</td>

		<td align="center">60.30</td>

		<td align="center">4.534.841</td>

		<td align="center">29.800</td>

		<td align="center">72</td>

		<td align="center">10</td>

	</tr>
	<tr>

		<td align="center">34.76</td>

		<td align="center">60.11</td>

		<td align="center">4.499.524</td>

		<td align="center">29.800</td>

		<td align="center">66</td>

		<td align="center">10</td>

	</tr>
	<tr>

		<td align="center">34.65</td>

		<td align="center">59.89</td>

		<td align="center">4.462.850</td>

		<td align="center">12.172</td>

		<td align="center">60</td>

		<td align="center">10</td>

	</tr>
	<tr>

		<td align="center">34.41</td>

		<td align="center">59.15</td>

		<td align="center">4.255.892</td>

		<td align="center">12.172</td>

		<td align="center">54</td>

		<td align="center">10</td>

	</tr>
	<tr>

		<td align="center">34.41</td>

		<td align="center">59.15</td>

		<td align="center">4.285.396</td>

		<td align="center">12.172</td>

		<td align="center">48</td>

		<td align="center">10</td>

	</tr>
	<tr>

		<td align="center">34.35</td>

		<td align="center">58.96</td>

		<td align="center">4.253.644</td>

		<td align="center">12.172</td>

		<td align="center">42</td>

		<td align="center">10</td>

	</tr>
	<tr>

		<td align="center">34.18</td>

		<td align="center">58.41</td>

		<td align="center">4.105.238</td>

		<td align="center">12.172</td>

		<td align="center">36</td>

		<td align="center">10</td>

	</tr>
	<tr>

		<td align="center">34.00</td>

		<td align="center">57.85</td>

		<td align="center">3.965.601</td>

		<td align="center">12.172</td>

		<td align="center">30</td>

		<td align="center">10</td>

	</tr>
	<tr>

		<td align="center">33.88</td>

		<td align="center">57.48</td>

		<td align="center">3.885.904</td>

		<td align="center">12.172</td>

		<td align="center">24</td>

		<td align="center">10</td>

	</tr>
	<tr>

		<td align="center">33.65</td>

		<td align="center">56.74</td>

		<td align="center">3.710.039</td>

		<td align="center">12.172</td>

		<td align="center">18</td>

		<td align="center">10</td>

	</tr>
	<tr>

		<td align="center">33.47</td>

		<td align="center">56.19</td>

		<td align="center">3.592.859</td>

		<td align="center">12.172</td>

		<td align="center">12</td>

		<td align="center">10</td>

	</tr>
	<tr>

		<td align="center">33.41</td>

		<td align="center">56.00</td>

		<td align="center">3.571.378</td>

		<td align="center">12.172</td>

		<td align="center">6</td>

		<td align="center">10</td>

	</tr>
	<tr>

		<td align="center">33.24</td>

		<td align="center">55.44</td>

		<td align="center">1.157.947</td>

		<td align="center">12.172</td>

		<td align="center">72</td>

		<td align="center">9</td>

	</tr>
	<tr>

		<td align="center">33.00</td>

		<td align="center">54.85</td>

		<td align="center">1.095.026</td>

		<td align="center">12.172</td>

		<td align="center">66</td>

		<td align="center">9</td>

	</tr>
	<tr>

		<td align="center">32.71</td>

		<td align="center">53.93</td>

		<td align="center">1.008.703</td>

		<td align="center">12.172</td>

		<td align="center">60</td>

		<td align="center">9</td>

	</tr>
	<tr>

		<td align="center">32.41</td>

		<td align="center">53.15</td>

		<td align="center">937.836</td>

		<td align="center">12.172</td>

		<td align="center">54</td>

		<td align="center">9</td>

	</tr>
	<tr>

		<td align="center">32.29</td>

		<td align="center">52.78</td>

		<td align="center">907.300</td>

		<td align="center">12.172</td>

		<td align="center">48</td>

		<td align="center">9</td>

	</tr>
	<tr>

		<td align="center">32.12</td>

		<td align="center">52.22</td>

		<td align="center">863.242</td>

		<td align="center">12.172</td>

		<td align="center">42</td>

		<td align="center">9</td>

	</tr>
	<tr>

		<td align="center">32.00</td>

		<td align="center">52.00</td>

		<td align="center">843.178</td>

		<td align="center">12.172</td>

		<td align="center">36</td>

		<td align="center">9</td>

	</tr>
	<tr>

		<td align="center">31.88</td>

		<td align="center">51.63</td>

		<td align="center">815.552</td>

		<td align="center">12.172</td>

		<td align="center">30</td>

		<td align="center">9</td>

	</tr>
	<tr>

		<td align="center">31.76</td>

		<td align="center">51.26</td>

		<td align="center">788.778</td>

		<td align="center">12.172</td>

		<td align="center">24</td>

		<td align="center">9</td>

	</tr>
	<tr>

		<td align="center">31.41</td>

		<td align="center">50.30</td>

		<td align="center">720.392</td>

		<td align="center">12.172</td>

		<td align="center">18</td>

		<td align="center">9</td>

	</tr>
	<tr>

		<td align="center">31.18</td>

		<td align="center">49.56</td>

		<td align="center">673.486</td>

		<td align="center">12.172</td>

		<td align="center">12</td>

		<td align="center">9</td>

	</tr>
	<tr>

		<td align="center">30.82</td>

		<td align="center">48.44</td>

		<td align="center">608.474</td>

		<td align="center">12.172</td>

		<td align="center">6</td>

		<td align="center">9</td>

	</tr>


</table>

</div>

<br>

<br>

<table width="750px">

	<tr>

		<td align="center">

				<input type="button" value="Infofenster zu" onClick="window.close()">

				<input type="button" id="beobachten" value="Spieler beobachten" onClick="SpielerBeobachten()">

		</td>

	</tr>

</table>

<input type="hidden" id="note">

<script type="text/javascript">

var te = new Control.Tabs('te');

</script>
</div>

</body>

</html>