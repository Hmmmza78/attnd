function monthRange(month, year) {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    const startRange = firstDayOfMonth.getTime();
    const endRange = lastDayOfMonth.getTime() + 86399999; // add milliseconds of last day to cover whole day

    return [startRange, endRange];
}


module.exports = {
     monthRange
}
