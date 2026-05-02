function calculate() {
    // Получаем значения из полей ввода
    const main1 = parseFloat(document.getElementById('main1').value) || 0;
    const du20_1 = parseFloat(document.getElementById('du20_1').value) || 0;
    const du80_1 = parseFloat(document.getElementById('du80_1').value) || 0;
    const main2 = parseFloat(document.getElementById('main2').value) || 0;
    const du20_2 = parseFloat(document.getElementById('du20_2').value) || 0;
    const du80_2 = parseFloat(document.getElementById('du80_2').value) || 0;
    const main3 = parseFloat(document.getElementById('main3').value) || 0;

    // Проверка на заполнение всех обязательных полей
    if (main1 === 0 || main2 === 0 || main3 === 0 ||
        du20_1 === 0 || du20_2 === 0 ||
        du80_1 === 0 || du80_2 === 0) {
        alert('Пожалуйста, заполните все поля !');
        return;
    }

    // Шаг 1: Расход основного счётчика между 1‑м и 2‑м месяцем
    const deltaMain1to2 = main2 - main1;

    // Если расход основного счётчика нулевой, расчёт невозможен
    if (deltaMain1to2 === 0) {
        alert('Ошибка: расход основного счётчика между 1‑м и 2‑м месяцем равен нулю. Расчёт невозможен.');
        return;
    }

    // Шаг 2: Расход Ду‑20 и Ду‑80 между 1‑м и 2‑м месяцем
    const deltaDu20_1to2 = du20_2 - du20_1;
    const deltaDu80_1to2 = du80_2 - du80_1;

    // Шаг 3: Коэффициенты доли расхода
    const coefDu20 = deltaDu20_1to2 / deltaMain1to2;
    const coefDu80 = deltaDu80_1to2 / deltaMain1to2;

    // Шаг 4: Расход основного счётчика между 2‑м и 3‑м месяцем
    const deltaMain2to3 = main3 - main2;

    // Шаг 5: Ожидаемый расход Ду‑20 и Ду‑80 между 2‑м и 3‑м месяцем
    const expectedDu20Growth = deltaMain2to3 * coefDu20;
    const expectedDu80Growth = deltaMain2to3 * coefDu80;

    // Шаг 6: Ожидаемые показания на 3‑й месяц
    const predictedDu20 = du20_2 + expectedDu20Growth;
    const predictedDu80 = du80_2 + expectedDu80Growth;

    // Шаг 7: Финальная корректировка для Ду‑20 и Ду-80
    const finalDu80 = predictedDu80 - 100;
    const finalDu20 = predictedDu20 + 5;


    // Выводим результаты
    document.getElementById('result_du20').textContent = Math.round(finalDu20);
    document.getElementById('result_du80').textContent = Math.round(finalDu80);
}

function nextMonth() {
    // Очистка полей для нового месяца
    document.getElementById('main1').value = document.getElementById('main2').value;
    document.getElementById('du20_1').value = document.getElementById('du20_2').value;
    document.getElementById('du80_1').value = document.getElementById('du80_2').value;

    document.getElementById('main2').value = document.getElementById('main3').value;
    document.getElementById('du20_2').value = '';
    document.getElementById('du80_2').value = '';
    document.getElementById('main3').value = '';

    // Очищаем результаты
    document.getElementById('result_du20').textContent = '';
    document.getElementById('result_du80').textContent = '';


    alert('Данные перенесены для расчёта следующего периода!');
}



 // Эффект сжимания кнопки при клике
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('mousedown', () => button.classList.add('pressed'));
  button.addEventListener('mouseup', () => button.classList.remove('pressed'));
  button.addEventListener('mouseleave', () => button.classList.remove('pressed'));
});

function clearFields() {
    // Список ID всех полей ввода
    const inputIds = [
        'main1', 'du20_1', 'du80_1',
        'main2', 'du20_2', 'du80_2',
        'main3'
    ];

    // Очищаем каждое поле ввода
    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.value = '';
        }
    });

    // Также очищаем результаты расчёта (без прочерков)
    document.getElementById('result_du20').textContent = '';
    document.getElementById('result_du80').textContent = '';
}

function nextMonth() {
    const main3Value = document.getElementById('main3').value;
    const main1Value = document.getElementById('main1').value;
    const du20_1Value = document.getElementById('du20_1').value;
    const du80_1Value = document.getElementById('du80_1').value;
    const main2Value = document.getElementById('main2').value;
    const du20_2Value = document.getElementById('du20_2').value;
    const du80_2Value = document.getElementById('du80_2').value;

    // Расширенная проверка: все обязательные поля должны быть заполнены
    if (!main1Value || !main2Value || !main3Value ||
        !du20_1Value || !du20_2Value ||
        !du80_1Value || !du80_2Value) {
        alert('Пожалуйста, заполните все поля !');
        return;
    }

    // Получаем текущие значения из полей
    const main1 = parseFloat(main1Value) || 0;
    const main2 = parseFloat(main2Value) || 0;
    const main3 = parseFloat(main3Value) || 0;
    const du20_1 = parseFloat(du20_1Value) || 0;
    const du80_1 = parseFloat(du80_1Value) || 0;
    const du20_2 = parseFloat(du20_2Value) || 0;
    const du80_2 = parseFloat(du80_2Value) || 0;

    // Получаем результаты расчёта
    const resultDu20 = parseFloat(document.getElementById('result_du20').textContent) || 0;
    const resultDu80 = parseFloat(document.getElementById('result_du80').textContent) || 0;

    // Переносим данные основного счётчика:
    // 1. Со 2‑го месяца в 1‑й месяц
    document.getElementById('main1').value = main2;
    // 2. С 3‑го месяца во 2‑й месяц
    document.getElementById('main2').value = main3;

    // Переносим данные дополнительных счётчиков:
    // 1. Со 2‑го месяца в 1‑й месяц
    document.getElementById('du20_1').value = du20_2;
    document.getElementById('du80_1').value = du80_2;

    // 2. Из результатов расчёта во 2‑й месяц (БЕЗ каких‑либо изменений — переносим «как есть»)
    document.getElementById('du20_2').value = resultDu20;
    document.getElementById('du80_2').value = resultDu80;

    // Очищаем поле основного счётчика для 3‑го месяца
    document.getElementById('main3').value = '';

    //Очищаем результаты расчёта (без прочерков, просто пустые строки)
    document.getElementById('result_du20').textContent = '';
    document.getElementById('result_du80').textContent = '';
}
