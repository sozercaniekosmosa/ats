/**
 * Created by Магистр on 12.06.2016.
 */

function getRandInt() { // получить целое [0..9]
	var val = Math.random() * 10;
	val = Math.round(val);
	if (val >= 10) val--;
	return val;
}

function getName() { // получить сгенерированное Ф.И.О.
	var bitName = ['ав', 'аб', 'аг', 'оп', 'ок', 'ун', 'ул', 'ев', 'ег', 'ел', 'ев'];
	var sex = (getRandInt() % 2 == 0);

	var name = '';
	for (i = 0; i < 2; i++) {
		name += bitName[getRandInt()];
	}
	name += sex ? 'ова ' : 'ов ';

	for (i = 0; i < 2; i++) {
		name += bitName[getRandInt()];
	}
	name += ' ';

	for (i = 0; i < 2; i++) {
		name += bitName[getRandInt()];
	}
	name += sex ? 'овна' : 'ович';

	return name;
}

function createUser() { // сгенерировать абонента
	var data = [];
	for (var it in structure) {
		if(structure[it].scriptCreate != '')
			data.push({'name': it, 'value': eval(structure[it].scriptCreate)});
	}
	addUser(data);
}

function slideCtrl(ctrl) { // скрыть/показать блок управления на экране
	var $ctrl = $(ctrl);
	if ($ctrl.hasClass('up-hide')) {
		$ctrl.removeClass('up-hide');
		$ctrl.animate({
			top: "-7px"
		}, 400);
	} else {
		$ctrl.addClass('up-hide');
		$ctrl.animate({
			top: CTRL_HEIGHT
		}, 100);
	}
}