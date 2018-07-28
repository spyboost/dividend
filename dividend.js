(function(window) {
  
  const groupByYear = items => items.reduce((r, v) => {
    const groupItem = r[v.year];
    if (groupItem) {
        groupItem.count++;
        groupItem.amount += v.amount;
    } else {
        r[v.year] = {count: 1, amount: v.amount};
    }
    return r;
  }, {});
  
  const collectDataFromTable = (selector, dateIndex, amountIndex) => {
    const trItems = document.querySelectorAll('#quotes_content_left_dividendhistoryGrid tbody tr');
    const items = [];
    trItems.forEach(trItem => {
      const tdItems = trItem.querySelectorAll('td');
      const dateString = tdItems[dateIndex].innerText;
      const amountString = tdItems[amountIndex].innerText;
      const amount = parseFloat(amountString);
      const date = new Date(dateString);
      const year = date.getFullYear();
      const item = {year, amount};
      items.push(item);
    });
    const yearToData = groupByYear(items);
    return yearToData;
  };
  
  window.dividend = {
    groupByYear,
    collectDataFromTable
  };
})(window);
