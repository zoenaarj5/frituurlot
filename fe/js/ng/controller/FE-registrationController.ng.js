angular.module('FE-registrationController',[])
	.controller('FERegistrationController',function($window,$scope,FEViewTranslationFactory,FERegistrationFactory,FEUserLogFactory){
		FEUserLogFactory.checkLog();
		$scope.tranz=FEViewTranslationFactory.getTranslations('registration');
		$scope.securityQuestionz={};
		FERegistrationFactory.getSecurityQuestions(
			function(data){
//				alert('found data='+JSON.stringify(data));
				$scope.securityQuestionz=data['data'];
//				alert('Security questionz='+JSON.stringify($scope.securityQuestionz));
			},null
		);
		$scope.verifyMatchingFields=function(){
			var verifiables=[
				'contactEmail',
				'password'
			];
			for(var i=0;i<verifiables.length;i++){
				if($scope.userData[verifiables[i]]!=$scope.userData[verifiables[i]+'Verif']){
					return false;
				}
			}
			return true;
		};
		$scope.register=function(){
			if($scope.verifyMatchingFields()){
				alert('registering client...');
				FERegistrationFactory.addClient(
					$scope.userData,
					function(data){
						var myData=data.data;
						alert('data='+JSON.stringify(myData));
						if(''+parseInt(myData)==''+myData && parseInt(myData)==0){
							alert($scope.tranz.registerOKMessage);
							$window.location.href='#/';
						}else{
							alert($scope.tranz.registerNotOKMessage);
	//						alert('data='+JSON.stringify(myData));
						}
					},
					function(data){
						alert($scope.tranz.registerNotOKMessage);
						alert('Internal error during registration process. data='+data);
					}
				);
			}else{
				alert($scope.tranz.invalidConfirmationMessage);
			}
		};
		$scope.resetData=function(){
//			alert('resetting data...');
			var keyz=['contactEmail',
				'contactEmail','contactGSM','contactName',
				'contactFirstName','firmName','firmFax',
				'addressStreet=','addressNumber','addressBox',
				'addressZipCode','addressCity','password=',
				'securityQuestionId','securityAnswer'
			];
			for(var i=0;i<keyz.length;i++){
				$scope.userData[keyz[i]]='';
			}
		}
	})
;