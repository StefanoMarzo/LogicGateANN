function plot(func) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var axes = {
        x0: 0.5 + 0.5 * canvas.width,
        y0: 0.5 + 0.5 * canvas.height,
        scale: 40,
        doNegativeX: true
    };
    showAxes(ctx, axes);
    graph(ctx, axes, func, 'hsl(' + Math.floor(Math.random()*360) + ',100%,50%)', 1);
}

function graph(ctx, axes, func, color, thick) {
    var xx, yy, dx = 4,
        x0 = axes.x0,
        y0 = axes.y0,
        scale = axes.scale;
    var iMax = Math.round((ctx.canvas.width - x0) / dx);
    var iMin = axes.doNegativeX ? Math.round(-x0 / dx) : 0;
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;

    for (var i = iMin; i <= iMax; i++) {
        xx = dx * i;
        yy = scale * func(xx / scale);
        if (i == iMin) ctx.moveTo(x0 + xx, y0 - yy);
        else ctx.lineTo(x0 + xx, y0 - yy);
    }
    ctx.stroke();
}

function showAxes(ctx, axes) {
    var x0 = axes.x0,
        w = ctx.canvas.width;
    var y0 = axes.y0,
        h = ctx.canvas.height;
    var xmin = axes.doNegativeX ? 0 : x0;
    ctx.beginPath();
    ctx.strokeStyle = '#555';
    ctx.moveTo(xmin, y0);
    ctx.lineTo(w, y0);
    ctx.moveTo(x0, 0);
    ctx.lineTo(x0, h);
    ctx.stroke();
}

function plot2d(func) {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    var data = ctx.createImageData(canvas.width, canvas.height);
    var pixels = data.data;
    var x, y;
    for (var i = 0; i < pixels.length; i += 4) {
        x = ((i / 4) % canvas.width) - (canvas.width / 2);
        y = (canvas.height / 2) - Math.floor((i / 4) / canvas.width);
        var draw = func(x, y);
        pixels[i] = draw ? 0 : 255;
        pixels[i + 1] = draw ? 0 : 255;
        pixels[i + 2] = draw ? 0 : 255;
        pixels[i + 3] = 255;
    }
    ctx.putImageData(data, 0, 0);
    return pixels;
}