import dayjs from 'dayjs'
export function formatTime(timestamp, format = 'YYYY-MM-DD') {
  return dayjs(timestamp).format(format)
}
