function openDatePicker() {
    var datepicker = document.getElementById("datepicker");
    datepicker.style.display = "block";

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();

    var calendar = document.getElementById("calendar");
    var calendarHtml = buildCalendar(year, month);
    calendar.innerHTML = calendarHtml;
}

function buildCalendar(year, month) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var monthDays = [31, 28 + isLeapYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var firstDay = new Date(year, month, 1);
    var startingDay = firstDay.getDay();
    if (startingDay == 0) {
        startingDay = 7;
    }

    var monthLength = monthDays[month];
    if (month == 1) { // February
        monthLength = isLeapYear(year) ? 29 : 28;
    }

    var monthHtml = "<table><tr><th colspan='7'>" + monthNames[month] + " " + year + "</th></tr>";
    monthHtml += "<tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>";

    var day = 1;
    // fill in the days
    for (var i = 1; i <= 42; i++) {
        if (i < startingDay || i > startingDay + monthLength) {
            monthHtml += "<td>&nbsp;</td>";
        } else {
            var date = year + "-" + padNumber(month + 1) + "-" + padNumber(day);
            monthHtml += "<td><button onclick='selectDate(\"" + date + "\")'>" + day + "</button></td>";
            day++;
        }

        if (i % 7 == 0 && day <= monthLength) {
            monthHtml += "</tr><tr>";
        }
    }

    monthHtml += "</tr></table>";
    return monthHtml;
}

function isLeapYear(year) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

function padNumber(number) {
    return ("0" + number).slice(-2);
}

function selectDate(date) {
    console.log("Selected date:", date);
    var datepicker = document.getElementById("datepicker");
    datepicker.style.display = "none";
}
