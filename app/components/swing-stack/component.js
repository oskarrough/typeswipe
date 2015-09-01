import Ember from 'ember';

const swing = window.gajus.Swing;

export default Ember.Component.extend({
	classNames: ['Swing'],
	stack: null, // Swing Stack instance

	swingConfig: {
		minThrowOutDistance: 280, // card width
		maxThrowOutDistance: 320,
		/**
		 * Invoked in the event of dragmove.
		 * Returns a value between 0 and 1 indicating the completeness of the throw out condition.
		 * Ration of the absolute distance from the original card position and element width.
		 *
		 * @param {Number} offset Distance from the dragStart.
		 * @param {HTMLElement} element Element.
		 * @return {Number}
		*/
		throwOutConfidence: function (offset, element) {
			return Math.min(Math.abs(offset) / (element.offsetWidth/2), 1);
		}
	},

	enableSwingPlugin: Ember.on('init', function() {
		this.set('stack', swing.Stack(this.get('swingConfig')));
	}),

	setFocusForKeyboardEvents: Ember.on('didInsertElement', function() {
    return this.$().attr({ tabindex: 1 }), this.$().focus();
  }),

	cardsInDeck: Ember.computed('childViews.@each.isDecked', function() {
		// return this.get('cards').filterBy('isDecked').get('lastObject');
		return this.get('childViews').filterBy('isDecked');
	}),

	topCardComponent: Ember.computed('childViews.@each.isDecked', function() {
		let component = this.get('cardsInDeck').get('lastObject');
		return component;
	}),

	keyUp(event) {
		if (event.keyCode === 37) { // LEFT
			this.send('throwLeft');
		} else if (event.keyCode === 39) { // RIGHT
			this.send('throwRight');
		} else if (event.keyCode === 27) { // ESC/
			this.send('throwIn');
		}
	},

	actions: {
		createCard(element) {
			return this.get('stack').createCard(element);
		},
		throwLeft() {
			let card = this.get('topCardComponent.swingCard');
			card.throwOut(-200, -100);
		},
		throwRight() {
			let card = this.get('topCardComponent.swingCard');
			card.throwOut(200, -100);
		},
		throwIn() {
			let card = this.get('topCardComponent.swingCard');
			card.throwIn(-200, -100);
		}
	}
});

// swingIt: Ember.on('didInsertElement', function() {
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
// 	}),
