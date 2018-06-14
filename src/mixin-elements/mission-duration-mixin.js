import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/**
 * My Mixin
 * @polymer
 * @mixinFunction
 * @polymerMixin
 */
let DurationMixin = function(superClass) {
  return class extends superClass {
    calcMissionDate(mission) {
      if(!mission) return;
      const dayToMiliseconds = 86400000;
      const hourToMiliseconds = 360000;
      const currentDate = new Date();
      const year = parseInt(mission.endDate.split('-')[0]);
      // months are from 0 to 11
      const month = parseInt(mission.endDate.split('-')[1]) - 1;
      const day = parseInt(mission.endDate.split('-')[2]);
      const missionDate = new Date(year, month, day);
      // all missions will end at 23:59:59.
      missionDate.setHours(23);
      missionDate.setMinutes(59);
      missionDate.setMilliseconds(59);
      const differenceInMiliseconds = missionDate.getTime() - currentDate.getTime();
      const differenceInDays = Math.round(differenceInMiliseconds*100 / dayToMiliseconds)/100;
      return this.humanizeDate(differenceInDays);
    }

    humanizeDate(remainingTime){
      if (Math.round(remainingTime) === 1)
        return 'Encerra amanhã'
      if (remainingTime > 1)
        return `${Math.round(remainingTime)} dias restantes`;
      if (remainingTime < 0)
        return `Encerrada`;
      if (remainingTime < 1)
        return `Encerra em ${Math.round(remainingTime*24)} horas`;
    }
  }
}

export const MissionDurationMixin = dedupingMixin(DurationMixin);
