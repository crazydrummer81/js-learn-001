"use strict";

const names = ['qwer', 'asdfg', 'zxcv', 'cvbncvbn', 'qwerqwerqwer'];
console.log(names);



let newArr = names.filter((name) => {
	return name.length < 5;
});
console.log(newArr);

newArr = names.map(name => name[0]);
console.log(newArr);

const some = ['asdasd', 34, 'zxczxc', 'dgdgf'];

console.log(some.some(item => typeof(item) === 'number'));

console.log(some.every(item => typeof(item) === 'number'));

console.log(names.every(item => typeof(item) === 'string'));

// reduce 
const numbers = [2,3,4,7,2,5,7,3,32,346];

newArr = numbers.reduce((sum, current) => sum + current);
console.log(newArr);

newArr = names.reduce((res, current) => `${res}, ${current}`, 'Vaysa');
console.log(newArr);

const obj = {
	vasya: 'person',
	katya: 'person',
	dog: 'animal',
	cat: 'animal'
};

newArr = Object.entries(obj);
console.log(newArr);

newArr = Object.entries(obj)
	.filter(item => item[1] === 'person')
	.map(item => item[0]);
console.log(newArr);

const tmpl = `
 
БҰЙРЫҚ										ПРИКАЗ




О расторжении трудового договора

Руководствуясь пунктом 1 статьи 49 Трудового кодекса Республики Казахстан от 23 ноября 2015 года №414-V (с изменениями и дополнениями по состоянию на 07.07.2020 года) и на основании доверенности                             №19, выданной Вице-президентом по вопросам международного сотрудничества, временно исполняющего обязанности Генерального секретаря Крюковым А.А. от 19 мая 2020 года, ПРИКАЗЫВАЮ:

1. Прекратить трудовой договор №320/20-НСК от 06.01.2020 года с «CREATER_FIO_RP», «CREATER_POSITION» (должность) с «TERMINATION_DATE» по соглашению сторон.

2. Главному бухгалтеру службы бухгалтерского учета департамента финансового обеспечения Тулековой Б.К. произвести компенсационную выплату «CREATER_FIO_DP» за неиспользованные дни оплачиваемого ежегодного трудового отпуска в количестве «VACATION_DAYS» («VACATION_DAYS_WORDS») календарных дней за период работы с «WORK_PERIOD_BEGIN» года по «WORK_PERIOD_END» года.
Основание: дополнительное соглашение №«SUP_AGREEMENT_NUMBER» от «SUP_AGREEMENT_DATE» года 
                                                    к Трудовому договору №«EMP_CONTRACT_ID» от «EMP_CONTRACT_DATE» года и 
                                                         личное заявление «CREATER_FIO_RP» от «EPM_LETTER_DATE» г. 


                                
Генеральный директор			                                     Н. Ногербек





 

`;

const fields = tmpl.match(/«(.*?)»/g);
console.log(fields);
fields.forEach(field => {
	document.write(`<br>${field.replace('»', '').replace('«', '')}`);
});

 