function setDays() {

    var daysInMonthSelected;
    var daysInCombo;
    var dayElement;

    daysInMonthSelected = getDaysInMonth(document.mainform.month.value, document.mainform.year.value);
    daysInCombo = document.mainform.days.length;

    if (daysInCombo > daysInMonthSelected) {
        for (dayElement=daysInCombo; dayElement >= daysInMonthSelected; dayElement--) {
            document.mainform.month.days.options[dayElement] = null;
        }
    }

    if (daysInMonthSelected > daysInCombo) {
        for (dayElement=daysInCombo; dayElement < daysInMonthSelected; dayElement++) {
            document.mainform.month.days.options[dayElement] = new Option(dayElement+1, dayElement+1);
        }
    }

    if (document.mainform.month.days.selectedIndex < 0) document.mainform.month.days.selectedIndex = 1;
}

function getDaysInMonth(inMonth, inYear) {

    var numDays = 0;
    var tmpMonth = inMonth.toString();
    var tmpYear = inYear.valueOf();

    switch (tmpMonth) {
        case "1":       // Jan
        case "3":       // Mar
        case "5":       // May
        case "7":       // Jul
        case "8":       // Aug
        case "10":      // Oct
        case "12":      // Dec
            numDays = 31;
            break;
        case "2":       // Feb, also deal with leap years
                if ((tmpYear%4 == 0 && tmpYear%100 !=0) || (tmpYear%400 == 0)) {
                        numDays = 29;
                } else {
                        numDays = 28;
                }
            break;
        case "4":       // Apr
        case "6":       // Jun
        case "9":       // Sep
        case "11":      // Nov
            numDays = 30;
            break;
    }

    return(numDays);

}
