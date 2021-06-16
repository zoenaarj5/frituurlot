angular.module('FE-homeController',[])
	.controller('FEHomeController',function($scope,$window,FEViewTranslationFactory,GEDateFactory,GELanguageFactory,FEUserLogFactory)
	{
		var PAGE_NAME="home";
		FEUserLogFactory.checkLog();
		$scope.tranz=FEViewTranslationFactory.getTranslations(PAGE_NAME);
		var messagez={
			'fr':[
				{id:1,title:'Spécial firme',content:'Livraison à domicile, gratuite à Lot!',img:'istock_000004333554xsmall',link:'shop'},
				{id:2,title:'Faxez , recevez',content:'02/3109717 - Envoyez-nous votre commande par fax, nous vous la livrons directement à votre firme!',img:'order-by-fax',link:'shop'},
				{id:3,title:'Contactez-nous',content:'02/3108016 - 11h à 17h, semaine et weekend',img:'contact',link:'contactBis'}
			],
			'nl':[
				{id:1,title:'Bedrijven speciaal',content:'Thuislevering, gratis in Lot!',img:'istock_000004333554xsmall',link:'shop'},
				{id:2,title:'Fax , ontvang',content:'02/3109717 - Zend uw bestelling door fax, we leveren u aan uw bedrijf!',img:'order-by-fax',link:'shop'},
				{id:3,title:'Contacteer ons',content:'02/3108016 - 11u tot 17u, ook tijdens de weekend',img:'contact',link:'contactBis'}
			],
		};
		var code=GELanguageFactory.getLanguage().code,
			weekDays=GEDateFactory.getWeekDays(code);
		$scope.messages=messagez[code];
//		$scope.homeImagez=["01","1320428007983","i-stoofvlees","o-geros-tou-morya"];
//		$scope.homeImagez=["IMG_0087","IMG_0088","IMG_0092","IMG_0095","IMG_0096","IMG_0097","IMG_0099","IMG_0100","IMG_0101","IMG_0103","IMG_0105","IMG_0107","IMG_0109","IMG_0111","IMG_0112","IMG_0114","IMG_0115"];
//		$scope.homeImagez=["2016-07-31 image1","2016-07-31 image2","2016-07-31 image3","2016-07-01/image0","2016-07-01/image1","2016-07-01/image2","2016-07-01/image3","2016-07-01/image4","2016-07-01/image5","2016-07-01/image6","IMG_0115",,/*"IMG_0092",*/"image1","image2",/*"IMG_0095","IMG_0098",*/"IMG_0099","IMG_0100","IMG_0101","IMG_0103","IMG_0105","IMG_0107","IMG_0109","IMG_0111","IMG_0112"];
		$scope.homeImagez=["001","002","003","004","005","006","007"];
		var hMinPlan=[
			[[0,0],[0,0],[0,0],[0,0]],
			[[0,0],[0,0],[0,0],[0,0]],
			[[0,0],[0,0],[0,0],[0,0]],
			[[11,0],[22,0],[11,0],[22,0]],
			[[11,0],[22,0],[11,0],[22,0]],
			[[11,0],[22,0],[11,0],[22,0]],
			[[11,0],[22,0],[11,0],[22,0]]
		];
		$scope.weeklyPlan=[];
//		$scope.weeklyPlan.push({weekDay:"Jours fériés/Feestdagen",times:[["11","00"],["22","00"]]});
		for(i=0;i<hMinPlan.length;i++){
			$scope.weeklyPlan[i+1]={};
			$scope.weeklyPlan[i+1].weekDay=weekDays[i];
//			$scope.weeklyPlan[i+1].times=[writeTime(hMinPlan[i][0]),writeTime(hMinPlan[i][1])];
			$scope.weeklyPlan[i+1].times=[];
			for(let j=0;j<hMinPlan[i].length;j++){
				$scope.weeklyPlan[i+1].times.push(writeTime(hMinPlan[i][j]));
			}
		}
		$scope.goToPage=function(pageName){
			$window.location.href='#/'+pageName;
		};
		function writeTime(time){
			var writtenTime=[],sum=0;
			for(var i=0;i<2;i++){
				if(time[i]<=9){
					writtenTime[i]="0"+time[i];
				}else{
					writtenTime[i]=""+(time[i]%60);
				}
				sum+=time[i]
			}
			if(sum==0){
				return ["--","--"];
			}
			return writtenTime;
		}
//JQUERY
		$scope.rew=function(){
			var container=$("#sldImgCont");
			var content=$("#sldImgCont>.sldImgElt");
			content.last().prependTo(container);
		};
		$scope.fwd=function(){
			var container=$("#sldImgCont");
			var content=$("#sldImgCont>.sldImgElt");
			content.first().appendTo(container);
		};
//JQUERY
	}
);