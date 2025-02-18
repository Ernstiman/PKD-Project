"use strict";
function draw() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "rgb(200 0 0)";
      ctx.fillRect(10, 10, 500, 50);

      ctx.beginPath();  // Start a new path
        ctx.moveTo(50, 50);  // Start point (x, y)
        ctx.lineTo(450, 450);  // End point (x, y)
        ctx.stroke();  // Render the line

        // Draw a circle
        ctx.beginPath();  // Start a new path
        ctx.arc(250, 250, 100, 0, 2 * Math.PI);  // x, y, radius, start angle, end angle
        //ctx.stroke();  // Render the circle


    }
  }
  draw();