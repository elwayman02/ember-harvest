import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('harvest-picker-header', 'Integration | Component | harvest picker header', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    {{#harvest-picker-header}}
      template block text
    {{/harvest-picker-header}}
  `);

  let title = this.$('.eh-title');
  assert.equal(title.length, 1);
});
