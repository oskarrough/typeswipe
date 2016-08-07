import Ember from 'ember';

const EVENTS = ['throwout', 'throwoutleft', 'throwoutright', 'throwin', 'dragstart', 'dragmove', 'dragend'];

export default Ember.Component.extend({
	tagName: 'li',
	classNames: 'Swing-card',
	classNameBindings: ['isStacked', 'isDragging', 'isDecked', 'throwDirection'],

	// Swing Card instance
	swingCard: null,

	fontFamily: Ember.computed('card.title', function() {
		return new Ember.Handlebars.SafeString('font-family: ' + this.get('card.title'));
	}),

	// didInitAttrs() {
	// 	console.log('didInitAttrs');
	// 	// console.log(this.get('stack'));
	// },
	// didRecieveAttrs() {
	// 	console.log('didRecieveAttrs');
	// 	// console.log(this.get('stack'));
	// },

	// When we have the element we can schedule creating a card
	didInsertElement() {
		Ember.run.scheduleOnce('afterRender', this, 'createCard');
	},

	createCard() {
		let swingCard = this.get('stack').createCard(this.element);

		// set properties
		// @todo or set on model???? guess not, since we don't want to pollute
		this.setProperties({
			swingCard,
			isStacked: true,
			isDecked: true
		});

		// load the font needed
		window.WebFont.load({
			google: { families: [this.get('card.title')] }
		});

		return this.bindEvents(swingCard);
	},

	// Catch events here and upwards
	bindEvents(swingCard) {
		EVENTS.forEach((eventName) => {
			swingCard.on(eventName, (eventObject) => {
				this.send(eventName, eventObject);
				this.sendAction(eventName, eventObject);
			});
		});
	},

	actions: {
		throwout(/*e*/) {
			console.log('throwout');
			this.set('isDecked', false);
			let el = Ember.$('.Swing-card.is-decked').last();
			console.log(el);
			el.addClass('is-last').focus();
		},
		throwoutleft(/*e*/) {},
		throwoutright(/*e*/) {},
		throwin(/*e*/) { this.set('isDecked', true); },
		dragstart(/*e*/) { this.set('isDecked', false); this.set('isDragging', true); },
		dragmove() {
			// this.set('throwDirection', e.throwDirection);
			// this.set('throwDirectionHuman', e.throwDirection === 1 ? 'right' : 'left');
		},
		dragend(/*e*/) { this.set('isDragging', false); }
	}
});

// These attributes can be put on a {{swing-card}} component to bind the actions to parent scope
// throwout=(action "")
// throwoutleft=(action "")
// throwoutright=(action "")
// throwin=(action "")
// dragstart=(action "")
// dragmove=(action "")
// dragend=(action "")
