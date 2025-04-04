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

// Generate PDF from receipt preview using a different approach
export async function generatePdf(): Promise<void> {
  try {
    console.log('Starting PDF generation...');
    const receiptElement = document.getElementById('receipt-preview');
    if (!receiptElement) {
      console.error('Receipt element not found');
      return;
    }
    
    // Hide any elements that are placeholders or not needed in the PDF
    const placeholderElements = receiptElement.querySelectorAll('.placeholder');
    placeholderElements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
    
    // Step 1: Create a clean clone of the receipt element to avoid modifying the original
    const clonedElement = receiptElement.cloneNode(true) as HTMLElement;
    
    // Step 2: Apply styles to make sure it's properly captured
    clonedElement.style.width = '210mm'; // A4 width
    clonedElement.style.background = '#fff';
    clonedElement.style.padding = '10mm';
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.top = '-9999px';
    
    // Step 3: Add the cloned element to the document temporarily
    document.body.appendChild(clonedElement);
    
    // Step 4: Create html2canvas instance
    console.log('Creating canvas...');
    const canvas = await html2canvas(clonedElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: false, // Disable logging for production
      backgroundColor: '#ffffff', // White background
      allowTaint: true,
      removeContainer: false,
      imageTimeout: 0, // No timeout for image loading
    });
    
    // Step 5: Remove the cloned element from the document
    document.body.removeChild(clonedElement);
    
    // Step 6: Generate image data from canvas
    console.log('Canvas created, generating image data...');
    const imgData = canvas.toDataURL('image/png');
    
    // Step 7: Create PDF document
    console.log('Creating PDF document...');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Step 8: Calculate dimensions to fit the A4 page properly
    const imgWidth = 190; // Slightly smaller than A4 width (210mm) to add margin
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Step 9: Add image to PDF
    console.log('Adding image to PDF...');
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight); // 10mm margin on each side
    
    // Step 10: Save the PDF file with a specific name
    console.log('Saving PDF file...');
    pdf.save('recibo.pdf');
    console.log('PDF saved successfully');
    
    // Restore any elements that were hidden
    placeholderElements.forEach(el => {
      (el as HTMLElement).style.display = '';
    });
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Log more details about the error for better debugging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Try an alternative approach if the first one fails
    try {
      console.log('Trying alternative PDF generation approach...');
      const receiptElement = document.getElementById('receipt-preview');
      if (!receiptElement) return;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Convert to image and add to PDF with simpler options
      html2canvas(receiptElement, { 
        backgroundColor: '#fff',
        scale: 1.5,
        useCORS: true
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
        pdf.save('recibo.pdf');
        console.log('PDF saved successfully (alternative method)');
      });
    } catch (fallbackError) {
      console.error('Alternative PDF generation also failed:', fallbackError);
    }
  }
}
