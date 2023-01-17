import seat from '../json/seat.js';

const done 		 = seat.done;
const impossible = seat.impossible;

$( document ).ready(function() {

	for ( let i = 1; i <= 30; i ++ ) {
		for ( let j = 1; j <= 20; j ++ ) {

			if ( done?.[i]?.includes(j) ) {
				$( '.seats' ).append( '<li class="done"><div class="tooltip">예약완료~</div></li>' );
			} else if ( impossible?.[i]?.includes(j) ) {
				$( '.seats' ).append( '<li class="impossible"></li>' );
			} else {
				$( '.seats' ).append( '<li class="possible"><div class="tooltip">' + i + '번째 줄' + j + '열 예약가능' + '</div></li>' );
			}

		}
	}

	$( '.done, .possible' ).hover(function() {
		$( this ).children( '.tooltip' ).toggle();
	});

});
