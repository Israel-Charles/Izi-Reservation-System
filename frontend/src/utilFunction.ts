export const minutesToTimeString = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${adjustedHours}:${formattedMinutes} ${period}`;
};

const timeStringToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
};

export const stringToTime = (timeString) => {
    const totalMinutes = timeStringToMinutes(timeString);
    return minutesToTimeString(totalMinutes);
}