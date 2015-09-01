import Ember from 'ember';

function fisherYates (myArray) {
	var i = myArray.length;
	if ( i === 0 ) { return false; }
	while ( --i ) {
		var j = Math.floor( Math.random() * ( i + 1 ) );
		var tempi = myArray[i];
		var tempj = myArray[j];
		myArray[i] = tempj;
		myArray[j] = tempi;
	}
}

const typefaces = [
	'ABeeZee',
	'Abel',
	'Abril Fatface',
	'Alegreya Sans',
	'Alegreya',
	'Alfa Slab One',
	'Alice',
	'Allerta',
	'Amaranth',
	'Amatic SC',
	'Andika',
	'Anonymous Pro',
	'Archivo Narrow',
	'Arimo',
	'Arvo',
	'Asap',
	'Average',
	'Bevan',
	'Bitter',
	'Bree Serif',
	'Cabin',
	'Cantarell',
	'Cantata One',
	'Cardo',
	'Chivo',
	'Clicker Script',
	'Crete Round',
	'Crimson Text',
	'Cutive Mono',
	'Dancing Script',
	'Didact Gothic',
	'Domine',
	'Dosis',
	'Droid Sans',
	'Droid Serif',
	'EB Garamond',
	'Exo 2',
	'Fanwood Text',
	'Fauna One',
	'Fira Sans',
	'Fjalla One',
	'Flamenco',
	'Francois One',
	'Gentium Book Basic',
	'Gudea',
	'Hind',
	'Imprima',
	'Inconsolata',
	'Istok Web',
	'Josefin Sans',
	'Josefin Slab',
	'Judson',
	'Kameron',
	'Karla',
	'Kreon',
	'Lato',
	'Ledger',
	'Libre Baskerville',
	'Lobster',
	'Londrina Solid',
	'Lora',
	'Lora',
	'Lustria',
	'Medula One',
	'Merriweather',
	'Montserrat',
	'Muli',
	'Neuton',
	'Nixie One',
	'Nobile',
	'Nunito',
	'Old Standard TT',
	'Open Sans',
	'Oswald',
	'Ovo',
	'Oxygen',
	'Pacifico',
	'Patua One',
	'Philosopher',
	'Playfair Display SC',
	'Playfair Display',
	'Pontano Sans',
	'Poppins',
	'PT Mono',
	'PT Sans',
	'PT Serif',
	'Quando',
	'Quattrocento Sans',
	'Quattrocento',
	'Questrial',
	'Quicksand',
	'Raleway',
	'Rancho',
	'Roboto Slab',
	'Roboto',
	'Rokkitt',
	'Rufina',
	'Sacramento',
	'Sansita One',
	'Shadows Into Light',
	'Signika',
	'Sintony',
	'Source Sans Pro',
	'Source Serif Pro',
	'Squada One',
	'Stint Ultra Expanded',
	'Titillium Web',
	'Ubuntu',
	'Ultra',
	'Unica One',
	'Varela Round',
	'Vollkorn',
	'Walter Turncoat',
	'Work Sans',
	'Yeseva One'
];

export default Ember.Route.extend({
	beforeModel() {
		// https://developers.google.com/fonts/docs/getting_started#Optimizing_Requests
		// https://developers.google.com/fonts/docs/developer_api
		window.WebFont.load({
			// google: { families: typefaces }
			google: { families: ['Oswald'] }
		});
	},
	model() {
		// return this.store.get('typeface');

		// shuffle the array
		fisherYates(typefaces);

		// return a model for each typeface
		return typefaces.map((typeface) => {
			return this.store.createRecord('typeface', {
				title: typeface
			});
		});
	}
});
