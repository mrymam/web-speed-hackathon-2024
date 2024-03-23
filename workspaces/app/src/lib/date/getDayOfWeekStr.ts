// import type moment from 'moment';
// import moment from 'moment';
// const moment = lazy(() => import('moment'));

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

export const getDayOfWeekStr = (date: Date) => {
  // const dayOfWeek = date.day();
  const dayOfWeek = date.getDay() 
  const dayStr = days.at(dayOfWeek);
  if (dayStr == null) {
    throw new Error('dayOfWeek is invalid');
  }
  return dayStr;
};
