import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('harvest-day', 'Integration | Component | harvest day', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function (val) { ... });

  this.render(hbs`{{harvest-day}}`);

  assert.equal(this.$().text().trim(), '');
});
