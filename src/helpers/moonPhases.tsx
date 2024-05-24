import newMoon from '../assets/moonPhase/newMoon.png'
import waxing_crescente from '../assets/moonPhase/waning_crescent.png'
import first_quarter from '../assets/moonPhase/first_quarter.png'
import waxing_gibbous from '../assets/moonPhase/waxing_gibbous.png'
import full from '../assets/moonPhase/full.png'
import waning_gibbous from '../assets/moonPhase/waning_gibbous.png'
import last_quarter from '../assets/moonPhase/last_quarter.png'
import waning_crescent from '../assets/moonPhase/waning_crescent.png'

const moonPhases = {
    new: { text: 'Lua Nova', icon: newMoon },
    waxing_crescent: { text: 'Lua Crescente', icon: waxing_crescente },
    first_quarter: { text: 'Quarto Crescente', icon: first_quarter },
    waxing_gibbous: { text: 'Gibosa Crescente', icon: waxing_gibbous },
    full: { text: 'Lua Cheia', icon: full },
    waning_gibbous: { text: 'Gibosa minguante', icon: waning_gibbous },
    last_quarter: { text: 'Quarto minguante', icon: last_quarter },
    waning_crescent: { text: 'Lua Minguante', icon: waning_crescent },
};

export function getMoonPhaseInfo(moonPhase) {
    const phaseInfo = moonPhases[moonPhase];
    if (phaseInfo) {
        return phaseInfo;
    } else {
        return { text: moonPhase, icon: null };
    }
}
