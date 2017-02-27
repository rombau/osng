var http = require('http');
var httpProxy = require('http-proxy');
var fs = require('fs');

var basedir = process.argv.length > 2 ? process.argv[2] : 'mobile';
var uselocalcopy = process.argv.length > 3;

if (process.argv.length > 2) {
	console.log('OS mobile frontend startet with:');
	console.log(' basedir = ' + basedir);
	console.log(' uselocalcopy = ' + uselocalcopy);
	console.log('');
}

var proxy = httpProxy.createProxyServer({
	changeOrigin : true
});

var server = http.createServer(function (req, res) {

	if (req.url === '/' || req.url === ('/' + basedir) || req.url === ('/' + basedir + '/')) {
		req.url = '/' + basedir + '/index.html';
	}

	var localUrl = req.url;

	var responseFromLocalhost = function (file) {

		file = file.replace('?', '_');

		if (uselocalcopy) {
			var localdir = 'local/';
			if (!file.substr(0, 6).startsWith(localdir) && responseFromLocalhost(localdir + file)) {
				return true;
			}
		}

		if (fs.existsSync(file)) {
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
			res.end(fs.readFileSync(file));

			console.log('[local] ' + file);
			return true;
		}
		return false;
	};

	try {
		// with query params
		if (responseFromLocalhost(localUrl.substr(1))) {
			return;
		}
		var idx = localUrl.indexOf('?');
		if (idx !== -1) {
			localUrl = localUrl.substring(0, idx);
		}
		// without query params
		if (responseFromLocalhost(localUrl.substr(1))) {
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

console.log("you can now access online soccer via http://localhost:9000/" + basedir);
server.listen(9000);
