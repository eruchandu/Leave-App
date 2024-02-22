function daysDifference(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    const startDayOfWeek = firstDate.getDay(); 
    const endDayOfWeek = secondDate.getDay(); 
    let totalWeekends = Math.floor((diffDays + startDayOfWeek - endDayOfWeek) / 7) * 2;
    const diffWithoutWeekends = diffDays - totalWeekends;
    return diffWithoutWeekends + 1; 
  }

  console.log(daysDifference("2024-02-16","2024-02-26"));
  