import moment from 'moment'

const getDate = (timestampStart) => {
  return moment.unix(timestampStart).locale('fr').format('L')
}

const getDateDisplay = (timestamp) => moment.unix(timestamp).locale('fr').format('dddd Do MMMM')

const getHourDisplay = (timestamp) => moment.unix(timestamp).locale('fr').format('HH')

const getNextHourDisplay = (timestamp) => moment.unix(timestamp).add(2, 'h').locale('fr').format('HH')

const getSchedulesDisplay = (timestampStart) => {
  return `${getHourDisplay(timestampStart)}H - ${getNextHourDisplay(timestampStart)}H`
}

const getSchedulesDisplayConcat = (timestampStart) => {
  const dateDisplay = moment.unix(timestampStart).locale('fr').format('Do/MM/YYYY')
  const schedules = `${getHourDisplay(timestampStart)}:${getNextHourDisplay(timestampStart)}`

  return `${dateDisplay} - ${schedules}`
}

const getDateWithDay = (timestampStart) => {
  return moment.unix(timestampStart).locale('fr').format('dddd - Do.MM.YYYY')
}

const extandedSchedules = (timestampStart, timestampEnd) => {
  const start = moment.unix(timestampStart).locale('fr').format('HH')
  const end = moment.unix(timestampEnd).locale('fr').format('HH')

  return `${start}h - ${end}h`
}

const getdates = (date, schedules) => {
  const dateHash = {
    janvier: '01',
    fevrier: '02',
    mars: '03',
    avril: '04',
    mai: '05',
    juin: '06',
    juillet: '07',
    août: '08',
    septembre: '09',
    octobre: '10',
    novembre: '11',
    decembre: '12'
  }

  let hoursTrim = schedules.trim()
  let hourStartAt = hoursTrim.replace(/^(\d{2})H - (\d{2})H$/g, '$1:00')
  let hourEndAt = hoursTrim.replace(/^(\d{2})H - (\d{2})H$/g, '$2:00')

  hourEndAt = hourStartAt === hourEndAt ? `${parseFloat(hourEndAt) + 2}:00` : hourEndAt

  let dayTrim = date.trim()
  let newValueDate = dayTrim.replace(/^[a-z]+ (\d{0,2}) ([a-zû]+)$/i, `$1-$2-2024`)
  let arrayValue = newValueDate.split('-')
  let newValueDay = `${arrayValue[0]}-${dateHash[arrayValue[1]]}-${arrayValue[2]}`

  let startDate = `${newValueDay} ${hourStartAt}`
  let endDate = `${newValueDay} ${hourEndAt}`

  startDate = moment(startDate, 'DD-MM-YYYY HH:mm').locale('fr').unix()
  endDate = moment(endDate, 'DD-MM-YYYY HH:mm').locale('fr').unix()

  return [startDate, endDate]
}

export default {
  getDate,
  getDateDisplay,
  getHourDisplay,
  getNextHourDisplay,
  getSchedulesDisplay,
  getdates,
  getSchedulesDisplayConcat,
  getDateWithDay,
  extandedSchedules
}
