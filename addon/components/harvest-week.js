import Component from 'ember-component';
import computed from 'ember-computed';
import layout from '../templates/components/harvest-week';

export default Component.extend({
  layout,
  classNameBindings: ['weekClass'],
  tagName: 'tr',

  prefix: 'eh',
  selectedDate: null,
  week: null,

  weekClass: computed('prefix', function () {
    return `${this.get('prefix')}-week`;
  })
});
