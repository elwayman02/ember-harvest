import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('harvest-monthpicker', 'Integration | Component | harvest monthpicker', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function (val) { ... });

  this.render(hbs`{{harvest-monthpicker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#harvest-monthpicker}}
      template block text
    {{/harvest-monthpicker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
