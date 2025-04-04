import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SignaturePadProps = {
  value?: string;
  onChange: (value: string) => void;
};

export default function SignaturePad({ value, onChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set the canvas dimensions to match its display size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Set default style
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';
      
      // If we have a value, draw it
      if (value) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          setHasSignature(true);
        };
        img.src = value;
      }
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [value]);
  
  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setHasSignature(true);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveSignature();
    }
  };
  
  // Touch event handlers for mobile
  // Esta variável será usada para armazenar o elemento pai que receberá a classe no-scroll
  const signaturePadContainerRef = useRef<HTMLDivElement | null>(null);
  
  const preventScrollOnBody = () => {
    // Adiciona classe no elemento pai (ou body se não encontrar)
    if (canvasRef.current) {
      // Encontra o elemento div pai mais próximo
      const container = canvasRef.current.closest('div');
      if (container) {
        container.classList.add('no-scroll');
        signaturePadContainerRef.current = container;
      }
    }
  };
  
  const restoreScrollOnBody = () => {
    // Remove classe do elemento pai
    if (signaturePadContainerRef.current) {
      signaturePadContainerRef.current.classList.remove('no-scroll');
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Previne o comportamento padrão
    preventScrollOnBody(); // Impede rolagem durante a assinatura
    
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setHasSignature(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Previne o comportamento padrão
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Previne o comportamento padrão
    restoreScrollOnBody(); // Restaura rolagem após terminar a assinatura
    
    if (isDrawing) {
      setIsDrawing(false);
      saveSignature();
    }
  };
  
  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const signatureData = canvas.toDataURL('image/png');
    onChange(signatureData);
  };
  
  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onChange('');
  };
  
  return (
    <div className="border border-gray-300 rounded-md p-2">
      {/* Área de assinatura com touchAction: none para prevenir gestos de toque no mobile */}
      <div className="w-full h-32 border border-gray-200 rounded-md bg-white cursor-crosshair">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ touchAction: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        />
      </div>
      <div className="flex justify-end mt-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={clearSignature}
          disabled={!hasSignature}
          className="text-sm text-gray-600 hover:text-gray-800 h-8"
        >
          <Eraser className="h-4 w-4 mr-1" /> Limpar
        </Button>
      </div>
    </div>
  );
}
