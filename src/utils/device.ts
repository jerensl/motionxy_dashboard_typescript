export function createNewDevice(deviceName: string) {
    return window.fetch('https://cec.azurewebsites.net/api/device/new', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            deviceName,
        }),
    })
}
