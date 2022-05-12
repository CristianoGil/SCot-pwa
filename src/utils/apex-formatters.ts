import dayjs from 'dayjs'
import html2canvas from 'html2canvas';
import moment from 'moment'
import 'moment/locale/pt-br';
moment.locale('pt-br');

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
export function blobToBase64(blob: Blob): Promise<ArrayBuffer | string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export function base64ToArrayBuffer(base64: string) {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export function createCanvas (element: HTMLElement | null, opt?: any ): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    if (element) {
      html2canvas(element, opt).then(async (canvas) => {
        resolve(canvas)
      }).catch((err: any) => {
        console.log('html2canvas: ', err);
        reject(err)
      })
    } else {
      reject('element not found')
    }

  })

}
