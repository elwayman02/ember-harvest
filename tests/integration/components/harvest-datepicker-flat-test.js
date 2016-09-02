import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('harvest-datepicker-flat', 'Integration | Component | harvest datepicker flat', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{harvest-datepicker-flat}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#harvest-datepicker-flat}}
      template block text
    {{/harvest-datepicker-flat}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
