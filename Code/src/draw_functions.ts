export function trap_draw_function(ctx: CanvasRenderingContext2D, x: number, y: number) : void{
    ctx.beginPath(); 
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke(); // Render the line
}

export function player_draw_function(ctx: CanvasRenderingContext2D, x: number, y: number) : void{
    ctx.beginPath()
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
}

export function reset_node_function(ctx: CanvasRenderingContext2D, x: number, y: number): void{
    ctx.beginPath();
    ctx.fillStyle = 'white'
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
}