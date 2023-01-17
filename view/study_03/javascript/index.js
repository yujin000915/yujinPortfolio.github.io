$( document ).ready(function () {
	let count = 0;

	$( '.bt_apply' ).on('click', function() {
		count += 1;

		$.ajax({
			url: '//kwangsin84.cafe24.com/exam/prize.php',
			dataType: 'JSON',
			type: 'GET',
			error: function( status, error ) {
				console.log( status, error );
			},
			beforeSend: function() {
				$( '.bt_apply' ).addClass( 'disabled' );
				$( '.bt_apply' ).text( '조회중입니다' );
			},
			success: function( result ) {
				let winNum = result.number;
				let winTime = result.time;

				// // Unix Timestamp
				let date = new Date( parseInt(winTime) );
				let year = date.getFullYear();
				let month = date.getMonth();
				let day = date.getDate();
				let hours = date.getHours();
				let minutes = '0' + date.getMinutes();
				let seconds = '0' + date.getSeconds();
				let formattedTime = year + '년' + month + '월' + day + '일 ' + hours + '시' + minutes.substr(-2) + '분' + seconds.substr(-2) + '초';

				$( '.bt_apply' ).removeClass( 'disabled' );
				$( '.bt_apply' ).text( '응모하기' );
				$( '.tbl_apply tbody' ).append( '<tr><td class="ord">'+ count +'</td><td>'+ winNum +'</td><td>'+ formattedTime +'</td></tr>' );
			}
		});
	});

});
