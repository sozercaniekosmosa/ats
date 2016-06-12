/**
 * Created by Магистр on 09.06.2016.
 */

var CTRL_HEIGHT = '';

var structure = { // шаблон структура
	'phone':  {
		title:        'номер телефона',
		pattern:      '^\\+7-3452-[0-9]{2}-[[0-9]{2}-[0-9]{2}$',
		placeholder:  'номер т/ф +7-3452-XX-XX-XX',
		type:         'tel',
		scriptCreate: '"+7-3452-" + getRandInt() + getRandInt() + "-" + getRandInt() + getRandInt() + "-" + getRandInt() + getRandInt()'
	},
	'name':   {
		title:        'Ф.И.О. абонента',
		pattern:      '^[а-яА-Я]{2,20}\\\s[а-яА-Я]{2,20}\\\s[а-яА-Я]{2,20}$',
		placeholder:  'Ф.И.О. абонента',
		type:         'text',
		scriptCreate: 'getName()'
	},
//	'year':   {
//		title:        'год рождения',
//		pattern:      '',
//		placeholder:  'год рождения',
//		type:         'date',
//		scriptCreate: '"19" + getRandInt() + getRandInt() + "-" + "0" + getRandInt() + "-" + "0" + getRandInt()'
//	},
	'time':   {
		title:        'минут',
		pattern:      '',
		placeholder:  'общее время разговора в минутах',
		type:         'number',
		min:         'number',
		scriptCreate: 'getRandInt() + getRandInt() + ""'
	},
	'rate':   {
		title:        'руб/мин',
		pattern:      '',
		placeholder:  'стоимость одной минуты',
		type:         'number',
		scriptCreate: 'getRandInt() + getRandInt() + ""'
	},
	'add':    {
		pattern:      '',
		placeholder:  '',
		type:         'button',
		value:        'добавить данные',
		onclick:      'addUser($(this).parent().serializeArray())',
		scriptCreate: ''
	},
	'create': {
		pattern:      '',
		placeholder:  '',
		type:         'button',
		value:        'сгенерировать данные',
		onclick:      'createUser()',
		scriptCreate: ''
	}
}

var list = []; // список абонетов АТС

//------------------------------- MVC ------------------------------
// структура проекта

//------------------------------- Model ----------------------------
// начальная инициализация приложения
$(document).ready(function () {
	createGUI();
	showAllList();
});


//------------------------------- View -------------------------------
// вывести список всех абонентов
function showAllList() {
	$('.data-line').remove();
	var len = list.length;

	for (var i = 0; i < len; i++) {
		$frm = $('#table-list');
		$inp = $('<tr>').addClass('data-line');
		$frm.append($inp);
		for (var it in structure) {
			if (structure[it].placeholder != '')
				if (structure.hasOwnProperty(it)) {
					$inp.append(
						$('<td>').text(list[i][it])
					)

				}
		}
		$inp.append(
			$('<td>').append(
				$('<div>').text('?').addClass('ico-info').attr('onclick', 'getDebt("' + i + '")')
			)
		);
	}

}

// создание графического интерфейса
function createGUI() {
	var $frm = $('.table-head');
	for (var it in structure) {
		if (structure.hasOwnProperty(it))
			if (structure[it].title) {
				var $td = $('<td>').text(structure[it].title);
				$frm.append($td);
			}
	}
	var $td = $('<td>').text('инфо');
	$frm.append($td);

	var $frm = $('#frm-ctrl');
	for (var it in structure) {
		if (structure.hasOwnProperty(it)) {
			var $inp = $('<input>').attr('name', it);
			for (var eit in structure[it])
				$inp.attr(eit, structure[it][eit]);
			var $br = $('<br>');

			$frm.append($inp);
			$frm.append($br);

		}
	}

	CTRL_HEIGHT = ($frm.height()+18)*-1+'px';

	$('.block-ctrl')[0].style.top = CTRL_HEIGHT;
}


//------------------------------- Controller -------------------------
// добавить абонента в список
function addUser(data) {

	var it_list = {};

	for (var i = 0; i < data.length; i++) {
		var it = data[i];
		if (structure[it.name]) {
			// проверка на валидность вводимых данных
			if ((structure[it.name].pattern != '') && (it.value.match(structure[it.name].pattern) == null)) {
				alert('некорректное значение поля: ' + structure[it.name].placeholder);
				return;
			}

			it_list[it.name] = it.value;
		}
	}

	list.push(it_list);

	showAllList();
}

// получить номер телефона и общее время разговора по Ф.И.О.
function getNumberPhoneTime() {
	var name = prompt('Ф.И.О. абонента', '');

	if (!name) return;

	if (name.match(structure.name.pattern) == null) {
		alert('некорректное значение поля Ф.И.О.');
		return;
	}

	for (var i = 0; i < list.length; i++) {
		for (var it in structure) {
			if (structure.hasOwnProperty(it)) {
				if (list[i].name == name) {
					alert(
							'Абонент: ' + list[i].name + '\n' +
							'Номер телефона: ' + list[i].phone + '\n' +
							'Общее время разговора: ' + list[i].time + ' минут');
					return;
				}
			}
		}
	}

	alert('такого абонента не существует!');
}

// получить задолжность абонента по Ф.И.О.
function getDebtEx() {
	var name = prompt('Ф.И.О. абонента', '');

	if (!name) return;

	if (name.match(structure.name.pattern) == null) {
		alert('некорректное значение поля Ф.И.О.');
		return;
	}

	for (var i = 0; i < list.length; i++) {
		for (var it in structure) {
			if (structure.hasOwnProperty(it)) {
				if (list[i].name == name) {
					getDebt(i);
					return;
				}
			}
		}
	}

	alert('такого абонента не существует!');
}

// получить задолжность абонента по индексу
function getDebt(inx) {
	alert(
			'Абонент: ' + list[inx].name + '\n' +
			'К оплате: ' + list[inx].time * list[inx].rate + ' руб'
	);
}