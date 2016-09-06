import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('harvest-month-view', 'Integration | Component | harvest month view', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{harvest-month-view}}`);

  let body = this.$('.eh-month-list');
  assert.equal(body.length, 1);
});
