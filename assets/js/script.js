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
            .addClass("text-area col-9 " + auditTime(i))
            .attr("id", i);

        var saveBtn = $("<button>")
            .addClass("saveBtn col-1 fa-regular fa-floppy-disk");

        timeBlockContainer.append(timeEl, taskFieldEl, saveBtn);
        $(".container").append(timeBlockContainer);
    }
}

var auditTime = function (timeSlot) {  
    var currentHour = dayjs().hour();

    if (currentHour == timeSlot) {
        return "present";
    } else if (currentHour > timeSlot) {
        return "past";
    } else if (currentHour < timeSlot) {
        return "future";
    }
}

/* When user clicks the task container, specifically the span */
/* Creates a text box to type into */
$(".container").on("click", "span", function () {  
    var text = $(this)
        .text()
        .trim();
    var textInput = $( "<textarea>" )
        .addClass("col-9 text-area " + auditTime($(this).attr("id")))
        .attr("edited", true)
        .attr("id", $(this).attr("id"))
        .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

/* Save button was pressed */
$(".container").on("click", "button", function () {
	// get the text from textarea in same group
	var timeSlot = $(this)
	    .closest(".time-row")
	 	.attr("id");
	
    if ($("#" + timeSlot + " .text-area").attr("edited")) {
        var text = $("#" + timeSlot + " .text-area")
            .val()
            .trim();
    } else {
        return;
    }	
	
	var textInput = $( "<span>" )
	 	.addClass("col-9 text-area " + auditTime(timeSlot))
        .attr("edited", false)
        .attr("id", timeSlot)
	 	.text(text);

    console.log(textInput);
	
	$("#" + timeSlot + " .text-area").replaceWith(textInput);
});

createTimeBlocks();