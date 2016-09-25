import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('harvest-weekpicker', 'Integration | Component | harvest weekpicker', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function (val) { ... });

  this.render(hbs`{{harvest-weekpicker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#harvest-weekpicker}}
      template block text
    {{/harvest-weekpicker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
