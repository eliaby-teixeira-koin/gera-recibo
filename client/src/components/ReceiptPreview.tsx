import { Card } from "@/components/ui/card";
import { ReceiptData } from "@/pages/home";
import { formatAmountInWords, formatDateInPortuguese } from "@/lib/receipt-utils";
import { AlertCircle } from "lucide-react";

type ReceiptPreviewProps = {
  data: ReceiptData;
  showPlaceholder: boolean;
};

export default function ReceiptPreview({ data, showPlaceholder }: ReceiptPreviewProps) {
  const receiptNumber = "00001";
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Visualização do Recibo</h2>
      
      <div id="receipt-preview" className="min-h-[400px] border border-gray-300 rounded-md p-8 bg-white relative">
        {/* Logo area */}
        {data.logo && (
          <div className="mb-4 flex justify-center">
            <img src={data.logo} alt="Logo" className="h-16 object-contain" />
          </div>
        )}
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">RECIBO</h1>
          <p className="text-gray-600">Nº <span>{receiptNumber}</span></p>
        </div>
        
        <div className="mb-6">
          <p className="mb-1">
            Recebi de <strong>{data.name || "Nome Completo / Razão Social"}</strong>, 
            inscrito no CPF/CNPJ sob o nº <strong>{data.document || "000.000.000-00"}</strong>, 
            a importância de <strong>R$ {data.amount || "0,00"}</strong> 
            (<span>{data.amount ? formatAmountInWords(data.amount) : "zero reais"}</span>) 
            referente a:
          </p>
          <p className="border-b border-gray-300 py-2 mb-2 italic">
            {data.description || "Descrição do serviço prestado."}
          </p>
        </div>
        
        <div className="mb-6">
          <p>Forma de pagamento: <span>{data.paymentMethod || "Método de Pagamento"}</span></p>
          <p>Local da prestação do serviço: <span>{data.location || "Local do Serviço"}</span></p>
        </div>
        
        <div className="mb-8">
          <p className="text-right">
            {data.date && data.location 
              ? formatDateInPortuguese(data.date, data.location)
              : "Local, 01 de Janeiro de 2023"}
          </p>
        </div>
        
        <div className="flex justify-center mb-4">
          <div className="text-center">
            <div className="min-h-[80px] mb-2 flex justify-center">
              {data.signature && (
                <img src={data.signature} alt="Assinatura" className="h-20" />
              )}
            </div>
            <div className="border-t border-gray-800 pt-2 min-w-[280px]">
              <p>{data.name || "Nome do Emitente"}</p>
              <p>CPF/CNPJ: {data.document || "000.000.000-00"}</p>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center mt-8">
          <p>Este recibo é válido como comprovante de pagamento.</p>
        </div>
      </div>

      {showPlaceholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 rounded-md z-10">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">Preencha o formulário e clique em "Visualizar Recibo" para ver a prévia</p>
          </div>
        </div>
      )}
    </div>
  );
}
