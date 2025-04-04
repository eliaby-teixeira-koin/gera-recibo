import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReceiptForm from "@/components/ReceiptForm";
import ReceiptPreview from "@/components/ReceiptPreview";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "@/components/ui/logo";

export type ReceiptData = {
  logo?: string;
  name: string;
  document: string;
  date: string;
  description: string;
  amount: string;
  paymentMethod: string;
  location: string;
  signature: string;
};

export default function Home() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("form");
  const [receiptData, setReceiptData] = useState<ReceiptData>({
    name: "",
    document: "",
    date: "",
    description: "",
    amount: "",
    paymentMethod: "",
    location: "",
    signature: "",
  });
  const [showPreview, setShowPreview] = useState(false);
  
  // Verificar se todos os campos obrigatórios estão preenchidos
  const isFormValid = () => {
    return (
      receiptData.name.trim() !== "" &&
      receiptData.document.trim() !== "" &&
      receiptData.date.trim() !== "" &&
      receiptData.description.trim() !== "" &&
      receiptData.amount.trim() !== "" &&
      receiptData.paymentMethod.trim() !== "" &&
      receiptData.location.trim() !== "" &&
      receiptData.signature.trim() !== ""
    );
  };

  const handleReceiptUpdate = (data: Partial<ReceiptData>) => {
    setReceiptData((prev) => ({ ...prev, ...data }));
  };
  
  const handlePreviewClick = () => {
    if (!isFormValid()) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos obrigatórios antes de visualizar o recibo.",
        variant: "destructive",
      });
      return;
    }
    
    setShowPreview(true);
    if (isMobile) {
      setActiveTab("preview");
    }
  };
  
  const handleTabChange = (value: string) => {
    // Se for mobile e tentar mudar para preview, verificar se o formulário está completo
    if (isMobile && value === "preview" && !isFormValid()) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos obrigatórios antes de visualizar o recibo.",
        variant: "destructive",
      });
      return;
    }
    
    setActiveTab(value);
    if (value === "preview" && isFormValid()) {
      setShowPreview(true);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex flex-col items-center justify-center">
            <div className="h-16 mb-3">
              <Logo />
            </div>
            <p className="text-center text-gray-600 mt-1">Crie e exporte recibos profissionais em PDF</p>
          </div>
        </header>

        <div className="block lg:hidden mb-6">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form">Formulário</TabsTrigger>
              <TabsTrigger value="preview">Visualização</TabsTrigger>
            </TabsList>
            <TabsContent value="form">
              <Card className="mt-2">
                <div className="p-4 sm:p-6">
                  <ReceiptForm 
                    receiptData={receiptData}
                    onUpdate={handleReceiptUpdate}
                    onPreview={handlePreviewClick}
                  />
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="preview">
              <Card className="mt-2 relative">
                <div className="p-4 sm:p-6">
                  <ReceiptPreview 
                    data={receiptData}
                    showPlaceholder={!showPreview}
                  />
                  
                  {/* Botão para voltar ao formulário no mobile */}
                  {isMobile && (
                    <div className="mt-6 mb-2">
                      <button 
                        onClick={() => setActiveTab("form")} 
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md w-full"
                      >
                        Voltar para o Formulário
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="hidden lg:flex lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
            <ReceiptForm 
              receiptData={receiptData}
              onUpdate={handleReceiptUpdate}
              onPreview={handlePreviewClick}
            />
          </div>
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6 relative">
            <ReceiptPreview 
              data={receiptData}
              showPlaceholder={!showPreview}
            />
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Gerador de Recibos - Todos os direitos reservados</p>
        </footer>
      </div>
    </div>
  );
}
