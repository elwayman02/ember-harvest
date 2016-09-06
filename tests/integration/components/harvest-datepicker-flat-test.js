import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('harvest-datepicker-flat', 'Integration | Component | harvest datepicker flat', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{harvest-datepicker-flat}}`);

  let header = this.$('.eh-header');
  assert.equal(header.length, 1);
});
