import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Format date in Portuguese
export function formatDateInPortuguese(dateString: string, location: string): string {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${location}, ${day} de ${month} de ${year}`;
}

// Convert numeric amount to words in Portuguese
export function formatAmountInWords(amount: string): string {
  const units = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const teens = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const tens = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const hundreds = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
  
  // Normalize input
  const value = parseFloat(amount.replace(',', '.'));
  if (isNaN(value)) return 'zero reais';
  
  // Special case
  if (value === 0) return 'zero reais';
  
  const intPart = Math.floor(value);
  const decPart = Math.round((value - intPart) * 100);
  
  let result = '';
  
  // Handle integer part
  if (intPart > 0) {
    if (intPart === 1) {
      result += 'um real';
    } else {
      // Handle thousands
      if (intPart >= 1000) {
        const thousands = Math.floor(intPart / 1000);
        if (thousands === 1) {
          result += 'mil ';
        } else {
          result += convertNumberToWords(thousands, units, teens, tens, hundreds) + ' mil ';
        }
      }
      
      // Handle remaining part
      const remainder = intPart % 1000;
      if (remainder > 0) {
        result += convertNumberToWords(remainder, units, teens, tens, hundreds);
        result += ' reais';
      } else if (intPart >= 1000) {
        result += 'reais';
      }
    }
  }
  
  // Handle decimal part
  if (decPart > 0) {
    if (intPart > 0) result += ' e ';
    
    if (decPart === 1) {
      result += 'um centavo';
    } else if (decPart < 20) {
      if (decPart < 10) {
        result += units[decPart] + ' centavos';
      } else {
        result += teens[decPart - 10] + ' centavos';
      }
    } else {
      const ten = Math.floor(decPart / 10);
      const unit = decPart % 10;
      
      result += tens[ten];
      if (unit > 0) {
        result += ' e ' + units[unit];
      }
      result += ' centavos';
    }
  }
  
  return result;
}

function convertNumberToWords(num: number, units: string[], teens: string[], tens: string[], hundreds: string[]): string {
  if (num === 0) return '';
  
  let result = '';
  
  // Handle hundreds
  if (num >= 100) {
    const hundred = Math.floor(num / 100);
    num %= 100;
    
    // Special case for 100
    if (hundred === 1 && num === 0) {
      return 'cem';
    }
    
    result += hundreds[hundred];
    
    if (num > 0) {
      result += ' e ';
    }
  }
  
  // Handle tens and units
  if (num > 0) {
    if (num < 10) {
      result += units[num];
    } else if (num < 20) {
      result += teens[num - 10];
    } else {
      const ten = Math.floor(num / 10);
      const unit = num % 10;
      
      result += tens[ten];
      
      if (unit > 0) {
        result += ' e ' + units[unit];
      }
    }
  }
  
  return result;
}

// Generate PDF from receipt preview
export async function generatePdf(): Promise<void> {
  try {
    console.log('Starting PDF generation...');
    const receiptElement = document.getElementById('receipt-preview');
    if (!receiptElement) {
      console.error('Receipt element not found');
      return;
    }
    
    console.log('Creating canvas...');
    // Create instance of jsPDF
    const canvas = await html2canvas(receiptElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: true, // Enable logging for debugging
      backgroundColor: '#ffffff' // White background
    });
    
    console.log('Canvas created, generating image data...');
    const imgData = canvas.toDataURL('image/png');
    
    console.log('Creating PDF document...');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    console.log('Adding image to PDF...');
    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    console.log('Saving PDF file...');
    // Save the PDF file
    pdf.save('recibo.pdf');
    console.log('PDF saved successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  }
}
