import Ember from 'ember';

const {
  Component,
  computed,
  on,
  run
} = Ember;

export default Component.extend({
  valueAStored: '',
  valueA: '',
  getStored: on('init', function() {
    let valueA = localStorage.getItem('valueA');
    this.set('valueAStored', valueA);
  }),
  didInsertElement() {
    window.addEventListener('storage', e => {
      run(() => this.set(`${e.key}Stored`, e.newValue));
    });
  },

  willDestroyElement() {
    window.removeEventListener('storage');
  },

  actions: {
    storeMe(key, value) {
      this.set(`${key}Stored`, value);
      localStorage.setItem(key, value)
    }
  }
});
