angular.module('FE-galleryController',[])
	.controller('FEGalleryController',function($scope,$rootScope,GELanguageFactory,FEViewTranslationFactory){
		$scope.languages=GELanguageFactory.getLanguages();
		$scope.tranz=FEViewTranslationFactory.getTranslations('gallery');
		$scope.setLanguage=function(languageCode){
			if(confirm($scope.tranz.changeRequestConfirmation)){
				GELanguageFactory.setLanguage(languageCode);
			}
		};
		$scope.galleryPikz=[
			{name:"001",type:"jpg"},
			{name:"002",type:"jpg"},
			{name:"003",type:"jpg"},
			{name:"004",type:"jpg"},
			{name:"005",type:"jpg"},
			{name:"006",type:"jpg"},
			{name:"007",type:"jpg"}
		];
		$scope.init=function(){
			console.log("initializing");
			$scope.setVisibleLightBoxActions(true);
		}
		$scope.setVisibleLightBoxActions=function(show){
			let actionz=document.querySelector('.lightBoxArrowImage');
			for(let i=0;i<actionz.length;i++){
				console.log("doing action '"+actionz[i].id+"'...");
				actionz[i].style.display=show?"block":"none";
				console.log("action '"+actionz[i].id+"' is now "+(show?"shown":"hidden")+".");
			}
			
		};
		$scope.showLightBoxGalleryPic=function(picName){
			console.log("starting with showing light box gallery pics...");
			for(let pik of $scope.galleryPikz){
				console.log('comparing pic name \''+pik.name+'\' to \''+picName+'\'...');
				if(picName==pik.name){
					let elt=document.getElementById("lightBoxGalleryPicBox_"+pik.name);
					if(elt!==null){
						elt.style.display="block";
						$scope.setVisibleLightBoxActions(true);
						break;
					}
				}else{
					console.log("names not matching.");
				}
			}
		};
		$scope.slide=function(right){
			console.log(right?"TRIBORD >>>":"<<< BABORD");
			const LB_PREF="lightBoxGalleryPicBox_";
			let infoField=document.getElementById("currentLBImageName");
			let idLastPart=infoField.value;
			if(idLastPart==""){
				idLastPart=$scope.galleryPikz[0].name;
			}
			console.log("Looking for element \""+(LB_PREF+idLastPart)+"\"");
			let elt=document.getElementById(LB_PREF+idLastPart);
			let next=right?elt.nextElementSibling:elt.previousElementSibling;
			if([null,undefined].indexOf(next)>-1){
				console.log("Next element is null, so "+(right?"first":"last")+" element will be taken");
				next=right?elt.parentNode.firstElementChild:elt.parentNode.lastElementChild;
			}
			if(next!==null && next!==elt){
				console.log("next's id = "+next.id);
				elt.style.display='none';
				next.style.display='block';
				infoField.value=next.id.replace(LB_PREF,"");
			}
		};
	})
;