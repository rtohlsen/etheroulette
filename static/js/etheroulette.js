var web3;
var LastBet = 0;
$(document).ready(function () {

    setTimeout(function () {
        $(".se-pre-con").hide();
    }, 2000);

    try {
		cors="*";
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
        $('#btnSend').show();
        $('#spanSend').hide();
    }
    catch (e) {
        $('#spanSend').show();
    }

    var TotalActions = 0;
    var AddressFilter = undefined;

    

    $("#btnSend").click(function (e) {
		cors="*";
        var from = $('#txtCoinbase').val();
        var to = $('#txtContract').val();
        var value = $('#txtAmount').val();
        value = web3.toWei(value, 'ether');
        web3.eth.sendTransaction({ from: from, to: to, value: value, gas: 180000 }, function (err, address) {

        });
        $('#myPlay').modal("hide");
    });

    $("#txtAmount").keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });


    $(document).on("click", "a[href='#qr']", function (e) {
        e.preventDefault();
        var address = $(this).data("address");
        try {
            $('#txtCoinbase').val(web3.eth.coinbase);
        }
        catch (e) {

        }
        $('#txtContract').val(address);
        $('#txtAmount').attr("placeholder", "Min: " + $(this).data("min"));
        $('#imgQr').attr("src", "https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=" + address);
        $('#spanQr').text(address);
        $('.nav-tabs a[href="#PlayQRCode"]').tab("show");
        $('#myPlay').modal("show");
    });

    $(document).on("click", "a[href='#web3']", function (e) {
        e.preventDefault();
        var address = $(this).data("address");
        try {
            $('#txtCoinbase').val(web3.eth.coinbase);
        }
        catch (e) {

        }
        $('#txtContract').val(address);
        $('#txtAmount').attr("placeholder", "Min: " + $(this).data("min"));
        $('#imgQr').attr("src", "https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=" + address);
        $('#spanQr').text(address);
        //$('.nav-tabs a[href="#PlayMask"]').tab("show");
        //$('#myPlay').modal("show");
    });

    formatNumber = function (x) {
        if (typeof (x) == "string") {
            x = parseInt(x);
        }

        return x.toLocaleString("US");
    }


    showAlert = function (x) {
        if (x.profit >= 0) {
            toastr.info('<span class="win_toastr"><p class="count">' + x.roll + '</p><p class="text_info">' + x.target / 100 + '%<br>< ' + x.target + '<br>' + x.profit + 'ETH</p></span>');
        }
        else {
            toastr.warning('<span class="lose_toastr"><p class="count">' + x.roll + '</p><p class="text_info">' + x.target / 100 + '%<br>< ' + x.target + '<br>' + x.profit + 'ETH</p></span>');
        }
    };


    $(".se-pre-con").fadeOut("slow");
});