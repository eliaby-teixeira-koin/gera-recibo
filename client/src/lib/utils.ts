import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: string): string {
  // Remove all non-digits
  let numericValue = value.replace(/\D/g, '');
  
  if (numericValue === '') {
    return '';
  }
  
  // Convert to a number and divide by 100 to get the decimal value
  const floatValue = parseFloat(numericValue) / 100;
  
  // Format as currency
  return floatValue.toFixed(2).replace('.', ',');
}

export function formatCpfCnpj(value: string): string {
  // Remove all non-digits
  let numericValue = value.replace(/\D/g, '');
  
  if (numericValue.length <= 11) {
    // CPF formatting (000.000.000-00)
    if (numericValue.length > 9) {
      return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (numericValue.length > 6) {
      return numericValue.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (numericValue.length > 3) {
      return numericValue.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    return numericValue;
  } else {
    // CNPJ formatting (00.000.000/0000-00)
    if (numericValue.length > 12) {
      return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
    } else if (numericValue.length > 8) {
      return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');
    } else if (numericValue.length > 5) {
      return numericValue.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (numericValue.length > 2) {
      return numericValue.replace(/(\d{2})(\d{1,3})/, '$1.$2');
    }
    return numericValue;
  }
}
