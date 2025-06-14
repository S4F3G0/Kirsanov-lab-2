"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const ageBtn = document.getElementById("ageBtn");
    ageBtn.addEventListener("click", () => {
        const age = parseInt(document.getElementById("ageInput").value);
        const ageOutput = document.getElementById("ageOutput");
        if (isNaN(age)) {
            ageOutput.textContent = "Введите корректный возраст!";
            return;
        }
        let suffix = "лет";
        if (age % 10 === 1 && age % 100 !== 11) {
            suffix = "год";
        }
        else if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) {
            suffix = "года";
        }
        ageOutput.textContent = `Вам ${age} ${suffix}`;
    });
    function getDaysInMonth(month, year) {
        switch (month) {
            case 2:
                return isLeapYear(year) ? 29 : 28;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            default:
                return 0;
        }
    }
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
    const monthBtn = document.getElementById("monthBtn");
    monthBtn.addEventListener("click", () => {
        const month = parseInt(document.getElementById("monthInput").value);
        const year = new Date().getFullYear(); // текущий год
        const monthOutput = document.getElementById("monthOutput");
        const days = getDaysInMonth(month, year);
        monthOutput.textContent = days > 0
            ? `В ${month}-м месяце ${days} дней (${isLeapYear(year) ? "високосный" : "не високосный"} год)`
            : "Введите месяц от 1 до 12";
    });
    function shouldPlayBadminton(day, temp, weather, wind, humidity) {
        if (day !== "воскресенье")
            return false;
        if (temp === "холодно")
            return false;
        if (["дождь", "снег", "град"].includes(weather))
            return false;
        if (wind === "есть")
            return false;
        if (humidity === "высокая")
            return false;
        return true;
    }
    const playBtn = document.getElementById("playBtn");
    playBtn.addEventListener("click", () => {
        const day = document.getElementById("day").value;
        const temp = document.getElementById("temp").value;
        const weather = document.getElementById("weather").value;
        const wind = document.getElementById("wind").value;
        const humidity = document.getElementById("humidity").value;
        const play = shouldPlayBadminton(day, temp, weather, wind, humidity);
        const playOutput = document.getElementById("playOutput");
        playOutput.textContent = play ? "Да! Играем в бадминтон" : "Нет, лучше остаться дома";
    });
});
function calculateSqrt() {
    const input = document.getElementById("sqrtInput");
    const output = document.getElementById("sqrtResult");
    const n = parseFloat(input.value);
    if (n < 0 || isNaN(n)) {
        output.textContent = "Введите неотрицательное число.";
        return;
    }
    let guess = n / 2;
    while (Math.abs(guess * guess - n) > 1e-10) {
        guess = (guess + n / guess) / 2;
    }
    output.textContent = `Квадратный корень из ${n} ≈ ${guess.toFixed(10)}`;
}
function findPrimes() {
    const input = document.getElementById("primeInput");
    const output = document.getElementById("primeResult");
    const n = parseInt(input.value);
    if (isNaN(n) || n < 2) {
        output.textContent = "Введите целое число больше 1.";
        return;
    }
    const sieve = Array(n + 1).fill(true);
    sieve[0] = sieve[1] = false;
    for (let i = 2; i * i <= n; i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= n; j += i) {
                sieve[j] = false;
            }
        }
    }
    const primes = sieve.map((val, idx) => val ? idx : -1).filter(num => num !== -1);
    output.textContent = `Простые числа до ${n}: ${primes.join(", ")}`;
}
function drawPyramid() {
    const input = document.getElementById("pyramidHeight");
    const canvas = document.getElementById("pyramidCanvas");
    const ctx = canvas.getContext("2d");
    const height = parseInt(input.value);
    if (!ctx || isNaN(height) || height <= 0)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pointSize = 4;
    const spacing = 12;
    const margin = 10;
    for (let row = height - 1; row >= 0; row--) {
        const numPoints = row + 1;
        const y = canvas.height - margin - (height - 1 - row) * spacing;
        const totalWidth = (numPoints - 1) * spacing;
        const startX = (canvas.width - totalWidth) / 2;
        for (let col = 0; col < numPoints; col++) {
            const x = startX + col * spacing;
            ctx.beginPath();
            ctx.arc(x, y, pointSize / 2, 0, 2 * Math.PI);
            ctx.fillStyle = "black";
            ctx.fill();
        }
    }
}
function parseInput(id) {
    const raw = document.getElementById(id).value;
    return raw
        .split(',')
        .map(n => parseFloat(n.trim()))
        .filter(n => !isNaN(n));
}
function countMax() {
    const numbers = parseInput("inputMaxCount");
    if (numbers.length === 0) {
        setOutput("outputMaxCount", "Введите корректные числа");
        return;
    }
    const max = Math.max(...numbers);
    const count = numbers.filter(n => n === max).length;
    setOutput("outputMaxCount", `Максимум: ${max}, количество: ${count}`);
}
function findMedian() {
    const numbers = parseInput("inputMedian").sort((a, b) => a - b);
    if (numbers.length === 0) {
        setOutput("outputMedian", "Введите корректные числа");
        return;
    }
    const mid = Math.floor(numbers.length / 2);
    const median = numbers.length % 2 === 0
        ? (numbers[mid - 1] + numbers[mid]) / 2
        : numbers[mid];
    setOutput("outputMedian", `Медиана: ${median}`);
}
function mergeSort(arr) {
    if (arr.length <= 1)
        return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    const merged = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j])
            merged.push(left[i++]);
        else
            merged.push(right[j++]);
    }
    return merged.concat(left.slice(i)).concat(right.slice(j));
}
function sortMerge() {
    const numbers = parseInput("inputMergeSort");
    if (numbers.length === 0) {
        setOutput("outputMergeSort", "Введите корректные числа");
        return;
    }
    const sorted = mergeSort(numbers);
    setOutput("outputMergeSort", `Отсортировано: ${sorted.join(', ')}`);
}
function setOutput(id, text) {
    const el = document.getElementById(id);
    if (el)
        el.textContent = text;
}
window.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c;
    (_a = document.getElementById("btnMaxCount")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", countMax);
    (_b = document.getElementById("btnMedian")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", findMedian);
    (_c = document.getElementById("btnMergeSort")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", sortMerge);
});
