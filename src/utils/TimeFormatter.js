const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto',
});

function formatTime(time) {
    let unit = '';
    let num = 0;
    const current = new Date();
    const diff = current - time;
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = seconds / 60 / 24;

    if (seconds < 60) {
        unit = 'seconds';
        num = seconds;
    } else if (seconds < 3600) {
        unit = 'minutes';
        num = minutes;
    } else if (seconds < 3600 * 24) {
        unit = 'hours';
        num = hours;
    }

    return formatter.format(Math.round(-num), unit);
}

export { formatTime };
