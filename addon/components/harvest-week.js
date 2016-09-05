import Ember from 'ember';
import layout from '../templates/components/harvest-week';

export default Ember.Component.extend({
  layout,
  classNames: ['harvest-week'],
  tagName: 'tr',

  prefix: 'eh',
  selectedDate: null
});
