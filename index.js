var ware = require('ware');
var debug = require('debug')('otware');
var slice = [].slice;

var otware = function(o){
	
	if (!(this instanceof otware)) return new otware();
	
	this.mw = ware(o);
	this.queue = [];
	this.busy = false;	
};

otware.prototype.run = function(){
	var args = Array.prototype.slice.call(arguments);
	var q = this.queue
	q.push(args);
	this._run();
}

otware.prototype._run = function(){
	var q = this.queue;
	var w = this.mw;
	var self = this;

	var done = function(){
		
		debug('done function');
		
		var a = slice.call(arguments);
		q.shift();
		self.busy = false;
		
		if(cb)
			last.apply(null,a);
		
		if(q.length)
			self._run();
	};
	
	var args = [];
	var last;
	var cb;
	
	if(!this.busy){
		args = q[0];
		last = args[args.length - 1];
		cb = 'function' == typeof last && last;
		var a = cb
		    ? slice.call(args, 0, args.length - 1)
		    : slice.call(args);
		a.push(done);
		this.busy = true;
		
		debug('run ware');
		
		w.run.apply(w,a);
	}
}

otware.prototype.use = function(fn){
	this.mw.use(fn);
	return this;
}

module.exports =  otware;