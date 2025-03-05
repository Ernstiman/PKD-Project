import { draw_default_text_style } from "./draw.js";
export function draw_icon(ctx, x, y, path, size) {
    const img = new Image();
    img.src = path;
    ctx.drawImage(img, x, y, size, size);
}
export function draw_beaver_icon(ctx, x, y) {
    draw_icon(ctx, x, y, "../img/Beaver.png", 50);
}
export function draw_dagger_icon(ctx, x, y) {
    draw_icon(ctx, x, y, "../img/Dagger.png", 70);
}
export function draw_ring_icon(ctx, x, y) {
    draw_icon(ctx, x, y, "../img/Ring.png", 70);
}
export function draw_shop_icon(ctx, x, y) {
    draw_icon(ctx, x, y, "../img/Shop.png", 70);
}
export function draw_trap_icon(ctx, x, y) {
    draw_icon(ctx, x, y, "../img/Trap.png", 70);
}
export function draw_trap1_icon(ctx, x, y) {
    draw_icon(ctx, x, y, "../img/Trap1.png", 70);
}
export function draw_wolf_icon(ctx, x, y) {
    draw_icon(ctx, x, y, "../img/Wolf.png", 70);
}
export function draw_detective_icon(ctx, x, y) {
    draw_icon(ctx, x, y, "../img/Detective.png", 70);
}
export function draw_daughter_icon(ctx, x, y) {
    draw_icon(ctx, x, y, "../img/Daughter.png", 70);
}
export function draw_player_icon(ctx, x, y) {
    draw_icon(ctx, x, y, "../img/Player.png", 70);
}
export function trap_draw_function(ctx, x, y, self) {
    //self.drawcollect
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    if (self.collectables[0].count > 0) {
        draw_beaver_icon(ctx, x, y);
        draw_default_text_style(self.collectables[0].count.toString(), x + 40, y, ctx, 20);
    }
    draw_trap_icon(ctx, x - 35, y - 35);
    //draw_default_text_style("Box Trap", x, y+30, ctx, 20);
}
export function lvl_1_trap_draw_function(ctx, x, y, self) {
    //self.drawcollect
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    if (self.collectables[0].count > 0) {
        draw_beaver_icon(ctx, x, y);
        draw_default_text_style(self.collectables[0].count.toString(), x + 40, y, ctx, 20);
    }
    draw_trap1_icon(ctx, x - 35, y - 35);
    //draw_default_text_style("Beaver Magnet", x, y+30, ctx, 20);
}
export function dagger_draw_function(ctx, x, y, self) {
    //self.drawcollect
    // ctx.fillStyle = "black";      // Set text color
    // ctx.font = "16px Arial";      // Set font size and type
    // ctx.textAlign = "center";     // Center the text horizontally
    // ctx.textBaseline = "middle";  // Center the text vertically
    ctx.lineWidth = 2;
    // ctx.beginPath(); 
    // ctx.fillStyle = "rgb(0, 0, 0)";
    // ctx.arc(x, y, 10, 0, 2 * Math.PI);
    // ctx.arc(x, y, 15, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.stroke(); // Render the line
    // ctx.fillStyle = "black";      // Set text color
    // ctx.font = "16px Georgia";      // Set font size and type
    // ctx.textAlign = "center";     // Center the text horizontally
    // ctx.textBaseline = "middle";  // Center the text vertically
    draw_dagger_icon(ctx, x - 35, y - 35);
    draw_default_text_style("Dagger", x - 30, y + 30, ctx, 20);
}
export function wolf_draw_function(ctx, x, y, self) {
    //self.drawcollect
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    if (self.collectables[0].count > 0) {
        draw_default_text_style(self.collectables[0].count.toString(), x + 40, y, ctx, 20);
    }
    draw_wolf_icon(ctx, x - 35, y - 35);
    //     ctx.lineWidth = 2;
    // ctx.beginPath(); 
    // ctx.fillStyle = "rgb(116, 76, 48)";
    // ctx.arc(x, y, 10, 0, 2 * Math.PI);
    // ctx.arc(x, y, 15, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.stroke(); // Render the line
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Georgia"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    draw_default_text_style("Wolf", x, y + 30, ctx, 20);
}
export function detective_draw_function(ctx, x, y, self) {
    //self.drawcollect
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    if (self.collectables[0].count > 0) {
        ctx.fillText(self.collectables[0].count.toString(), x + 40, y);
    }
    ctx.lineWidth = 2;
    draw_detective_icon(ctx, x - 35, y - 35);
    draw_default_text_style("Detective", x, y + 30, ctx, 20);
    // ctx.beginPath(); 
    // ctx.fillStyle = "rgb(60, 242, 215)";
    // ctx.arc(x, y, 10, 0, 2 * Math.PI);
    // ctx.arc(x, y, 15, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.stroke(); // Render the line
    // ctx.fillStyle = "black";      // Set text color
    // ctx.font = "16px Georgia";      // Set font size and type
    // ctx.textAlign = "center";     // Center the text horizontally
    // ctx.textBaseline = "middle";  // Center the text vertically
    // draw_default_text_style("Detective",x,y+20,ctx, 20)
}
export function shop_draw_function(ctx, x, y, self) {
    // ctx.beginPath()
    // ctx.fillStyle = "rgba(65, 21, 139, 0.73)";
    // ctx.arc(x, y, 20, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.stroke();
    ctx.lineWidth = 2;
    draw_shop_icon(ctx, x - 35, y - 35);
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Georgia"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    draw_default_text_style("Shop", x, y + 20, ctx, 20);
}
export function player_draw_function(ctx, x, y, self) {
    // ctx.beginPath()
    // ctx.fillStyle = "rgba(35, 154, 43, 0.73)";
    // ctx.arc(x, y, 20, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.stroke();
    draw_player_icon(ctx, x - 35, y - 35);
    ctx.lineWidth = 2;
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Georgia"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    draw_default_text_style("You", x, y + 20, ctx, 20);
}
export function ring_draw_function(ctx, x, y) {
    draw_ring_icon(ctx, x - 35, y - 35);
    draw_default_text_style("Ring", x - 25, y + 30, ctx, 20);
    // ctx.beginPath();
    // ctx.fillStyle = "rgba(181, 200, 11, 0.73)";
    // ctx.arc(x, y, 20, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.stroke();
}
export function draw_daughter(ctx, x, y) {
    draw_daughter_icon(ctx, x - 90, y - 35);
    draw_default_text_style("Love Interest", x - 55, y + 30, ctx, 20);
}
