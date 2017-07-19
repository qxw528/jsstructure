/**
 * Created by qiusir on 16-6-24.
 */
//=====================终结者模式==========================
var Player = function (name,teamColor) {
    this.name = name;
    this.teamColor = teamColor;
    this.state = 'alive';
};

Player.prototype.win = function () {
    console.log(this.name + ' won');
};

Player.prototype.lose = function () {
    console.log(this.name + ' lost');
};

Player.prototype.die = function () {
    this.state = 'dead';
    playerDirector.reciveMessage('playerDead',this);
};

Player.prototype.remove = function () {
    playerDirector.reciveMessage('removePlayer',this);
};

Player.prototype.changeTeam = function (color) {
    playerDirector.reciveMessage('changeTeam',this,color);
};

var playerFactory = function (name,teamColor) {
    var newPlayer = new Player(name,teamColor);
    playerDirector.reciveMessage('addPlayer',newPlayer);

    return newPlayer;
};

var playerDirector = (function () {
    var players = {},
        operations = {};

    operations.addPlayer = function (player) {
        var teamColor = player.teamColor;
        players[teamColor] = players[teamColor] || [];
        players[teamColor].push(player);
    };

    operations.removePlayer = function (player) {
        var teamColor = player.teamColor,
            teamPlayers = players[teamColor] || [];
        for( var i=teamPlayers.length - 1;i>=0;i--){
            if(teamPlayers[i] === player){
                teamPlayers.splice(i,1);
            }
        }
    };

    operations.changeTeam = function (player,newTeamColor) {
        operations.removePlayer(player);
        player.teamColor = newTeamColor;
        operations.addPlayer(player);
    };

    operations.playerDead = function (player) {
        var teamColor = player.teamColor,
            teamPlayers = players[teamColor];

        var all_dead = true;

        for( var i=0,player;player = teamPlayers[i++];){
            if( player.state !== 'dead'){
                all_dead = false;
                break;
            }
        }

        if( all_dead === true){

            for( var i=0,player;player = teamPlayers[i++];){
                player.lose();
            }

            for( var color in players){
                if(color !== teamColor){
                    var teamPlayers = players[color];
                    for(var i=0,player;player = teamPlayers[i++];){
                        player.win();
                    }
                }
            }
        }
    };

    var reciveMessage = function () {
        var message = Array.prototype.shift.call(arguments);
        operations[message].apply(this,arguments);
    };

    return {
        reciveMessage:reciveMessage
    }
})();

var player1 = playerFactory('皮蛋','red'),
    player2 = playerFactory('小乖','red'),
    player3 = playerFactory('宝宝','red'),
    player4 = playerFactory('小强','red');

var player5 = playerFactory('黑妞','blue'),
    player6 = playerFactory('聪头','blue'),
    player7 = playerFactory('胖墩','blue'),
    player8 = playerFactory('海盗','blue');

player1.die();
player2.die();
player3.die();
player4.die();

player1.remove();
player2.remove();
player3.die();
player4.die();

player1.changeTeam('blue');
player2.remove();
player3.die();
player4.die();


//===========================================================
var goods = {
    "red|32G":3,
    "red|16G":0,
    "red|32G":1,
    "red|16G":6
};

var mediator = (function () {
    var colorSelect = document.getElementById('colorSelect'),
        memorySelect = document.getElementById('memorySelect'),
        numberInput = document.getElementById('numberInput'),
        colorInfo = document.getElementById('colorInfo'),
        numberInfo = document.getElementById('numberInfo'),
        memoryInfo = document.getElementById('memoryInfo'),
        nextBtn = document.getElementById('nextBtn');

    return {
        changed:function (obj) {
            var color = colorSelect.value,
                memory = memorySelect.value,
                number = numberInput.value,
                stock = goods[color+'|'+memory];

            if(obj === colorSelect){
                colorInfo.innerHTML = color;
            }else if(obj === memorySelect){
                memoryInfo.innerHTML = memory;
            }else if(obj === numberInput){
                numberInfo.innerHTML = number;
            }

            if(!color){
                nextBtn.disabled = true;
                nextBtn.innerHTML = '请选择手机颜色';
                return;
            }

            if(!memory){
                nextBtn.disabled = true;
                nextBtn.innerHTML = '请选择内存大小';
                return;
            }

            if (((number - 0) | 0 ) !== number -0){ //输入购买数量是否为正整数
                nextBtn.disabled = true;
                nextBtn.innerHTML = '请输入正确的购买数量';
                return;
            }

            nextBtn.disabled = false;
            nextBtn.innerHTML = '放入购物车';
        }
    }

})();

colorSelect.onchange = function () {
    mediator.changed(this);
};

memorySelect.onchange = function () {
    mediator.changed(this);
};

memorySelect.onchange = function () {
    mediator.changed(this);
};
