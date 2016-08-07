import Ember from 'ember';
import fisherYates from 'typeswipe/utils/fisher-yates';
import typefaces from 'typeswipe/utils/typefaces';

export default Ember.Route.extend({
	beforeModel() {
		// https://developers.google.com/fonts/docs/getting_started#Optimizing_Requests
		// https://developers.google.com/fonts/docs/developer_api
		// window.WebFont.load({
		// 	// google: { families: typefaces }
		// 	google: { families: ['Oswald'] }
		// });
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
