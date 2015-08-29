import Ember from 'ember';

const EVENTS = ['throwout', 'throwoutleft', 'throwoutright', 'throwin', 'dragstart', 'dragmove', 'dragend'];

export default Ember.Component.extend({
	tagName: 'li',
	classNames: 'Stack-card',
	classNameBindings: ['isStacked', 'isDragging'],



	// Creates a 'swing card' from the component element and sends actions up
	swingIt: Ember.on('didInsertElement', function() {
		const card = this.addCard(this.element);

		// Proxy events up
		EVENTS.forEach((eventName) => {
			card.on(eventName, (eventObject) => {
				this.send(eventName, eventObject);
				this.sendAction(eventName, eventObject);
			});
		});
	}),

	// Create a card attached to the parent 'swing-stack' component
	addCard(cardElement) {
		const stack = this.getAttr('stack');

		this.set('isStacked', true);

		return stack.createCard(cardElement);
	},

	actions: {
		throwout(e) {},
		throwoutleft(e) { this.set('direction', 'left'); },
		throwoutright(e) { this.set('direction', 'right'); },
		throwin(e) {},
		dragstart(e) { this.set('isDragging', true); },
		dragmove(e) {},
		dragend(e) { this.set('isDragging', false); }
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
