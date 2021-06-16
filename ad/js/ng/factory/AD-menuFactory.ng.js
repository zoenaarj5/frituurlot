angular.module('AD-menuFactory',[])
	.factory('ADMenuFactory',function(GELanguageFactory){
		var factory={};
		var menuItemz={
			'fr':[
				{text:'Accueil',page:'home'},
				{text:'Produits',page:'products'},
				{text:'Promotions',page:'promotions'},
				{text:'Commandes',page:'orders'},
				{text:'Clients',page:'clients'}
			],
			'nl':[
				{text:'Start',page:'home'},
				{text:'Producten',page:'products'},
				{text:'Promoties',page:'promotions'},
				{text:'Bestellingen',page:'orders'},
				{text:'Klanten',page:'clients'}
			]
		};
		factory.getMenuItems=function(){
			var lang=GELanguageFactory.getLanguage();
			var itz=menuItemz[lang.code];
			if(typeof(itz)!='undefined'){
				return itz;
			}
			return {};
		};
		return factory;
	})
;