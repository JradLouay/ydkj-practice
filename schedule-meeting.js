const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime, durationMinutes) {
    // ..TODO..
    // check dayStart against startTime
    if (startTime.padStart(5, '0') >= dayStart.padStart(5, '0')) {

        const [startTimeHours, startTimeMinutes] = startTime.split(':')
        let durationHours = Math.floor(durationMinutes / 60)
        let durationInMinutes = durationMinutes - durationHours * 60
        let finishTimeHours = Number(startTimeHours) + durationHours
        let finishTimeMinutes = Number(startTimeMinutes) + durationInMinutes
        if (finishTimeMinutes >= 60) {
            finishTimeHours += 1;
            finishTimeMinutes -= 60;
        }
        const meetingFinish = `${finishTimeHours.toString().padStart(2, '0')}:${finishTimeMinutes.toString().padStart(2, '0')}`
        if (meetingFinish <= dayEnd) {
            return true
        }
    }

    return false

}

function scheduleMeetingV2(startTime, durationMinutes) {
    var [, meetingStartHour, meetingStartMinutes] =
        startTime.match(/^(\d{1,2}):(\d{2})$/) || [];

    durationMinutes = Number(durationMinutes);

    if (
        typeof meetingStartHour == "string" &&
        typeof meetingStartMinutes == "string"
    ) {
        let durationHours =
            Math.floor(durationMinutes / 60);
        durationMinutes =
            durationMinutes - (durationHours * 60);
        let meetingEndHour =
            Number(meetingStartHour) + durationHours;
        let meetingEndMinutes =
            Number(meetingStartMinutes) +
            durationMinutes;

        if (meetingEndMinutes >= 60) {
            meetingEndHour = meetingEndHour + 1;
            meetingEndMinutes =
                meetingEndMinutes - 60;
        }

        // re-compose fully-qualified time strings
        // (to make comparison easier)
        let meetingStart = `${meetingStartHour.padStart(2, "0")
            }:${meetingStartMinutes.padStart(2, "0")
            }`;
        let meetingEnd = `${String(meetingEndHour).padStart(2, "0")
            }:${String(meetingEndMinutes).padStart(2, "0")
            }`;

        // NOTE: since expressions are all strings,
        // comparisons here are alphabetic, but it's
        // safe here since they're fully qualified
        // time strings (ie, "07:15" < "07:30")
        return (
            meetingStart >= dayStart &&
            meetingEnd <= dayEnd
        );
    }

    return false;
}

console.log(scheduleMeeting("7:00", 15));     // false
console.log(scheduleMeeting("07:15", 30));    // false
console.log(scheduleMeeting("7:30", 30));     // true
console.log(scheduleMeeting("11:30", 60));    // true
console.log(scheduleMeeting("17:00", 45));    // true
console.log(scheduleMeeting("17:30", 30));    // false
console.log(scheduleMeeting("18:00", 15));    // false
