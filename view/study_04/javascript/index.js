// 박유진 고유 ID : pyj

$( document ).ready(function () {

	$.ajax({
		url: '//kwangsin84.cafe24.com/exam/board.php',
		dataType: 'JSON',
		type: 'POST',
		data: {
			action: 'getToken',
			id: 'pyj',
		},
		error: function( status, error ) {
			console.log( status, error );
		},
		success: function( result ) {
			const pyjToken = result.token;

			$.ajax({
				url: '//kwangsin84.cafe24.com/exam/board.php',
				dataType: 'JSON',
				type: 'POST',
				data: {
					action: 'list',
					token: pyjToken,
				},
				error: function( status, error ) {
					console.log( status, error );
				},
				success: function( result ) {
					let listCnt = result.cnt;
					let listOrd = listCnt;

					for ( let i = 0; i < listCnt; i++ ) {
						let dataList = result.data[i];

						$('.tbl_board tbody').append( '<tr><td>'+ (listOrd-- ) +'</td><td>'+ dataList.id +'</td><td>'+ dataList.title +'</td><td>'+ dataList.contents +'</td><td>'+ dataList.regDate +'</td></tr>' );
					}
				}
			});
		}
	});

});
