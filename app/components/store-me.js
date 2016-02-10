import Ember from 'ember';

const {
  Component,
  computed,
  on,
  run
} = Ember;

export default Component.extend({
  valueA: '',
  valueAStored: '',
  valueB: '',
  valueBStored: '',
  getStored: on('init', function() {
    let valueA = localStorage.getItem('valueA');
    this.set('valueAStored', valueA);
    let valueB = localStorage.getItem('valueB');
    this.set('valueBStored', valueB);
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
