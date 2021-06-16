angular.module('FE-userLogController',[])
	.controller('FEUserLogController',function($window,$scope,FEUserLogFactory,FEViewTranslationFactory){
		$scope.tranz=FEViewTranslationFactory.getTranslations('userLog');
		$scope.loginFieldz=['contactEmail','contactGSM','firmName','firmPhone','firmFax'];
		$scope.loginField=$scope.loginFieldz[0];
		FEUserLogFactory.unlogClient();
		FEUserLogFactory.checkLog();
		$scope.logClient=function(){
//			alert('About to log client...');
			var inputData={};
			inputData[$scope.loginField]=$scope.loginData;
			inputData.password=$scope.password;
//			alert('input data='+JSON.stringify(inputData));
			$('body').addClass('busy');
			FEUserLogFactory.logClient(
				inputData,
				function(data){
					var myData=data.data;
//					alert('login data='+JSON.stringify(myData)+',intdata='+parseInt(myData));
					if(/*parseInt(myData)!=NaN || */''+parseInt(myData)==''+myData){
						if(confirm($scope.tranz.notLoggedInMessage)) {
							$window.location.href='#/registration';
						}else{
							if(!confirm($scope.tranz.retryUserLogMessage)){
								$window.location.href='#/home';
							}
						}
						FEUserLogFactory.unlogClient();
					}else{
//						alert('yes!');
/*						switch(navigator.appName){
							case 'Microsoft Internet Explorer':
								break;
							case 'Netscape':
							default:*/
								alert(myData.client_contact_first_name+' '+myData.client_contact_name+','+$scope.tranz.loggedInMessage);
//						}
//						$window.location.href='#/home';
					}
					$('body').removeClass('busy');
//					alert('logged in client data='+JSON.stringify(myData));
				},
				function(data){
					FEUserLogFactory.unlogClient();
					$('body').removeClass('busy');
					alert('Error on getting user data.');
				}
			);
		};
		$scope.updateLoggedClient=function(){
			$scope.loggedClient=FEUserLogFactory.getLastSession();
		};
		$scope.toPasswordChange=function(){
			if(confirm($scope.tranz.confirmpasswordChange)){
				$window.location.href='#/passwordChange';
			}
		}
	})
;