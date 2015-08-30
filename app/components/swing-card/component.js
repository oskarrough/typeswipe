import Ember from 'ember';

const EVENTS = ['throwout', 'throwoutleft', 'throwoutright', 'throwin', 'dragstart', 'dragmove', 'dragend'];

export default Ember.Component.extend({
	tagName: 'li',
	classNames: 'Stack-card',
	classNameBindings: ['isStacked', 'isDragging', 'throwDirection'],

	fontFamily: Ember.computed('card.title', function() {
		return new Ember.Handlebars.SafeString('font-family: ' + this.get('card.title'));
	}),

	didInitAttrs() {
		console.log('didInitAttrs');
		// console.log(this.get('stack'));
	},
	didRecieveAttrs() {
		console.log('didRecieveAttrs');
		// console.log(this.get('stack'));
	},

	// When we have the element we can schedule creating a card
	didInsertElement() {
		Ember.run.scheduleOnce('afterRender', this, 'createCard');
	},

	createCard() {
		let stackCard = this.get('stack').createCard(this.element);

		this.setProperties({
			stackCard,
			isStacked: true,
			isDecked: true
		});

		return this.bindEvents(stackCard);
	},

	// Catch events here and upwards
	bindEvents(stackCard) {
		EVENTS.forEach((eventName) => {
			stackCard.on(eventName, (eventObject) => {
				this.send(eventName, eventObject);
				this.sendAction(eventName, eventObject);
			});
		});
	},

	actions: {
		throwout(/*e*/) { this.set('isDecked', false); },
		throwoutleft(/*e*/) {},
		throwoutright(/*e*/) {},
		throwin(/*e*/) { this.set('isDecked', true); },
		dragstart(/*e*/) { this.set('isDecked', false); this.set('isDragging', true); },
		dragmove(e) {
			this.set('throwDirection', e.throwDirection);
			this.set('throwDirectionHuman', e.throwDirection === 1 ? 'right' : 'left');
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
