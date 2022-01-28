$( "#currentDay" ).text(dayjs().format('dddd, MMMM DD'));

// create each time block for 9-5
var createTimeBlocks = function () {
    for (var i = 9; i < 18; i++) {
        if (i < 12) {
            var timeNumber = i;
            var timeSlot = timeNumber + "AM";
        } else {
            var timeNumber = i-12;
            if (i === 12)
                timeNumber = 12;
            var timeSlot = timeNumber + "PM";
        }

        var timeBlockContainer = $("<div>")
            .addClass("time-row row")
            .attr("id", i);

        var timeEl = $("<p>")
            .addClass("hour text-right col-2")
            .text(timeSlot);   

        var taskFieldEl = $("<span>")
            .addClass("col-9 future")
            .attr("id", i);

        var saveBtn = $("<button>")
            .addClass("saveBtn col-1 fa-regular fa-floppy-disk");

        timeBlockContainer.append(timeEl, taskFieldEl, saveBtn);
        $(".container").append(timeBlockContainer);
        auditTime($( taskFieldEl ));
    }
}

var auditTime = function (timeSlot) {  
    var currentHour = dayjs().hour();
    var timeSlotHour = $(timeSlot).attr("id");

    if (currentHour == timeSlotHour) {
        $(timeSlot).removeClass("future");
        $(timeSlot).addClass("present");
    } else if (currentHour > timeSlotHour) {
        $(timeSlot).removeClass("present future");
        $(timeSlot).addClass("past");
    }
}

createTimeBlocks();