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
  
  const collectDataFromTable = (trSelector, dateIndex, amountIndex) => {
    const trItems = document.querySelectorAll(trSelector);
    const items = [];
    trItems.forEach(trItem => {
      const tdItems = trItem.querySelectorAll('td');
      const dateString = tdItems[dateIndex].innerText;
      // A naive and quick way to check if the row contains data and is not a header.
      // Check if the date is a valid date per https://stackoverflow.com/a/1353711
      const date = new Date(dateString);
      if (!isNaN(date)) {
        const amountString = tdItems[amountIndex].innerText;
        const amountStringJustNumber = amountString.replace(/[^\d\.]/g,'');
        const amount = parseFloat(amountStringJustNumber);
        const year = date.getFullYear();
        const item = {year, amount};
        items.push(item);
      }
    });
    const yearToData = groupByYear(items);
    return yearToData;
  };
  
  window.dividend = {
    groupByYear,
    collectDataFromTable
  };
})(window);
