export function ConvertToTimeString(totalSeconds: number) {
    let hours   = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    let seconds = totalSeconds - (hours * 3600) - (minutes * 60);
    let hh = (hours < 10) ? '0'+hours : hours.toString();
    let mm = (minutes < 10) ? '0'+minutes : minutes.toString();
    let ss = (seconds < 10) ? '0'+seconds : seconds.toString();
    return hh + ':' + mm + ':' + ss;
}
