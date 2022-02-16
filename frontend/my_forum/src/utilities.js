import dayjs from 'dayjs'

export function getMonth(month) {
    month = Math.floor(month);
    const year = dayjs().year();
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
    let currentMountCount = 0 - firstDayOfMonth;

    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMountCount++;
            return dayjs(new Date(year, month, currentMountCount))
        })
    })

    return daysMatrix;
}