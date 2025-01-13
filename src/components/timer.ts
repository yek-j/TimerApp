export const displayTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSec = seconds % 60;

    // 두자리 수로 
    const displayMin = String(minutes).padStart(2, '0');
    const displaySec = String(remainingSec).padStart(2, '0');

    return `${displayMin}:${displaySec}`;
}