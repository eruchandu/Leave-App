export function daysDifference(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; 
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const diffMilliseconds = Math.abs(firstDate - secondDate);
  
    const diffDays = Math.round(diffMilliseconds / oneDay);
    console.log(diffDays)
  
    return diffDays;
  }