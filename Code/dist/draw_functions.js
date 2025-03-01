export function trap_draw_function(ctx, x, y, self) {
    //self.drawcollect
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.fillText(self.collectables[0].count.toString(), x + 40, y);
    ctx.beginPath();
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke(); // Render the line
}
export function shop_draw_function(ctx, x, y, self) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(65, 21, 139, 0.73)";
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.fillText("Shop", x, y);
}
export function player_draw_function(ctx, x, y, self) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(20, 216, 2, 0.73)";
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.fillText("You", x, y);
}
