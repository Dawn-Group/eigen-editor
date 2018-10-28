import request from "./request";

export default function imageCropBackend(cropImageUrl, param) {
    return request(cropImageUrl, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(param)
    })
}