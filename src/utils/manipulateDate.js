import moment from 'moment'

const getDateDisplay = (timestamp) => moment.unix(timestamp).locale('fr').format('dddd Do MMMM')

const getHourDisplay = (timestamp) => moment.unix(timestamp).locale('fr').format('HH')

const getNextHourDisplay = (timestamp) => moment.unix(timestamp).add(2, 'h').locale('fr').format('HH')

const getSchedulesDisplay = (timestampStart) => {
  return `${getHourDisplay(timestampStart)}H - ${getNextHourDisplay(timestampStart)}H`
}

export default {
  getDateDisplay,
  getHourDisplay,
  getNextHourDisplay,
  getSchedulesDisplay
}
