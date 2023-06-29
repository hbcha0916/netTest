let userData;



document.cookie = "safeCookie1=foo; SameSite=Lax"; 
document.cookie = "safeCookie2=foo"; 
document.cookie = "crossCookie=bar; SameSite=None; Secure";

$('#agree').click(function(){
    $('#info').toggle();
    $('#main').toggle();
    $('#result').toggle();
});
$('#reShow').click(function(){
    $('#info').toggle();
    $('#main').toggle();
    $('#result').toggle();

});

$('#main').hide();
$('#result').hide();
$('#submain').hide();

$('#goLogin').click(function(){
    $('#goLogin').hide();
    $('#statusText').text("크롤링을 시작합니다.");
    $('#statusTextInfo').text("해당 서비스 사용자가 많을 경우 순차적으로 처리하기 때문에, 많은 시간이 필요할 수 있습니다. 오랜 시간 응답이 없을 시 다시 시도하세요.");
    $('#thisCredit').empty();
    $('#submain').hide();
    $.ajax({
        type : 'POST',           
        url : 'http://chb0110.synology.me:7858',           // 요청할 서버url
        async : true,            // 비동기화 여부 (default : true)
        data : JSON.stringify({  // 보낼 데이터 (Object , String, Array)
            "id" : $('#id').val(),
            "pass" : $('#pass').val()
        }),
        success : function(result) { // 결과 성공 콜백함수
            userData = JSON.parse(result);
            $('#statusText').text(userData.department+" "+userData.name);
            $('#statusTextInfo').text(String(userData.score).replace(/,/g, ' | '));
            $('#submain').show();
            for(var i = 0; i < userData.credit.length; i++){
                $('#thisCredit').append('<td>'+userData.credit[i]+'</td>');
            }
            for(var i = 0; i < userData.CD.length; i++){
                $('#thisCD').append('<td>'+userData.CD[i]+'</td>');
            }
            
        },
        error : function(request, status, error) { // 결과 에러 콜백함수
            $('#statusText').text("크롤링 실패!");
            $('#statusTextInfo').text(status+" | "+error);
        }
    })
});




$(document).ready(function () {
    // var d = test(123);
    // console.log(d.public);

    
    // document.cookie = "safeCookie1=foo; SameSite=Lax"; 
    // document.cookie = "safeCookie2=foo"; 
    // document.cookie = "crossCookie=bar; SameSite=None; Secure";
    // var no = 1;
    // var name = "차휘병";
    // var nick = "hbc";
    // $.ajax({
    //     type : 'POST',           // 타입 (get, post, put 등등)
    //     url : 'http://chb0110.synology.me:7858',           // 요청할 서버url
    //     async : true,            // 비동기화 여부 (default : true)
    //     data : JSON.stringify({  // 보낼 데이터 (Object , String, Array)
    //         "no" : no,
    //         "name" : name,
    //         "nick" : nick
    //     }),
    //     success : function(result) { // 결과 성공 콜백함수
    //         console.log(result);
    //     },
    //     error : function(request, status, error) { // 결과 에러 콜백함수
    //         console.log(error)
    //     }
    // })
});