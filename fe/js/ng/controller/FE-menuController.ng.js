angular.module('FE-menuController',[])
.controller(
	'FEMenuController',function($scope,FEMenuFactory){
		$scope.menuItemz=FEMenuFactory.getMenuItems();
		//JQuery animation
/*		$('#top-menu-toggle-box').click(function(){
			$('#menu-box').toggle('slow');
		});
		$('#middle').click(function(){
			$('#menu-box').hide('slow');
		});*/
		$('.product-list>h3').click(
			function(){
				alert('click!');
				$(this).next().toggle('slow');
			}
		);
		//End JQuery animation
	}
);