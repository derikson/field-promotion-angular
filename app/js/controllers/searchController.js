var SearchController = function($scope, FactionService, GameService) {
	$scope.results = FactionService.getResults();
	$scope.playerFactions = FactionService.getFactions();
	$scope.opponentFactions = FactionService.getFactions();
	$scope.gameTypes = FactionService.getGameTypes();
	$scope.search = {};
	$scope.performance = 'no search configured!';

	var designationMap = {
		1:'',
		2:' *',
		3:' **'
	};

	var iconMap = {
		"Khador":"img/khador.jpg",
		"Cygnar":"img/cygnar.jpg",
		"Protectorate of Menoth":"img/menoth.jpg",
		"Retribution of Scyrah":"img/ret.jpg",
		"Cryx":"img/cryx.jpg",
		"Mercenaries":"img/mercs.jpg",
		"Legion of Everblight":"img/legion.jpg",
		"Skorne":"img/skorne.jpg",
		"Circle Orboros":"img/circle.jpg",
		"Trollbloods":"img/trolls.jpg",
		"Convergence of Cyriss":"img/cyriss.jpg",
		"Minions":"img/minions.jpg",
	};

	$scope.clear = function() {
		var search = {
			player_faction: '',
			size: '',
			opponent_name: '',
			result: '',
			opponent_faction: '',
			date: '',
			player_warcaster: '',
			opponent_warcaster: '',
			location: '',
			game_type: ''
		};
		$scope.playerCasters = [];
		$scope.opponentCasters = [];
		$scope.search = search;
		$scope.games = [];
		$scope.performance = 'no search configured!';
	};

	$scope.searchGames = function() {
		$scope.performance = 'searching...';
		GameService.searchGames($scope, $scope.search);
	};

	$scope.isResultLoss = function(resultString) {
		for(var i = 0; i < $scope.results.length; i ++) {
			if ($scope.results[i].name === resultString) {
				return !$scope.results[i].won && !$scope.results[i].draw && !$scope.results[i].teaching;
			}
		}
		return false;
	};

	$scope.isResultWin = function(resultString) {
		for(var i = 0; i < $scope.results.length; i ++) {
			if ($scope.results[i].name === resultString) {
				return $scope.results[i].won;
			}
		}
		return false;
	};

	$scope.updatePerformance = function(wins, non_teaching_games) {
		var win_per = Math.floor((wins / non_teaching_games) * 100);
		$scope.performance = win_per + '% with ' + wins + ' wins over ' + non_teaching_games + ' games.';
	};

	$scope.playerFactionChanged = function(faction) {
		$scope.playerCasters = FactionService.getCastersForFaction(faction);
	};

	$scope.opponentFactionChanged = function(faction) {
		$scope.opponentCasters = FactionService.getCastersForFaction(faction);
	};

	$scope.getDesignationForLevel = function(level) {
		return designationMap[level];
	};

	$scope.getIconForFaction = function(faction) {
		return iconMap[faction];
	};
};

var controllers = angular.module('myApp.controllers');
controllers.controller('SearchController', SearchController);
