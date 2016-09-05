import Component from 'ember-component';
import layout from '../templates/components/harvest-week';

export default Component.extend({
  layout,
  classNames: ['harvest-week'],
  tagName: 'tr',

  prefix: 'eh',
  selectedDate: null
});
