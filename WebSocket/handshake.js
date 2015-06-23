var http = require('http')
//var net = require('net')
var crypto = require('crypto')

var server = http.createServer()

server.on('upgrade', function(req, socket, upgradeHead){
	var key = req.headers['sec-websocket-key']
	var sha1 = crypto.createHash('sha1')
	key = sha1.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64')
	var headers = ['HTTP/1.1 101 Switching Protocols', 'Upgrade: websocket', 'Connection: Upgrade', 'Sec-WebSocket-Accept: ' + key ];       
	//socket.setNoDelay(true)       
	socket.write(headers.join("\r\n") + "\r\n\r\n", 'ascii')

})

/*
server.on('request', function(req, res){
	var body = 'hello node'
	res.writeHead(101, 'Web Socket Protocol Handshake', {
		'Connection':'Upgrade',
		'Sec-WebSocket-Accept':'D04WBynbA1Zcfoy8QrsfQb4Wuuo=',
		'Upgrade':'websocket',
		'Content-Length':body.length,
		'Content-Type':'text/plain'
	})
	
	//res.write(body)
	res.end()
})
*/
server.listen(8000)
