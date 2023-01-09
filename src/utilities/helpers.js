export function shuffle(arr) {
    return arr.sort(() => 0.5 - Math.random());
}

export function decoder(str) {
    return new DOMParser().parseFromString(str, "text/html").documentElement.textContent
}