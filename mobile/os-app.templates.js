angular.module('OnlineSoccer').run(['$templateCache', function($templateCache) {$templateCache.put('components/embedded/embedded.html','<iframe id="embedFrame" onload="this.style.height = this.contentWindow.document.body.scrollHeight + \'px\'; embeddedLoaded()" ng-src="{{$ctrl.site}}"></iframe>\n');
$templateCache.put('components/login/login.html','<div ui-content-for="title">\n   \t<span>Willkommen bei Online Soccer</span>\n</div>\n\n<div ui-content-for="navbarAction">\n\t<div ng-hide="$ctrl.loggedIn" class="btn btn-navbar">\n\t\t<i class="fa fa-user-plus"></i> <a ng-href="#/os_anmeldung.html" class="btn-navbar hidden-xs">Registrieren</a>\n\t</div>\n</div>\n\n<div class="scrollable">\n\t<div class="scrollable-content section">\n\t\t<div class="row">\n\t\t\t<div class="col-lg-3 col-md-4 col-sm-5 col-xs-12">\n\t\t\t\t<form ng-submit="$ctrl.login()">\n\t\t\t\t\t<fieldset>\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<label>Manageremail</label>\n\t\t\t\t\t\t\t<input type="email" ng-model="$ctrl.email"  class="form-control" placeholder="E-Mailadresse eingeben">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<label>Passwort</label>\n\t\t\t\t\t\t\t<input type="password" ng-model="$ctrl.password" class="form-control" placeholder="Passwort eingeben">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</fieldset>\n\t\t\t\t\t<button class="btn btn-success" style="margin-top: 10px; margin-bottom: 10px;">Einloggen</button>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t\t<div class="col-lg-9 col-md-8 col-sm-7 col-xs-12">\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<p><strong>Was ist Online Soccer \xFCberhaupt?</strong></p>\n\t\t\t\t\t<p>Sicherlich kennst Du vom Computer her diverse Fu\xDFball-Managerspiele, bei denen Du das Geschick einer Mannschaft lenkst, indem Du Spieler kaufst, verkaufst und trainierst, die Mannschaftsaufstellung festlegst, die Mannschaft optimal auf den n\xE4chsten Gegner einstellst und Dich "nebenher" auch noch um die finanziellen Belange "Deiner" Mannschaft k\xFCmmern musst. Nun, genau das ist es, was Dich bei Online Soccer erwartet. Du \xFCbernimmst die sportliche und wirtschaftliche Leitung eines Fussballclubs und versuchst dabei, so erfolgreich wie m\xF6glich zu sein.<br>Allerdings versuchen das die 780 Mitstreiter nat\xFCrlich ihrerseits ebenfalls; Und wie so oft im Leben hei\xDFt es auch hier - Nur einer kann am Ende oben stehen!</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>');
$templateCache.put('components/menu/menu.html','<div class="sidebar sidebar-left">\n\t<div class="scrollable">\n\t\t<div class="scrollable-header" style="padding:15px; float: left;">\n\t\t\t<div style="float: left;">\n\t\t\t\t<a ng-href="#/haupt.php">\n\t\t\t\t\t<img title="{{$ctrl.account.getTeams()[0].name}}"\n\t\t\t\t\t\tng-src="../images/wappen/{{$ctrl.account.getTeams()[0].image}}">\n\t\t\t\t\t</img>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t\t<div style="float: left;" ng-if="$ctrl.account.getTeams().length > 1 && $ctrl.account.getTeams()[1].image != \'00000000.png\'">\n\t\t\t\t<a ng-click="$ctrl.changeToOtherTeam()">\n\t\t\t\t\t<img title="{{$ctrl.account.getTeams()[1].name}}" style="padding-left: 15px; opacity: 0.3;"\n\t\t\t\t\t\tng-src="../images/wappen/{{$ctrl.account.getTeams()[1].image}}">\n\t\t\t\t\t</img>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="scrollable-content" ui-shared-state="submenu">\n\t\t\t<div class="list-group">\n\t\t\t\t<div ng-repeat="item in $ctrl.menuItems">\n\t\t\t\t\t<div ui-shared-state="{{item.id}}">\n\t\t\t\t\t\t<a class="list-group-item" ng-href="{{item.path}}" ng-click="$ctrl.handleItemClick(item)">\n\t\t\t\t\t\t\t<i class="fa" ng-class="$ctrl.getIconClass(item)"></i> \n\t\t\t\t\t\t\t<span ng-bind-html="item.label"></span> \n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t<div ui-if="submenu == \'{{item.id}}\' && {{item.id}}" ng-repeat="subitem in item.items" class="list-group" >\n\t\t\t\t\t\t\t<a class="list-group-item" ng-href="{{subitem.path}}" ng-click="$ctrl.handleItemClick(subitem)">\n\t\t\t\t\t\t\t\t<i class="fa fa-caret-right"></i> \n\t\t\t\t\t\t\t\t<span ng-bind-html="subitem.label"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div> \n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>');
$templateCache.put('components/move/move.html','<ui-shared-state id="activeTab" default="1"></ui-shared-state>\n\n<div class="navbar-brand navbar-brand-center" ui-content-for="title">\n\t<div style="position: relative; ">\n\t\t<div style="position: absolute; top: -6px;">\n\t\t    <span style="white-space: nowrap;">\n\t\t    \t<span class="hidden-xs">Zugabgabe </span><span ng-if="$ctrl.move.information.zat">ZAT {{$ctrl.move.information.zat}} <span class="hidden-xs hidden-sm hidden-md">{{$ctrl.move.information.date | date : "\'am \' EEEE, d. LLLL yyyy \'um\' HH:mm \'Uhr\'"}}</span></span>\n\t\t    </span>\n\t\t    <br>\n\t\t    <span style="font-size: x-small; line-height: 1.2; white-space: nowrap;">\n\t\t    \t<span class="visible-xs">\n\t\t    \t\t<span ui-if="activeTab == 1">Aufstellung</span>\n\t\t    \t\t<span ui-if="activeTab == 2">Wechsel & Einstellungen</span>\n\t\t    \t</span>\n\t\t    \t<span class="hidden-xs" ng-if="$ctrl.move.information.zat">{{$ctrl.move.information.type}}<span class="hidden-sm"> {{$ctrl.move.information.home ? \'Heim\' : \'Ausw\xE4rts\'}}</span> gegen {{$ctrl.move.information.against.name}}</span>\n\t\t    </span>\n\t    </div>\n    </div>\n</div>\n\n<div class="btn-group pull-right" ui-content-for="navbarAction">\n\t<a ui-set="{\'activeTab\': 1}" ui-turn-off="leftSwipe"\n\t    ui-class="{\'active\': activeTab == 1}" class="btn btn-navbar">\n\t    <i class="fa fa-th"></i><span class="hidden-xs"> Aufstellung</span>\n\t</a>\n\t<a ui-set="{\'activeTab\': 2}" \n\t    ui-class="{\'active\': activeTab == 2}" class="btn btn-navbar">\n\t    <i class="fa fa-gears"></i><span class="hidden-xs"> Wechsel & Einstellungen</span>\n\t</a>\n    <a class="btn btn-navbar" ng-click="$ctrl.load(false)">\n\t\t<i class="fa fa-folder-open-o"></i> <span class="hidden-xs">Laden</span>\n    </a>\n    <a class="btn btn-navbar" ng-click="$ctrl.save()">\n    \t<span ng-class="$ctrl.move.valid ? \'ABW\' : \'STU\'">\n        \t<i class="fa fa-save"></i> <span class="hidden-xs">Speichern</span>\n        </span>\n    </a>\n</div>\n\n<div class="scrollable">\n\t<div class="scrollable-content scroll-area">\n    \t<div class="section">\n\n\t      \t<div style="float:left;">\n\t      \t\n\t\t    \t<div class="grid-border">\n\t\t\t    \t<div class="grid-container">\n\t\t\t\t\t\t<div ng-repeat="row in $ctrl.grid">\n\t\t\t\t\t\t\t<div ng-repeat="cell in row track by $index" class="grid-cell">\n\t\t\t\t\t\t\t\t<movable-player ng-if="cell.id" \n\t\t\t\t\t\t\t\t\tobject="cell" \n\t\t\t\t\t\t\t\t\tdrop-area-selector="\'.grid-container, .keeper-container, .subst-container\'"\n\t\t\t\t\t\t\t\t\ton-move="$ctrl.grid.setPlayer(player, x, y)"\n\t\t\t\t\t\t\t\t\ton-remove="$ctrl.grid.removePlayer(player)"/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class="grid-cell" style="margin-left: 2px;"></div>\n\t\t\t\t<div class="grid-cell"></div>\n\t\t\t\t<div class="grid-cell"></div>\n\t\t\t\t<div class="grid-cell"></div>\n\t\t\t\t<div class="grid-cell"></div>\n\t\t\t\t<div class="grid-cell keeper-container">\n\t\t\t\t\t<div></div>\n\t\t\t\t\t<movable-player ng-if="$ctrl.getKeeper()" \n\t\t\t\t\t\tobject="$ctrl.getKeeper()" drop-area-selector="\'.grid-container, .keeper-container, .subst-container\'"\n\t\t\t\t\t\ton-move="$ctrl.grid.setPlayer(player, x, y)"\n\t\t\t\t\t\ton-remove="$ctrl.grid.removePlayer(player)"></player>\n\t\t\t\t</div>\n\t\n\t\t\t\t<h5 style="clear: both; padding-top: 10px;"><b>Ersatzbank</b></h5>\n\t\t\t\t<div class="subst-border">\n\t\t\t\t\t<div class="subst-container">\n\t\t\t\t\t\t<div ng-repeat="cell in $ctrl.getSubst() track by $index" class="grid-cell">\n\t\t\t\t\t\t\t<movable-player ng-if="cell.id" \n\t\t\t\t\t\t\t\tobject="cell" drop-area-selector="\'.grid-container, .keeper-container, .subst-container\'"\n\t\t\t\t\t\t\t\ton-move="$ctrl.grid.setPlayer(player, x, y)"\n\t\t\t\t\t\t\t\ton-remove="$ctrl.grid.removePlayer(player)"/>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div ui-if="activeTab == 1">\n\t\t\t\t\t<h5><b>Statistik Startaufstellung</b></h5>\n\t\t\t\t\t<div style="margin-bottom: 10px;">\n\t\t\t\t\t\t\xD8 Alter: {{$ctrl.move.getStartPlayersAverage(\'alter\') | number : 2}}<br>\n\t\t\t\t\t\t\xD8 Skill: {{$ctrl.move.getStartPlayersAverage(\'skill\') | number : 2}}<br>\n\t\t\t\t\t\t\xD8 Opti: {{$ctrl.move.getStartPlayersAverage(\'opti\') | number : 2}}<br>\n\t\t\t\t\t\t\xD8 Moral: {{$ctrl.move.getStartPlayersAverage(\'moral\') | number : 2}}<br>\n\t\t\t\t\t\t\xD8 Fitness: {{$ctrl.move.getStartPlayersAverage(\'fitness\') | number : 2}}</div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t</div>\n\n\t\t\t<div ui-if="activeTab == 2" class="changes-container noselect">\n\n\t\t\t\t<div class="hidden-xs btn-group" role="group">\n\t\t\t\t\t<button type="button" class="btn btn-primary btn-xs" ng-repeat="option in $ctrl.move.options"\n\t\t\t\t\t\tng-if="option.page==1 && (option.item==1 || option.item==5)" ng-click="$ctrl.addAdjustment(option)">\n\t\t\t\t\t\t<span ng-bind-html="option.text"></span> \n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t<div class="visible-xs" style="margin-top: 15px;"></div>\n\t\t\t\t<div class="list-group">\n\t\t\t  \t\t<div ng-repeat="adjustment in $ctrl.getAdjustments()">\n\t\t\t\t\t\t<div class="list-group-item" ng-if="adjustment.option.item==1">\n\t\t\t\t\t\t\t<span ng-bind-html="adjustment.text" ng-class="{markdeleted: adjustment.markDeleted, marknew: (!adjustment.id)}"></span> \n\t\t\t\t\t\t\t<a ng-click="$ctrl.removeAdjustment(adjustment)">\n\t\t\t\t\t\t\t\t<i class="fa" ng-class="adjustment.markDeleted ? \'fa-undo\' : \'fa-trash\'"></i></a>\n\t\t\t\t\t\t</div> \n\t\t\t\t\t</div> \n\t\t\t\t</div>\n\t\t\t\t<div class="list-group" style="margin-bottom: 15px;">\n\t\t\t  \t\t<div ng-repeat="adjustment in $ctrl.getAdjustments()">\n\t\t\t\t\t\t<div class="list-group-item" ng-if="adjustment.option.item==5">\n\t\t\t\t\t\t\t<span ng-bind-html="adjustment.text" ng-class="{markdeleted: adjustment.markDeleted, marknew: (!adjustment.id)}"></span> \n\t\t\t\t\t\t\t<a ng-click="$ctrl.removeAdjustment(adjustment)">\n\t\t\t\t\t\t\t\t<i class="fa" ng-class="adjustment.markDeleted ? \'fa-undo\' : \'fa-trash\'"></i></a>\n\t\t\t\t\t\t</div> \n\t\t\t\t\t</div> \n\t\t\t\t</div>\n\t\t\t  \t\n\t\t\t  \t<div class="hidden-xs btn-group" role="group">\n\t\t\t\t\t<button type="button" class="btn btn-primary btn-xs" ng-repeat="option in $ctrl.move.options"\n\t\t\t\t\t\tng-if="option.page==1 && option.item!=1 && option.item!=5" ng-click="$ctrl.addAdjustment(option)">\n\t\t\t\t\t\t<span ng-bind-html="option.text"></span> \n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t  \t<div class="list-group" style="margin-bottom: 15px;">\n\t\t\t  \t\t<div ng-repeat="adjustment in $ctrl.getAdjustments()">\n\t\t\t\t\t\t<div class="list-group-item" ng-if="adjustment.option.page==1 && adjustment.option.item!=1 && adjustment.option.item!=5">\n\t\t\t\t\t\t\t<span ng-bind-html="adjustment.text" ng-class="{markdeleted: adjustment.markDeleted, marknew: (!adjustment.id)}"></span> \n\t\t\t\t\t\t\t<a ng-click="$ctrl.removeAdjustment(adjustment)">\n\t\t\t\t\t\t\t\t<i class="fa" ng-class="adjustment.markDeleted ? \'fa-undo\' : \'fa-trash\'"></i></a>\n\t\t\t\t\t\t</div> \n\t\t\t\t\t</div> \n\t\t\t\t</div>\n\t\t\t  \t\n\t\t\t  \t<div class="hidden-xs btn-group" role="group">\n\t\t\t\t\t<button type="button" class="btn btn-primary btn-xs" ng-repeat="option in $ctrl.move.options"\n\t\t\t\t\t\tng-if="option.page==2 && option.item<16" ng-click="$ctrl.addAdjustment(option)">\n\t\t\t\t\t\t<span ng-bind-html="option.text"></span> \n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t  \t<div class="list-group" style="margin-bottom: 15px;">\n\t\t\t  \t\t<div ng-repeat="adjustment in $ctrl.getAdjustments()">\n\t\t\t\t\t\t<div class="list-group-item" ng-if="adjustment.option.page==2 && adjustment.option.item<16">\n\t\t\t\t\t\t\t<span ng-bind-html="adjustment.text" ng-class="{markdeleted: adjustment.markDeleted, marknew: (!adjustment.id)}"></span> \n\t\t\t\t\t\t\t<a ng-click="$ctrl.removeAdjustment(adjustment)">\n\t\t\t\t\t\t\t\t<i class="fa" ng-class="adjustment.markDeleted ? \'fa-undo\' : \'fa-trash\'"></i></a>\n\t\t\t\t\t\t</div> \n\t\t\t\t\t</div> \n\t\t\t\t</div>\n\t\t\t  \t\n\t\t\t  \t<div class="hidden-xs btn-group" role="group">\n\t\t\t\t\t<button type="button" class="btn btn-primary btn-xs" ng-repeat="option in $ctrl.move.options"\n\t\t\t\t\t\tng-if="option.page==2 && option.item>=16" ng-click="$ctrl.addAdjustment(option)">\n\t\t\t\t\t\t<span ng-bind-html="option.text"></span> \n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t  \t<div class="list-group" style="margin-bottom: 15px;">\n\t\t\t  \t\t<div ng-repeat="adjustment in $ctrl.getAdjustments()">\n\t\t\t\t\t\t<div class="list-group-item" ng-if="adjustment.option.page==2 && adjustment.option.item>=16">\n\t\t\t\t\t\t\t<span ng-bind-html="adjustment.text" ng-class="{markdeleted: adjustment.markDeleted, marknew: (!adjustment.id)}"></span> \n\t\t\t\t\t\t\t<a ng-click="$ctrl.removeAdjustment(adjustment)">\n\t\t\t\t\t\t\t\t<i class="fa" ng-class="adjustment.markDeleted ? \'fa-undo\' : \'fa-trash\'"></i></a>\n\t\t\t\t\t\t</div> \n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<a ui-toggle="leftSwipe" class="selection-container-button visible-xs">\n\t\t\t\t<i ui-if="activeTab == 1" class="fa fa-user-plus"></i>\n\t\t\t\t<i ui-if="activeTab == 2" class="fa fa-plus"></i>\n\t\t\t</a>\n\t\t\t\n\t\t    <div class="selection-container" \n\t\t    \tui-class="{\'visible\': leftSwipe == true, \'visible-xs\': activeTab == 2}"\n\t\t    \tui-turn-off="leftSwipe">\n\t\t    \t\n\t\t    \t<div ui-if="activeTab == 1" class="player-container" ng-repeat="player in $ctrl.move.players">\n\t\t    \t\t<div class="grid-cell">\n\t    \t\t\t\t<div class="grid-face grid-face-{{player.pos}} noselect btn-group pull-right unavailable"\n\t    \t\t\t\t\tstyle="background-image: url(\'/faceprev.php?sid={{player.id}}\'); cursor: inherit;"></div>\n\t    \t\t\t\t<movable-player ng-if="!$ctrl.isPlayerSet(player)"\n\t    \t\t\t\t\tobject="player" drop-area-selector="\'.grid-container, .keeper-container, .subst-container\'" \n\t    \t\t\t\t\ton-move="$ctrl.grid.setPlayer(player, x, y)"></player>\n\t\t    \t\t</div>\n\t\t    \t\t<div class="noselect player-info" ng-class="{unavailable: ($ctrl.isPlayerSet(player))}">\n\t\t\t\t\t\t<div><player-link object="player"></player-link></div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t{{player.alter}} J<span class="hidden-xs">ahre</span> - \n\t\t\t\t\t\t\tMor<span class="hidden-xs">al</span> {{player.moral}} / \n\t\t\t\t\t\t\tFit<span class="hidden-xs">ness</span> {{player.fitness}} - \n\t\t\t\t\t\t\tSkill {{player.skill | number : 2}} / \n\t\t\t\t\t\t\tOpti <b>{{player.opti | number : 2}}</b>\n\t\t\t\t\t\t\t<!-- <span class="hidden-xs" ng-if="player.sonder">/ {{player.sonder}}</span>  -->\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t    \t</div>\n\t\t    \t\n\t    \t\t<div ui-if="activeTab == 2" class="list-group">\n\t\t\t\t\t<div ng-repeat="option in $ctrl.move.options">\n\t\t\t\t\t\t<a class="list-group-item" ng-click="$ctrl.addAdjustment(option)">\n\t\t\t\t\t\t\t<i class="fa fa-caret-square-o-right"></i> \n\t\t\t\t\t\t\t<span ng-bind-html="option.text"></span> \n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div> \n\t\t\t\t</div>\n\t\t    \t\n\t\t    </div>\n\t\t\t\n\t\t</div>\n\t</div>\n</div>\n\n<div ui-content-for="modals">\n\t<div class="modal" ui-if="moveAction" ui-state="moveAction">\n\t\t<div class="modal-backdrop in"></div>\n    \t<div class="modal-dialog">\n      \t\t<div class="modal-content">\n        \t\t<div class="modal-header">\n          \t\t\t<button class="close fa fa-close" ui-turn-off="moveAction"></button>\n          \t\t\t<h4 class="modal-title" >{{$ctrl.option.text}}</h4>\n        \t\t</div>\n        \t\t<div class="modal-body">\n\t\t\t\t\t<div ng-repeat="line in $ctrl.adjustmentForm.lines" class="row" style="margin: 0px;">\n\t\t\t\t\t\t<label for="sel">{{line.label}}</label>\n\t\t\t\t\t\t<div ng-repeat="combo in line.combos" class="col-xs-{{combo.width}} combo">\n\t\t\t\t\t\t\t<select class="form-control" id="sel" name="{{combo.name}}" ng-model="combo.value"\n\t\t\t\t\t\t\t\t ng-options="option.value as option.label for option in combo.options">\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n        \t\t</div>\n\t\t\t\t<div class="modal-footer">\n\t\t\t\t\t<button ui-turn-off="moveAction" class="btn btn-success" ng-click="$ctrl.saveAdjustment()">Speichern</button>\n\t\t\t\t\t<button ui-turn-off="moveAction" class="btn btn-primary">Schlie\xDFen</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="modal" ui-if="moveLoad" ui-state="moveLoad">\n\t\t<div class="modal-backdrop in"></div>\n    \t<div class="modal-dialog">\n      \t\t<div class="modal-content">\n        \t\t<div class="modal-header">\n          \t\t\t<button class="close fa fa-close" ui-turn-off="moveLoad"></button>\n          \t\t\t<h4 class="modal-title" >Zugabgabe laden</h4>\n        \t\t</div>\n        \t\t<div class="modal-body">\n\t\t\t\t\t<label for="zat">Termin</label>\n\t\t\t\t\t<div class="combo">\n\t\t\t\t\t\t<select class="form-control" id="zat" name="zat" ng-model="$ctrl.zat" \n\t\t\t\t\t\t\tng-options="zat.value as zat.label for zat in $ctrl.move.zats">\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n        \t\t</div>\n\t\t\t\t<div class="modal-footer">\n\t\t\t\t\t<button ui-turn-off="moveLoad" class="btn btn-success" ng-click="$ctrl.load(true)">Laden</button>\n\t\t\t\t\t<button ui-turn-off="moveLoad" class="btn btn-primary">Schlie\xDFen</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="modal" ui-state="moveCheck" ui-if="moveCheck">\n\t\t<div class="modal-backdrop in"></div>\n\t   \t<div class="modal-dialog">\n\t     \t<div class="modal-content">\n\t       \t\t<div class="modal-header">\n         \t\t\t<button class="close fa fa-close" ui-turn-off="moveCheck"></button>\n         \t\t\t<h4 class="modal-title">Zugabgabe</h4>\n\t       \t\t</div>\n\t       \t\t<div class="modal-body">\n\t       \t\t\t<embedded-site site="../checkza.php"></embedded-site>\n\t       \t\t</div>\n\t\t\t\t<div class="modal-footer">\n\t\t\t\t\t<button ui-turn-off="moveCheck" class="btn btn-primary">Schlie\xDFen</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t\n</div>\n');
$templateCache.put('components/office/office.html','<div id="embeddedOffice">\n\t<embedded-site site="../haupt.php" on-load="$ctrl.onLoad()"></embedded-site>\n</div>');
$templateCache.put('components/player/player.html','<img ng-src="/faceprev.php?sid={{$ctrl.player.id}}" style="width: 110px; float: left; border-radius: 7px;"/>\n<div style="margin-left: 125px;">\n\t<div class="row" style="margin: 0">\n\t\t<div class="col-xs-12 col-sm-5" style="padding: 0; margin-bottom: 10px;">\n\t\t\t<div class="row">\n\t\t\t\t<div class="col-xs-6">Alter:</div>\n\t\t\t\t\t<div class="col-xs-6 text-right">{{$ctrl.player.alter | number}} Jahre</div>\n\t\t\t\t<div class="col-xs-6">Geburtstag:</div>\n\t\t\t\t\t<div class="col-xs-6 text-right">ZAT {{$ctrl.player.geburtstag | number}}</div>\n\t\t\t\t<div class="col-xs-6">Verletzt:</div>\n\t\t\t\t\t<div class="col-xs-6 text-right">{{$ctrl.player.verletzt | number}}</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="col-xs-12 col-sm-offset-1 col-sm-6" style="padding: 0; margin-bottom: 10px;">\n\t\t\t<div class="row">\n\t\t\t\t<div class="col-xs-5">Marktwert:</div>\n\t\t\t\t\t<div class="col-xs-7 text-right">{{$ctrl.player.marktwert | currency:"EUR":0}}</div>\n\t\t\t\t<div class="col-xs-5">Gehalt:</div>\n\t\t\t\t\t<div class="col-xs-7 text-right">{{$ctrl.player.gehalt | currency:"EUR":0}}</div>\n\t\t\t\t<div class="col-xs-5">Vertrag<span class="hidden-xs">slaufzeit</span>:</div>\n\t\t\t\t\t<div class="col-xs-7 text-right">{{$ctrl.player.vertrag | number}} Monate</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="hidden-xs col-xs-12" style="padding: 0; margin-bottom: 10px;">\n\t\t\t<div class="row" style="margin-bottom: 10px;">\n\t\t\t\t<div class="col-xs-3">Nation<span class="hidden-xs">alit\xE4t</span>:</div>\n\t\t\t\t\t<div class="col-xs-9 text-right">{{$ctrl.player.land}} \n\t\t\t\t\t\t<img ng-src="{{$ctrl.player.flagge}}" style="vertical-align: top;"/></div>\n\t\t\t</div>\n\t\t\t<div class="row">\n\t\t\t\t<div class="col-xs-3">Team:</div>\n\t\t\t\t\t<div class="col-xs-9 text-right" ng-bind="$ctrl.player.team.getFullName()"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\n<div class="row" style="margin-top: 5px; margin-bottom: 15px;">\n\t<div class="col-xs-12 col-sm-4">\n\t\tSkillschnitt: {{$ctrl.player.skill | number : 2}}\n\t\t<div class="progress skill"><div class="progress-bar" style="width: 36%"></div><div class="rest" style="width: 64%"></div></div>\n\t</div>\n\t<div class="col-xs-12 col-sm-4">\n\t\tOpt.Skill: {{$ctrl.player.opti | number : 2}}\n\t\t<div class="progress skill"><div class="progress-bar" style="width: 65%"></div><div class="rest" style="width: 35%"></div></div>\n\t</div>\n</div>\n\n<div class="row" style="margin-bottom: 10px;">\n\t<div ng-repeat="skill in $ctrl.player.skills track by $index" class="col-xs-12 col-sm-4">\n\t\t<span ng-class="{ \'bold\': $ctrl.player.isPrimarySkill($index) }">{{$ctrl.player.getSkillCaption($index)}}: {{skill | number}}</span>\n\t\t<div class="progress skill"><div class="progress-bar" style="width: {{skill | number}}%"></div><div class="rest" style="width: {{100-skill | number}}%"></div></div>\n\t</div>\n</div>\n');
$templateCache.put('components/player/player.link.html','<a ng-click="$ctrl.openPopup()" class="{{$ctrl.player.pos}} noselect" \n\tui-shared-state="player{{$ctrl.player.id}}">{{$ctrl.player.name}}</a>\n');
$templateCache.put('components/player/player.movable.html','<div class="grid-face grid-face-{{$ctrl.player.pos}} noselect btn-group pull-right" \n\ttitle="{{$ctrl.player.name}}" ng-style="{ \'background-image\' : \'url(\\\'/faceprev.php?sid=\'+$ctrl.player.id+\'\\\')\' }">\n</div>\n<div class="grid-face-name" ng-if="$ctrl.player.row != null && $ctrl.player.row >= 0">\n\t<div class="grid-face-{{$ctrl.player.pos}} noselect" ng-bind-html="$ctrl.player.getShortName()"></div>\n</div>');
$templateCache.put('components/training/training.html','<div class="navbar-brand navbar-brand-center" ui-content-for="title">\n\t<div style="position: relative; ">\n\t\t<div style="position: absolute; top: -6px;">\n\t\t    <span style="white-space: nowrap;">\n\t\t    \tTraining<span class="hidden-xs">seinstellungen</span>\n\t\t    </span>\n\t\t    <br>\n\t\t    <span ng-repeat="trainer in $ctrl.getTrainerSelection()" \n\t\t    \tstyle="font-size: x-small; white-space: nowrap;">\n\t\t\t\t\tT<span class="hidden-xs">rainer</span> {{trainer.getKey()}}: \n\t\t\t\t\t<span ng-class="{STU:trainer.players > trainer.max, ABW:trainer.players == trainer.max}"><b>{{trainer.players}}</b></span> <span class="hidden-xs">Spieler</span>\n\t\t\t\t\t<span ng-if="!$last"> - </span>\n\t\t    </span>\n\t    </div>\n    </div>\n</div>\n\n<div class="btn-group pull-right" ui-content-for="navbarAction">\n    <a class="btn btn-navbar" ng-click="$ctrl.load(false)">\n\t\t<i class="fa fa-folder-open-o"></i> <span class="hidden-xs">Laden</span>\n    </a>\n    <a class="btn btn-navbar" ng-click="$ctrl.save()">\n    \t{{ctrl.isModified()}}<span ng-class="$ctrl.isModified() ? \'STU\' : \'ABW\'">\n       \t\t<i class="fa fa-save"></i> <span class="hidden-xs">Speichern</span>\n       \t</span>\n    </a>\n</div>\n\n<div class="scrollable">\n\t<div class="scrollable-content scroll-area">\n    \t<div class="section">\n\t    \t<div ng-repeat="player in $ctrl.training.players" class="list-group-item" style="width: 100%;">\n\t    \t\t<div class="grid-cell">\n    \t\t\t\t<div ng-click="$ctrl.openPlayer(player)" class="grid-face grid-face-{{player.pos}} noselect"\n    \t\t\t\t\tstyle="background-image: url(\'/faceprev.php?sid={{player.id}}\'); cursor: pointer;"></div>\n\t    \t\t</div>\n\t    \t\t<div class="noselect player-info" style="float: left; display: inline-block; padding-left: 8px;">\n\t\t\t\t\t<div style="width: 200px; text-overflow: ellipsis;">\n\t\t\t\t\t\t<player-link object="player"/>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div style="white-space: nowrap;">\n\t\t\t\t\t\t{{player.alter}} J<span class="hidden-xs">ahre</span> - \n\t\t\t\t\t\tOpti {{player.opti | number : 2}} \n\t\t\t\t\t\t<span class="visible-xs-inline" ng-if="player.setting" ng-class="{marknew: (!player.setting.chance)}">\n\t\t\t\t\t\t\t-\n\t\t\t\t\t\t\t<b>{{$ctrl.getPlayerSkillName(player, true)}}</b>\n\t\t\t\t\t\t\tmit \n\t\t\t\t\t\t\t<b>{{player.setting.trainerkey}}er</b> \n\t\t\t\t\t\t\t<span ng-if="player.setting.chance">bei {{player.setting.chance | number : 2}}%</span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class="visible-xs-inline" ng-if="player.verletzt">- verletzt</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="visible-xs noselect" style="float: right; display: inline-block;">\n\t\t\t\t\t<a class="brand" ng-if="player.setting && !player.verletzt" ng-click="$ctrl.editPlayerSetting(player)">\n\t\t\t\t\t\t<i class="fa fa-pencil"></i>\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="brand" ng-if="!player.setting && !player.verletzt" ng-click="$ctrl.editPlayerSetting(player)">\n\t\t\t\t\t\t<i class="fa fa-plus"></i>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t\t<div ng-if="player.setting && !player.verletzt" class="combo hidden-xs left-input" style="margin-left: 10px; width: 190px;">\n\t\t\t\t\t<select class="form-control" id="skill-select" name="skill-select" ng-model="player.setting.skillnr"\n\t\t\t\t\t\tng-options="skill.nr as skill.label for skill in $ctrl.getPlayerSkillSelection(player)">\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t\t<div ng-if="player.setting && !player.verletzt" class="combo hidden-xs left-input" style="margin-left: 10px; width: 155px;">\n\t\t\t\t\t<select class="form-control" id="trainer-select" name="trainer-select" ng-model="player.setting.trainerkey"\n\t\t\t\t\t\tng-options="trainer.getKey() as trainer.name + \' bis \' + trainer.skill for trainer in $ctrl.getTrainerSelection()"\n\t\t\t\t\t\tng-change="$ctrl.changeTrainerSelection()">\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t\t<div class="hidden-xs noselect left-input" style="padding: 6px;">\n\t\t\t\t\t<span ng-if="player.setting && !player.verletzt && player.setting.chance"> bei {{player.setting.chance | number : 2}}%</span>\n\t\t\t\t\t<span ng-if="player.verletzt" class="brand" style="padding-left: 7px;">\n\t\t\t\t\t\t<i class="fa fa-medkit"></i> verletzt</span>\n\t\t\t\t\t<a ng-if="!player.setting && !player.verletzt" class="brand" \n\t\t\t\t\t\tng-click="$ctrl.addPlayerSetting(player)"><i class="fa fa-plus"></i> Training festlegen</a>\n\t\t\t\t\t<a ng-if="player.setting && !player.verletzt" class="brand" \n\t\t\t\t\t\tng-click="$ctrl.deletePlayerSetting(player)"><i class="fa fa-trash"></i></a>\n\t\t\t\t</div>\n\n\t    \t</div>\n\t\t</div>\n\t</div>\n</div>\n\n<div ui-content-for="modals">\n\t<div class="modal" ui-if="trainingsetting" ui-state="trainingsetting">\n\t\t<div class="modal-backdrop in"></div>\n    \t<div class="modal-dialog">\n      \t\t<div class="modal-content">\n        \t\t<div class="modal-header">\n          \t\t\t<button ng-if="$ctrl.dialog.player.setting" class="close" ui-turn-off="trainingsetting" ng-click="$ctrl.deletePlayerSetting()"><i class="fa fa-trash"></i></button>\n          \t\t\t<h4 class="modal-title" >Training f\xFCr {{$ctrl.dialog.player.name}}</h4>\n        \t\t</div>\n        \t\t<div class="modal-body">\n\t\t\t\t\t<label for="zat">Skill</label>\n\t\t\t\t\t<div class="combo" style="padding-right: 0px;">\n\t\t\t\t\t\t<select class="form-control" id="dialog-skill-select" name="dialog-skill-select" ng-model="$ctrl.dialog.setting.skillnr" \n\t\t\t\t\t\t\tng-options="skill.nr as skill.label for skill in $ctrl.getPlayerSkillSelection($ctrl.dialog.player, true)">\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<label for="zat">Trainer</label>\n\t\t\t\t\t<div class="combo">\n\t\t\t\t\t\t<select class="form-control" id="dialog-trainer-select" name="dialog-trainer-select" ng-model="$ctrl.dialog.setting.trainerkey" \n\t\t\t\t\t\t\tng-options="trainer.getKey() as trainer.name + \' bis \' + trainer.skill for trainer in $ctrl.getTrainerSelection()">\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n        \t\t</div>\n\t\t\t\t<div class="modal-footer">\n\t\t\t\t\t<button ui-turn-off="trainingsetting" class="btn btn-success" ng-click="$ctrl.savePlayerSetting()">Speichern</button>\n\t\t\t\t\t<button ui-turn-off="trainingsetting" class="btn btn-primary">Schlie\xDFen</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class="modal" ui-if="trainingLoad" ui-state="trainingLoad">\n\t\t<div class="modal-backdrop in"></div>\n    \t<div class="modal-dialog">\n      \t\t<div class="modal-content">\n        \t\t<div class="modal-header">\n          \t\t\t<button class="close fa fa-close" ui-turn-off="trainingLoad"></button>\n          \t\t\t<h4 class="modal-title" >Trainingseinstellungen laden</h4>\n        \t\t</div>\n        \t\t<div class="modal-body">\n\t\t\t\t\t<label for="zat">Name</label>\n\t\t\t\t\t<div class="combo">\n\t\t\t\t\t\t<select class="form-control" id="config-name" name="config-name" ng-model="$ctrl.training.configid" \n\t\t\t\t\t\t\tng-options="config.id as config.label for config in $ctrl.training.config">\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n        \t\t</div>\n\t\t\t\t<div class="modal-footer">\n\t\t\t\t\t<button ui-turn-off="trainingLoad" class="btn btn-success" ng-click="$ctrl.load(true)">Laden</button>\n\t\t\t\t\t<button ui-turn-off="trainingLoad" class="btn btn-primary">Schlie\xDFen</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n');}]);