(function(window) {
  
  const hostToConfig = {
    'invesco.com': {trSelector: '#distributionTable tbody tr', dateIndex: 0, amountIndex: 4},
    'ishares.com': {trSelector: '#distroTable tbody tr', dateIndex: 0, amountIndex: 1},
    'nasdaq.com': {trSelector: '#quotes_content_left_dividendhistoryGrid tbody tr', dateIndex: 0, amountIndex: 2},
    'proshares.com': {trSelector: 'table.distribution-table tbody tr', dateIndex: 0, amountIndex: 3},
  };
  
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
      const td = tdItems[dateIndex];
      const dateString = td ? td.innerText : 'Invalid';
      const date = new Date(dateString);
      // A naive and quick way to check if the row contains data and is not a header.
      // Check if the date is a valid date per https://stackoverflow.com/a/1353711
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
  
  const collectFromSite = () => {
    const host = location.host.replace('www.', '');
    const config = hostToConfig[host];
    if (config) {
      return collectDataFromTable(config.trSelector, config.dateIndex, config.amountIndex);
    } else {
      console.error(`No config for ${host}`);
    }
  };
  
  window.dividend = {
    groupByYear,
    collectDataFromTable,
    collectFromSite
  };
})(window);
