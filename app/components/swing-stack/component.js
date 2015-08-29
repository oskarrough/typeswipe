import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'ul',
	classNames: ['Stack'],
	stack: null,

	config: {
		minThrowOutDistance: 150, /* card width */
		maxThrowOutDistance: 300
	},

	setStack: Ember.on('init', function() {
		var swing = window.gajus.Swing;
		this.set('stack', swing.Stack(this.get('config')));
	}),

	keyDown(event) {
		console.log(event);
		if (event.keyCode === 37) {
			console.log('go left');
		}
		if (event.keyCode === 39) {
			console.log('go right');
		}
	},

	swingIt: Ember.on('didInsertElement', function() {
		// var $cards = this.$('li').toArray();

		// Add card element to the Stack.
		// $cards.forEach((targetElement) => {
		// 	stack.createCard(targetElement);
		// 	targetElement.classList.add('is-stacked');
		// });

		// stack.on('dragstart', function(e) {
		// 	e.target.classList.add('is-dragging');
		// });
		//
		// stack.on('dragmove', function(e) {
		// 	console.log(e.throwDirection === swing.Card.DIRECTION_RIGHT ? 'right' : 'left');
		// 	// console.log(e.throwDirection);
		// 	// console.log(swing.Card);
		// 	// e.target.style.opacity = e.throwOutConfidence;
		// });
		//
		// stack.on('dragend', function(e) {
		// 	e.target.classList.remove('is-dragging');
		//
		// 	if (e.throwOutConfidence !== 1) {
		// 		console.log('what is this??');
		// 		// e.target.style.opacity = 1;
		// 		// throwOutConfidenceElements.yes.opacity = 0;
		// 	}
		// });
		//
		// // Wen a card is thrown out of the stack.
		// // e.target Reference to the element that has been thrown out of the stack.
		// // e.throwDirection Direction in which the element has been thrown (Card.DIRECTION_LEFT, Card.DIRECTION_RIGHT).
		// stack.on('throwout', function(e) {
		// 	console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection === 1 ? 'right' : 'left', 'direction.');
		// 	e.target.classList.remove('in-deck');
		// });
		//
		// stack.on('throwoutend', function(/*e*/) {
		// 	console.log('throwoutend');
		// });
		//
		// // When a card is thrown in the stack, including the spring back into place effect.
		// stack.on('throwin', function(e) {
		// 	console.log(e.target.innerText || e.target.textContent, 'has been thrown in to the stack from the', e.throwDirection === 1 ? 'right' : 'left', 'direction.');
		// 	e.target.classList.add('in-deck');
		// });
		//
		// stack.on('throwinend', function(/*e*/) {
		// 	console.log('throwinend');
		// });
	}),

	actions: {
		add(cardElement) {
			// this.get('items').pushObject({ title: title });
			return this.get('stack').createCard(cardElement);
		},
		remove(index) {
			console.log('remove item ' + index);
			//  this.get('items')splice(index, 1);
		},
		dragstart(eventObject) {
			console.log(eventObject);
		}
	}
});
