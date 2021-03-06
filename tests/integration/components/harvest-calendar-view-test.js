import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('harvest-calendar-view', 'Integration | Component | harvest calendar view', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function (val) { ... });

  this.render(hbs`{{harvest-calendar-view}}`);

  let daysHeader = this.$('.eh-days');
  assert.equal(daysHeader.length, 1);
});
