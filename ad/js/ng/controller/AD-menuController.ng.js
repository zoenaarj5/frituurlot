angular.module('AD-menuController',[])
	.controller('AD-menuController',function($scope,ADMenuFactory){
		$scope.menuItemz=ADMenuFactory.getMenuItems();
//		alert('menuItemz='+JSON.stringify($scope.menuItemz));
		//JQuery animation
		$('#top-menu-toggle-box').click(function(){
			$('#menu-box').toggle('slow');
		});
		//End JQuery animation
	})
;