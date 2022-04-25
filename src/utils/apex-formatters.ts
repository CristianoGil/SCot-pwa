import dayjs from 'dayjs'
import moment from 'moment'

export function toString(val: number): string {
  return `${val}`
}
export function perSession(val: number): string {
  return `${val} per session`
}
export function asMinutes(val: number): string {
  return `${val} (mins)`
}
export function asDollar(val: number): string {
  return `$ ${val}`
}
export function asKDollar(val: number): string {
  return `$ ${val}K`
}
export function asPercent(val: number): string {
  return `${val} %`
}

type WithOptions = (val: number, timestamp: number) => string
type WithTimeOptions = (val: number, timestamp: number) => string

export function toDate(format: string): WithTimeOptions {
  return (val, timestamp) => dayjs(timestamp).format(format)
}

export function toFixed(fractionDigit: number, divider = 1): WithOptions {
  return (val) => (val / divider).toFixed(fractionDigit)
}

export function dateFormat(timestamp: string, format: string): string {
  return moment(timestamp).format(format)
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
