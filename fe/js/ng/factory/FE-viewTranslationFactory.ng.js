angular.module('FE-viewTranslationFactory',[])
	.factory('FEViewTranslationFactory',function(GELanguageFactory){
		var factory={};
		var translationz={
			fr:{
				downLeftAd:{
					closureMessage:"Intéressé(e)? merci de nous contacter en ayant une preuve de solvabilité."
				},
				home:{
					fromTime:"de",
					hDFromTime:"de",
					hDToTime:"à",
					holidays:"Jours fériés",
					openingHours:"Heures d'ouverture",
					ordinaryDays:"Jours ordinaires",
					toTime:"à",
					studentWanted:"Nous cherchons un étudiant pour travailler le weekend !!! Veuillez nous contacter au 0493-327542",
					xMasSchedule:"CHERS CLIENTS, la friterie Mama sera fermée le 25 décembre 2020 et le 1er janvier 2021, mais sera ouverte les 26 et 27 décembre, ainsi que les 2 et 3 janvier de 16h à 21h30.",
//					coronaSchedule:"CHERS CLIENTS, Jusqu'au 3/9/2020 non inclus, la friterie Mama sera fermée du lundi au jeudi. Le terminal Bancontact reste disponible durant toute la période Coronavirus.",
					coronaSchedule:"CHERS CLIENTS, la friterie Mama est actuellement fermée du lundi au jeudi. Le terminal Bancontact reste disponible durant toute la période Coronavirus.",
//					coronaSchedule:"CHERS CLIENTS, Durant toute la période Coronavirus, le terminal Bancontact est disponible à la friterie \"Mama\".",
//					coronaSchedule:"ATTENTION: À partir du 16/03/2020 et jusqu'à nouvel ordre, la friterie \"Mama\" reste ouverte tous les jours de 11h à 22h.",
					specialClosingDays:"ATTENTION: La friterie \"Mama\" est ouverte tous les jours fériés de l'année, sauf les 24, 25 et 31 déc, ainsi que le 1er janvier.",
					closureMessage:"Si intéressé(e), merci de nous contacter en ayant une preuve de solvabilité."
				}/*,
				homeByeBye:{
					closureMessage:"Si intéressé(e), merci de nous contacter en ayant une preuve de solvabilité."
				}*/,
				cartConfirm:{
					cartQuantity:'Quantité',
					goBack:'Retour'
				},
				contact:{
					map:'Carte',
					call:'Appeler',
					sendEmail:'Envoyer un email'
				},
				gallery:{
					title:"Galerie"
				},
				language:{
					changeRequestConfirmation:'Voulez-vous vraiment changer la langue?',
					login:'(Dé)connexion'
				},
				myOrders:{
					back:'Retour',
					clientFirmName:'Société',
					clientName:'Nom',
					clientFirstName:'Prénom',
					firm:'Société',
					orderDate:'Date',
					orderDelivered:'Livré',
					orderFrom:'via',
					orderNr:'Commande n°',
					orderPaid:'Payé',
					productName:'Produit',
					OLPrice:'Prix',
					OLReduction:'Réduction',
					OLQuantity:'Quantité',
					OLTotal:'Total',
					noSessionMessage:'Veuillez vous identifier.',
					printableVersion:'Version imprimable',
					printOrder:'Imprimer',
					sendingDate:'Envoyée le',
					viewOrder:'Voir'
				},
				passwordChange:{
					passwordChangeTitle:'Changement de mot de passe',
					passwordChangeText:'Un code a été envoyé à votre adresse électronique. Avec ce code, vous pourrez choisir un nouveau mot de passe.'
				},
				photoGallery:{
					pageTitle:"Galerie de photos"
				},
				promotionAdverts:{
					pageTitle:"Nos promotions"
				},
				promotions:{
					noPromotions:'Il n\'y a aucune promotion en ce moment.',
					pageTitle:'Promotions',
					productName:'Produit',
					promotionType:'Type',
					promotionValue:'Valeur',
					promotionStartDate:'Début',
					promotionEndDate:'Fin'
				},
				shop:{
					addedAmount:'Montant',
					backToCard:'Retour à la carte',
					chooseSauce:'Une sauce?',
					confirmEmptyOrder:'Voulez-vous vraiment vider toute la commande?',
					confirmSendOrder:'Voulez-vous vraiment envoyer la commande?',
					emptyCart:'Vider',
					emptyCartMessage:'Vous n\'avez encore rien commandé.',
					errorMessageAddingOrder:'La commande n\'a pas été ajoutée. Veuillez réessayer.',
					findProduct:'Rechercher un produit',
					noSession:'Session inexistante. Veuillez d\'abord vous identifier.',
					orderSent:'Votre commande est envoyée! Allez maintenant dans "mes commandes" et choisissez d\'imprimer la première commande dans la liste. Ce sera la version à faxer.',
					reduction:'Réduction',
					resetSearch:'Vider la recherche',
					sendCart:'Envoyer',
					total:'Total',
					totalPrice:'Prix total',
					hideCart:'Cacher',
					viewCart:'Voir',
					toCart:'Ma commande',
//					toOrderHistory:'Mes commandes',
					orderLineNotSelected:'Aucun produit n\'a été choisi.',

					fullReduxColumn:'Réduction totale',
					productDescriptionColumn:'Description',
					productNameColumn:'Nom',
					productPriceColumn:'Prix',
					reduxColumn:'Réduction',
					totalLinePriceColumn:'Prix final',
					//CART CONFIRM PAGE TRANSLATION
					cancelProduct:'Annuler',
					cartConfirmTitle:'Votre commande',
					cartQuantity:'Quantité',
					goBack:'Terug',
//					toCard:'Commander',
					newOrderMessage:'Votre message',
					COMMessage:'Si besoin, précisez ici : le détail de votre commande, la date/heure de livraison souhaitée, etc. Si vous n\'avez pas été contacté dans la demi-heure, appelez le 023108016',
					//CARD PAGE TRANSLATION
					cardTitle:'Notre carte',
/*					toOrder:'Commander',*/
					useFax:'Envoyer par fax',
					viewCard:'Voir la carte',
					viewOrder:'Voir la commande'
				},
				userLog:{
					confirmpasswordChange:'Avez-vous vraiment oublié votre mot de passe?',
					contactEmail:'Email',
					contactGSM:'GSM Contact',
					firmFax:'Fax Société',
					firmName:'Nom Société',
					firmPhone:'Tél. Société',
					forgottenPassword:'Mot de passe oublié?',
					loggedInMessage:'vous êtes loggé(e)!',
					notLoggedInMessage:'la tentative de connexion a échoué. Voulez-vous vous inscrire sur le site?',
					password:'Mot de passe',
					pageTitle:'Identifiez-vous',
					retryUserLogMessage:'L\'identification a échoué. Voulez-vous réessayer?',
					sendData:'Envoyer',
					topMessage:'Entrez l\'une des données(téléphone de la société, gsm de la personne de contact, nom de la société) et le mot de passe pour vous identifier.',
					toRegistration:'Inscrivez-moi'
				},
				registration:{
					pageTitle:'Mes données',
					pageIntro:'Quelques informations sont nécessaires pour pouvoir enregistrer vos commandes.',
					contactTitle:'Contact',
					contactEmail:'Email contact',
					contactEmailVerif:'Conf. email contact',
					contactGSM:'GSM contact',
					contactName:'Nom',
					contactFirstName:'Prénom',
					firmTitle:'Société',
					firmName:'Société',
					firmPhone:'Tél.',
					firmFax:'Fax',
					addressStreet:'Rue',
					addressNumber:'N°',
					addressBox:'Boîte',
					addressZipCode:'Code postal',
					addressCity:'Ville',
					invalidConfirmationMessage:'Vérifiez les champs à confirmer(mot de passe,email).',
					logTitle:'Identification',
					password:'Mot de passe',
					passwordVerif:'Conf. mot de passe',
					securityQuestion:'Question de sécurité',
					securityAnswer:'Réponse',
					confirmationTitle:'Confirmation',
					sendUserData:'Envoyer',
					emptyUserData:'Effacer',
					registerOKMessage:'Vous êtes bien enregistré.',
					registerNotOKMessage:'Votre enregistrement a échoué. Il se peut que certaines données(email, mot de passe, nom de société) soient déjà utilisées.',
					registrationDone:'Déjà fait'
				}
			},
			nl:{
				downLeftAd:{
					closureMessage:"Geïnteresseerd? Contacteer ons met een bewijs van kredietwaardigheid."
				},
				home:{
					fromTime:"vanaf",
					hDFromTime:"vanaf",
					hDToTime:"tot",
					holidays:"Feestdagen",
					openingHours:"Openingsuren",
					ordinaryDays:"Gewone dagen",
					toTime:"tot",
					studentWanted:"We zoeken een student om tijdens het weekend te werken !!! Contacteer ons op 0493-327542",
					xMasSchedule:"BESTE KLANTEN, de frituur Mama is gesloten op 25 december 2020 en 1st januari 2021, maar is open op 26 en 27 december, en op de 2 en 3 januari vanaf 16u tot 21u30.",
//					coronaSchedule:"BESTE KLANTEN, Tot de 3/9/2020 niet inbegrepen, is de frituur Mama gesloten van maandag tot donderdag. Het Bancontactapparaat blijft beschikbaar tijdens de hele Coronavirusperiode.",
					coronaSchedule:"BESTE KLANTEN, de frituur Mama is momenteel gesloten van maandag tot donderdag. Het Bancontactapparaat blijft beschikbaar tijdens de hele Coronavirusperiode.",
//					coronaSchedule:"BESTE KLANTEN, Gedurende de hele Coronavirusperiode blijft het Bancontactapparaat beschikbaar aan de frituur \"Mama\".",
//					coronaSchedule:"OPGELET: Vanaf 16/03/2020 tot nader order, blijft de frituur \"Mama\" open vanaf 11u tot 22u.",
					specialClosingDays:"OPGELET: De frituur \"Mama\" is open gedurende alle feestdagen, behalve op 24ste, 25ste en 31ste dec en op 1ste januari.",
					closureMessage:"Als u geïnteresseerd bent, contacteer ons met een bewijs van kredietwaardigheid."
				}/*,
				homeByeBye:{
					closureMessage:"Als u geïnteresseerd bent, contacteer ons met een bewijs van kredietwaardigheid."
				}*/,
				contact:{
					map:'Plattegrond',
					call:'Bellen',
					sendEmail:'Email verzenden'
				},
				gallery:{
					title:"Galerie",
				},
				language:{
					changeRequestConfirmation:'Wil u de taal van de website echt veranderen?',
					login:'In(uit)loggen'
				},
				myOrders:{
					back:'Terug',
					clientFirmName:'Bedrijf',
					clientName:'Naam',
					clientFirstName:'Voornaam',
					firm:'Bedrijf',
					orderDate:'Datum',
					orderDelivered:'Geleverd',
					orderFrom:'via',
					orderNr:'Bestelling nr',
					orderPaid:'Betaald',
					productName:'Product',
					OLPrice:'Prijs',
					OLReduction:'Afkorting',
					OLQuantity:'Hoeveelheid',
					OLTotal:'Totaal',
					noSessionMessage:'Gelieve u aan te melden.',
					printableVersion:'Version imprimable',
					printOrder:'Afdrukken',
					sendingDate:'Verzonden op',
					viewOrder:'Bekijken'
				},
				passwordChange:{
					passwordChangeTitle:'Wachtwoordverandering',
					passwordChangeText:'Een code werd aan uw emailaddress verzonden. Daarmee kunt u een nieuw passwoord kiezen.'
				},
				photoGallery:{
					pageTitle:"Fotogalerij"
				},
				promotionAdverts:{
					pageTitle:"Onze promoties"
				},
				promotions:{
					noPromotions:'Er is nu geen promotie.',
					pageTitle:'Promoties',
					productName:'Product',
					promotionType:'Soort',
					promotionValue:'Waarde',
					promotionStartDate:'Begin',
					promotionEndDate:'Einde'
				},
				shop:{
					backToCard:'Terug naar kaart',
					chooseSauce:'Een saus?',
					confirmEmptyOrder:'Wil u de hele bestelling echt legen?',
					confirmSendOrder:'Wil u de bestelling echt verzenden?',
					addedAmount:'Bedrag',
					emptyCart:'Legen',
					emptyCartMessage:'U hebt nog niets besteld.',
					errorMessageAddingOrder:'De bestelling werd niet toegevoegd. Gelieve opnieuw te proberen.',
					findProduct:'Product zoeken',
					noSession:'Onbestande sessie. Gelieve uzelf te identificeren.',
					orderSent:'Uw bestelling is gezonden! Ga nu naar "mijn bestellingen" en kies om de eerste bestelling af te drukken. Dat is de versie om te faxen.',
					reduction:'Afkorting',
					resetSearch:'Zoek legen',
					sendCart:'Verzenden',
					toCart:'Mijn bestelling',

//					toOrderHistory:'Mijn bestellingen',
					totalPrice:'Totale prijs',
					total:'Totaal',
					hideCart:'Verbergen',
					viewCart:'Tonen',
					orderLineNotSelected:'Geen product gekozen.',

					fullReduxColumn:'Totaalafkorting',
					productDescriptionColumn:'Beschrijving',
					productNameColumn:'Naam',
					productPriceColumn:'Prijs',
					reduxColumn:'Afkorting',
					totalLinePriceColumn:'Uiteindelijke prijs',
					
					//CART CONFIRM PAGE TRANSLATION
					cancelProduct:'Annuleren',
					cartConfirmTitle:'Uw bestelling',
					cartQuantity:'Hoeveelheid',
					goBack:'Terug',
//					toCard:'Bestellen',
					newOrderMessage:'Uw bericht',
					COMMessage:'U kunt hier bepalen: gegevens van uw bestelling, de gewenste leveringsdatum-en tijd, etc. Indien u niet werd teruggebeld na een halfuur, bel maar 023108016',
					//CARD PAGE TRANSLATION
					cardTitle:'Onze kaart',
//					toOrder:'Bestellen',
					useFax:'Door fax verzenden',
					viewCard:'Kaart bekijken'
				},
				userLog:{
					confirmpasswordChange:'Bent u uw wachtwoord echt vergeten?',
					contactEmail:'Email',
					loggedInMessage:'u bent gelogd!',
					notLoggedInMessage:'U hebt zich niet kunnen loggen. Wil u zich op deze site inschrijven?',
					password:'Wachtwoord',
					firmPhone:'Tel. Bedrijf',
					firmFax:'Fax Bedrijf',
					contactGSM:'GSM Contact',
					firmName:'Bedrijfsnaam',
					pageTitle:'Identificeer u',
					topMessage:'Geef één van de gegevens(telefoon van uw bedrijf, gsm van de contactpersoon,naam van het bedrijf) met het Wachtwoord om u zelf te identificeren.',
					retryUserLogMessage:'De identificatiepoging is niet gelukt. Wil u nog proberen?',
					sendData:'Verzenden',
					forgottenPassword:'Wachtwoord vergeten ?',
					toRegistration:'Schrijf me in'
				},
				registration:{
					pageTitle:'Mijn gegevens',
					pageIntro:'Enkele inlichtingen zijn nodig om uw bestellingen op te kunnen slaan.',
					contactTitle:'Contact',
					contactEmail:'Email contact',
					contactEmailVerif:'Email contact bev.',
					contactGSM:'GSM contact',
					contactName:'Naam',
					contactFirstName:'Voornaam',
					firmTitle:'Bedrijf',
					firmName:'Bedrijfsnaam',
					firmPhone:'Phone',
					firmFax:'Fax',
					addressStreet:'Straat',
					addressNumber:'Nummer',
					addressBox:'Bus',
					addressZipCode:'Postcode',
					addressCity:'Stad',
					invalidConfirmationMessage:'Enkele velden(email,wachtwoord) moet u correct bevestigen.',
					logTitle:'Identificatie',
					password:'Wachtwoord',
					passwordVerif:'Wachtwoord bev.',
					securityQuestion:'Veiligheidsvraag',
					securityAnswer:'Antwoord',
					confirmationTitle:'Bevestiging',
					sendUserData:'Verzenden',
					emptyUserData:'Legen',
					registerOKMessage:'U werd goed geregistreerd.',
					registerNotOKMessage:'Uw registratie is niet gelukt. Het is mogelijk dat bepaalde gegevens(email, wachtwoord, bedrijfsnaam) al worden gebruikt.',
					registrationDone:'Al gedaan'
				}
			}
		};
		factory.getTranslations=function(page){
			var lang=GELanguageFactory.getLanguage();
			var tranz=translationz[lang.code][page];
			if(typeof(tranz)!='undefined'){
//				alert('tranzlation='+JSON.stringify(tranz));
				return tranz;
			}
			return {};
		};
		return factory;
	})
;