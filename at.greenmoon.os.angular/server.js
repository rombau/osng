var http = require('http');
var httpProxy = require('http-proxy');
var fs = require('fs');

var localUrls = ['mobile/','os_menu_haupt.html','os_menu_haupt_new.html','node_modules'];

var proxy = httpProxy.createProxyServer({
	changeOrigin : true
});

var server = http.createServer(function (req, res) {

	if (req.url === '/' || req.url === '/mobile/') {
		req.url = '/mobile/index.html';
	}

	var localUrl = req.url;

	try {
		var idx = localUrl.indexOf('?');
		if (idx !== -1) {
			localUrl = localUrl.substring(0, idx);
		}
		if (fs.existsSync(localUrl.substr(1))) {
			if (localUrl.indexOf('.html') !== -1) {
				res.writeHead(200, {
					'Content-Type' : 'text/html'
				});
			} else if (localUrl.indexOf('.css') !== -1) {
				res.writeHead(200, {
					'Content-Type' : 'text/css'
				});
			} else if (localUrl.indexOf('.js') !== -1) {
				res.writeHead(200, {
					'Content-Type' : 'application/javascript; charset=utf-8'
				});
			}
			res.end(fs.readFileSync(localUrl.substr(1)));

			console.log('[local] ' + localUrl);

			return;
		}
	} catch (e) {
		res.writeHead(500);
		res.write("Fehler beim Laden von der Datei " + localUrl + "\n\n" + e.message);
		res.end();
	}

	console.log('[remote] ' + req.url);

	try {
		proxy.web(req, res, {
			target : 'http://os.ongapo.com'
		});
	} catch (e) {
		res.writeHead(503);
		res.write("Fehler beim Laden von http://os.ongapo.com" + req.url + "\n\n" + e.message);
		res.end();
	}
});

console.log("listening on port 9000");
server.listen(9000);
