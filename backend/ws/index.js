'use strict';

const WebSocketServer = require('ws').Server;
const helpers = require('./helpers/helpers');
const LAG_MAX_BEFORE_DISCONNECT = 30000;
const LAG_MAX_BEFORE_PING = 15000;
let initialized = false;

function init(dependencies, lib, config) {
  var Storage = require(config.storage)(dependencies);

  if (initialized) {
    return logger.warn('The cryptpad service is already initialized');
  }

  let wss = new WebSocketServer({port: config.websocketPort});
  initialized = true;
  Storage.create(config, storage => {
    /*  Channel removal timeout defaults to 60000ms (one minute) */
    config.channelRemovalTimeout = typeof(config.channelRemovalTimeout) === 'number'? config.channelRemovalTimeout: 60000;

    let ctx = {
        users: {},
        channels: {},
        timeouts: {},
        store: storage,
        config: config
    };

    setInterval(function () {
        Object.keys(ctx.users).forEach(function (userId) {
            let u = ctx.users[userId];
            if (helpers.now() - u.timeOfLastMessage > LAG_MAX_BEFORE_DISCONNECT) {
                helpers.dropUser(ctx, u);
            } else if (!u.pingOutstanding && helpers.now() - u.timeOfLastMessage > LAG_MAX_BEFORE_PING) {
                helpers.sendMsg(ctx, u, [0, '', 'PING', helpers.now()]);
                u.pingOutstanding = true;
            }
        });
    }, 5000);


    wss.on('connection', function(socket) {

        // 0 = ''
        // 1 = websocketPath (normally)
        // 2 = user ID
        var userId = socket.upgradeReq.url.split('/')[2];

        /*if(url[1] !== (config.websocketPath || 'cryptpad_websocket')) { return; }

        if(socket.upgradeReq.url.search(/(\/?+){1}/))*/

        let conn = socket.upgradeReq.connection;

        let user = {
            addr: conn.remoteAddress + '|' + conn.remotePort,
            socket: socket,
            id: userId,
            timeOfLastMessage: helpers.now(),
            pingOutstanding: false
        };
        ctx.users[user.id] = user;

        helpers.sendMsg(ctx, user, [0, '', 'IDENT', user.id]);

        socket.on('message', function(message) {
            if (ctx.config.logToStdout) { console.log('>'+message); }
            try {
                helpers.handleMessage(ctx, user, message);
            } catch (e) {
                console.log(e.stack);
                helpers.dropUser(ctx, user);
            }
        });

        socket.on('close', function (evt) {
            for (let userId in ctx.users) {
                if (ctx.users[userId].socket === socket) {
                    helpers.dropUser(ctx, ctx.users[userId]);
                }
            }
        });

    });
  });
}

module.exports.init = init;
