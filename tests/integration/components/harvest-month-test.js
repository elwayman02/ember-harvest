import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('harvest-month', 'Integration | Component | harvest month', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function (val) { ... });

  this.render(hbs`{{harvest-month}}`);

  assert.equal(this.$().text().trim(), '');
});
