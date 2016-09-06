import HarvestDatepicker from './harvest-datepicker';
import DateRange from '../utils/harvest-date-range';

export default HarvestDatepicker.extend({
  isWeekpicker: true,

  init() {
    this._super(...arguments);

    if (!this.get('selectedRange')) {
      this.setDefaultRange();
    }
  },

  setDefaultRange() {
    let date = this.get('selectedDate');
    let day = date.getDay();
    let weekStart = this.get('weekStart');

    let startDate, endDate;
    if (day >= weekStart) {
      startDate = new Date(date.getTime());
      startDate.setDate(startDate.getDate() - (day - weekStart));
      endDate = new Date(startDate.getTime());
      endDate.setDate(endDate.getDate() + 6);
    } else {
      endDate = new Date(date.getTime());
      endDate.setDate(endDate.getDate() + (weekStart - day));
      startDate = new Date(endDate.getTime());
      startDate.setDate(startDate.getDate() - 6);
    }

    this.set('selectedRange', DateRange.create({
      startDate,
      endDate
    }));
  }
});
