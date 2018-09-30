export function convertToTimeString(totalSeconds: number) {
    let t = convertToTimeSpan(totalSeconds);
    let hh = (t.hours < 10) ? '0' + t.hours : t.hours.toString();
    let mm = (t.minutes < 10) ? '0' + t.minutes : t.minutes.toString();
    let ss = (t.seconds < 10) ? '0' + t.seconds : t.seconds.toString();
    return hh + ':' + mm + ':' + ss;
}

export function convertToNiceTimeString(totalSeconds: number) {
    let t = convertToTimeSpan(totalSeconds);
    let str = t.seconds + " sec";
    if (t.minutes > 0) str = t.minutes + " min " + str;
    if (t.hours > 0) str = t.hours + " h " + str;
    return str;
}

function convertToTimeSpan(totalSeconds: number) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    let seconds = totalSeconds - (hours * 3600) - (minutes * 60);
    return { hours, minutes, seconds };
}
