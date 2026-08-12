export function getDeviceId() {
  let id = localStorage.getItem('ntf_device_id')
  if (!id) {
    id = 'device_' + Date.now().toString(36) + Math.random().toString(36).slice(2)
    localStorage.setItem('ntf_device_id', id)
  }
  return id
}

export function getDeviceName() {
  const ua = navigator.userAgent
  if (ua.includes('iPhone')) return 'iPhone'
  if (ua.includes('Android')) return 'Android'
  if (ua.includes('Windows')) return 'Windows PC'
  if (ua.includes('Mac')) return 'Mac'
  return 'Unknown Device'
}