angular.module('FE-userLogCheckController',[])
	.controller('FEUserLogCheckController',function($scope,$window/*,FEUserLogFactory*/){
//		console.log('user log check controller is on.');
		$scope.updateLoggedClient=function(){
//			console.log('updating logged client...');
			console.log('updating logged client...');
			var loggedClient=FEUserLogFactory.getLastSession();
			if(typeof(loggedClient)=='undefined'){
				alert('logged client data = '+JSON.stringify(loggedClient));
				$scope.contactFirstName='NIKS';
				$scope.contactName='NIKS';
				$scope.contactEmail='NIKS';
				$scope.firmName='NIKS';
				$scope.firmPhone='NIKS';
				$scope.firmFax='NIKS';
			}else{
				$scope.contactFirstName=loggedClient.client_contact_first_name;
				$scope.contactName=loggedClient.client_contact_name;
				$scope.contactEmail=loggedClient.client_contact_email;
				$scope.firmName=loggedClient.client_firm_name;
				$scope.firmPhone=loggedClient.client_firm_phone;
				$scope.firmFax=loggedClient.client_firm_fax;
				alert('logged client='+JSON.stringify(loggedClient));
				$window.location.href='#/';
			}
		};
		$scope.updateLoggedClient();
	})
;