import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReceiptForm from "@/components/ReceiptForm";
import ReceiptPreview from "@/components/ReceiptPreview";
import { useState } from "react";

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

  const handleReceiptUpdate = (data: Partial<ReceiptData>) => {
    setReceiptData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Gerador de Recibos</h1>
          <p className="text-center text-gray-600 mt-2">Crie e exporte recibos profissionais em PDF</p>
        </header>

        <div className="block lg:hidden mb-6">
          <Tabs defaultValue="form">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form">Formulário</TabsTrigger>
              <TabsTrigger value="preview">Visualização</TabsTrigger>
            </TabsList>
            <TabsContent value="form">
              <Card className="mt-2">
                <ReceiptForm 
                  receiptData={receiptData}
                  onUpdate={handleReceiptUpdate}
                  onPreview={() => setShowPreview(true)}
                />
              </Card>
            </TabsContent>
            <TabsContent value="preview">
              <Card className="mt-2">
                <ReceiptPreview 
                  data={receiptData}
                  showPlaceholder={!showPreview}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="hidden lg:flex lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
            <ReceiptForm 
              receiptData={receiptData}
              onUpdate={handleReceiptUpdate}
              onPreview={() => setShowPreview(true)}
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
