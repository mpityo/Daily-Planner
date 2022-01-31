var plans = {};
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

var loadTasks = function () {  
    plans = JSON.parse(localStorage.getItem("plans"));

    if (!plans) {
        plans = [{
            id: 0,
            text: ""
        }];
    }

    plans.forEach(function() {
        $.each(plans, function (index) {
            $("#" + plans[index].id + " .text-area").text(plans[index].text);
        });
    });
}

var saveTasks = function (id, text) {  
    var modified = false;
    $.each(plans, function(index) {
        if(plans[index].id === id) {
            plans[index].text = text;
            modified = true;
            return;
        }
    });
    if (!modified) {
        if (plans[0].id != "") {
            plans.push({
                id: id,
                text: text
            });
        } else {
            plans[0].id = id;
            plans[0].text = text;
            console.log("this was called");
        }
    }

    localStorage.setItem("plans", JSON.stringify(plans));
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
	// get the timeblock that is trying to be saved
	var timeSlot = $(this)
	    .closest(".time-row")
	 	.attr("id");
	
    // if the timeblock has been edited, get text, if not return
    if ($("#" + timeSlot + " .text-area").attr("edited") === "true") {
        var text = $("#" + timeSlot + " .text-area")
            .val()
            .trim();
    } else {
        alert("There are no changes to save!");
        return;
    }
	
    // create new span to hold text and assign class to control color
	var textInput = $( "<span>" )
	 	.addClass("col-9 text-area " + auditTime(timeSlot))
        .attr("edited", false)
        .attr("id", timeSlot)
	 	.text(text);

	$("#" + timeSlot + " .text-area").replaceWith(textInput);
    saveTasks(timeSlot, text);
});

createTimeBlocks();
loadTasks();