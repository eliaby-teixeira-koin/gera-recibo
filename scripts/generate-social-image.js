import fs from 'fs';
import { createCanvas } from 'canvas';

// Criando um canvas com as dimensões recomendadas para compartilhamento social
const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Desenhar fundo gradiente
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#f3f4f6');
gradient.addColorStop(1, '#e5e7eb');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Desenhar barra verde inferior
ctx.fillStyle = '#1a6e3d';
ctx.fillRect(0, 530, width, 100);

// Desenhar ícone (um quadrado arredondado com gradiente)
const iconX = 250;
const iconY = 230;
const iconSize = 150;

const iconGradient = ctx.createLinearGradient(
  iconX, iconY, 
  iconX + iconSize, iconY + iconSize
);
iconGradient.addColorStop(0, '#8cc63f');
iconGradient.addColorStop(0.5, '#1a6e3d');
iconGradient.addColorStop(1, '#009dd9');

// Desenhar quadrado arredondado para o ícone
ctx.fillStyle = iconGradient;
ctx.beginPath();
ctx.moveTo(iconX + 30, iconY);
ctx.lineTo(iconX + iconSize - 30, iconY);
ctx.quadraticCurveTo(iconX + iconSize, iconY, iconX + iconSize, iconY + 30);
ctx.lineTo(iconX + iconSize, iconY + iconSize - 30);
ctx.quadraticCurveTo(iconX + iconSize, iconY + iconSize, iconX + iconSize - 30, iconY + iconSize);
ctx.lineTo(iconX + 30, iconY + iconSize);
ctx.quadraticCurveTo(iconX, iconY + iconSize, iconX, iconY + iconSize - 30);
ctx.lineTo(iconX, iconY + 30);
ctx.quadraticCurveTo(iconX, iconY, iconX + 30, iconY);
ctx.closePath();
ctx.fill();

// Desenhar documento dentro do ícone
ctx.fillStyle = 'white';
ctx.beginPath();
ctx.moveTo(iconX + 30, iconY + 30);
ctx.lineTo(iconX + 99, iconY + 30);
ctx.lineTo(iconX + 120, iconY + 51);
ctx.lineTo(iconX + 120, iconY + 120);
ctx.lineTo(iconX + 30, iconY + 120);
ctx.closePath();
ctx.fill();

// Desenhar a dobra do documento
ctx.fillStyle = '#e6e6e6';
ctx.beginPath();
ctx.moveTo(iconX + 99, iconY + 30);
ctx.lineTo(iconX + 99, iconY + 51);
ctx.lineTo(iconX + 120, iconY + 51);
ctx.closePath();
ctx.fill();

// Desenhar as linhas no documento
ctx.strokeStyle = '#009dd9';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(iconX + 40, iconY + 60);
ctx.lineTo(iconX + 110, iconY + 60);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(iconX + 40, iconY + 75);
ctx.lineTo(iconX + 110, iconY + 75);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(iconX + 40, iconY + 90);
ctx.lineTo(iconX + 110, iconY + 90);
ctx.stroke();

ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(iconX + 40, iconY + 105);
ctx.lineTo(iconX + 85, iconY + 105);
ctx.stroke();

// Desenhar o texto "Gera Recibo"
ctx.font = 'bold 80px Arial, sans-serif';
ctx.fillStyle = '#009dd9';
ctx.fillText('Gera', iconX + 180, iconY + 85);

ctx.fillStyle = '#1f2937';
ctx.fillText('Recibo', iconX + 380, iconY + 85);

// Desenhar o tagline
ctx.font = '32px Arial, sans-serif';
ctx.fillStyle = '#4b5563';
ctx.textAlign = 'center';
ctx.fillText('Gere recibos online de forma fácil e gratuita', width / 2, 400);

// Desenhar o texto na barra inferior
ctx.font = '24px Arial, sans-serif';
ctx.fillStyle = 'white';
ctx.fillText('Crie • Personalize • Exporte como PDF • 100% gratuito', width / 2, 585);

// Exportar para PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./public/images/social-share.png', buffer);

console.log('Imagem de compartilhamento social criada em public/images/social-share.png');