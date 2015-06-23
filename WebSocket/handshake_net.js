var net = require('net')
var crypto = require('crypto')

var server = net.createServer(function(socket){
	socket.on('data', function(data){
		// 从请求头取Wec-WebSocket-Key
		var match = data.toString().match(/Sec-WebSocket-Key:(.+)/)

		if(!match){
			return
		}

		var key = match[1].trim()
		console.log(key)

		var sha1 = crypto.createHash('sha1')
		key = sha1.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64')
console.log(key)
		socket.write('HTTP/1.1 101 Switching Protocol\r\n')
		socket.write('Upgrade: websocket\r\n')
		socket.write('Connection: Upgrade\r\n')
		socket.write('Sec-WebSocket-Accept:' + key + '\r\n')
		socket.write('\r\n')
	})
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
