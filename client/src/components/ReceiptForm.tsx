import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ReceiptData } from "@/pages/home";
import SignaturePad from "@/components/SignaturePad";
import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Trash2, Eye, FileDown } from "lucide-react";
import { generatePdf } from "@/lib/receipt-utils";
import { formatCurrency, formatCpfCnpj } from "@/lib/utils";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  document: z.string().min(1, "CPF/CNPJ é obrigatório"),
  date: z.string().min(1, "Data é obrigatória"),
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.string().min(1, "Valor é obrigatório"),
  paymentMethod: z.string().min(1, "Forma de pagamento é obrigatória"),
  location: z.string().min(1, "Local é obrigatório"),
});

type ReceiptFormProps = {
  receiptData: ReceiptData;
  onUpdate: (data: Partial<ReceiptData>) => void;
  onPreview: () => void;
};

export default function ReceiptForm({ receiptData, onUpdate, onPreview }: ReceiptFormProps) {
  const { toast } = useToast();
  const [logo, setLogo] = useState<string | undefined>(receiptData.logo);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: receiptData.name || "",
      document: receiptData.document || "",
      date: receiptData.date || "",
      description: receiptData.description || "",
      amount: receiptData.amount || "",
      paymentMethod: receiptData.paymentMethod || "",
      location: receiptData.location || "",
    }
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Erro ao carregar logo",
        description: "O arquivo deve ter no máximo 5MB",
        variant: "destructive",
      });
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast({
        title: "Formato inválido",
        description: "Por favor, envie uma imagem JPG, PNG ou SVG",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const logoUrl = event.target.result as string;
        setLogo(logoUrl);
        onUpdate({ logo: logoUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogo(undefined);
    onUpdate({ logo: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!receiptData.signature) {
      toast({
        title: "Assinatura necessária",
        description: "Por favor, adicione uma assinatura antes de continuar",
        variant: "destructive",
      });
      return;
    }

    onUpdate(values);
    onPreview();
  };

  const handleExportPdf = () => {
    form.handleSubmit((values) => {
      if (!receiptData.signature) {
        toast({
          title: "Assinatura necessária",
          description: "Por favor, adicione uma assinatura antes de exportar o PDF",
          variant: "destructive",
        });
        return;
      }

      // Update the receipt data with form values
      onUpdate(values);
      
      // Ensure the preview is visible
      onPreview();
      
      // Use a slightly longer delay to ensure the preview is fully rendered
      toast({
        title: "Gerando PDF",
        description: "Aguarde enquanto seu PDF está sendo gerado...",
      });
      
      setTimeout(() => {
        try {
          generatePdf();
          toast({
            title: "PDF gerado com sucesso",
            description: "O download do seu recibo em PDF foi iniciado",
            variant: "default",
          });
        } catch (error) {
          console.error("Erro ao gerar PDF:", error);
          toast({
            title: "Erro ao gerar PDF",
            description: "Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.",
            variant: "destructive",
          });
        }
      }, 500);
    })();
  };

  const handleSignatureChange = (signatureData: string) => {
    onUpdate({ signature: signatureData });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCurrency(e.target.value);
    form.setValue("amount", value);
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCpfCnpj(e.target.value);
    form.setValue("document", value);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Informações do Recibo</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Logo Upload */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Logo (Opcional)</Label>
            <div className="flex items-center justify-center w-full">
              <label 
                htmlFor="logo-upload" 
                className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clique para enviar</span> ou arraste o arquivo</p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 5MB)</p>
                </div>
                <input 
                  id="logo-upload" 
                  ref={fileInputRef}
                  type="file" 
                  className="hidden" 
                  accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                  onChange={handleLogoUpload}
                />
              </label>
            </div>
            {logo && (
              <div className="mt-2">
                <div className="flex items-center">
                  <img src={logo} alt="Logo Preview" className="h-12 object-contain mr-2" />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 h-8" 
                    onClick={removeLogo}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remover
                  </Button>
                </div>
              </div>
            )}
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo / Razão Social *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF / CNPJ *</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    onChange={(e) => handleDocumentChange(e)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data do Recibo *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição do Serviço *</FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor (R$) *</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    onChange={(e) => handleAmountChange(e)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Forma de Pagamento *</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                    <SelectItem value="Cartão de Débito">Cartão de Débito</SelectItem>
                    <SelectItem value="Transferência Bancária">Transferência Bancária</SelectItem>
                    <SelectItem value="PIX">PIX</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Local da Prestação do Serviço *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Assinatura *</Label>
            <SignaturePad 
              value={receiptData.signature} 
              onChange={handleSignatureChange} 
            />
            {form.formState.isSubmitted && !receiptData.signature && (
              <p className="text-red-500 text-xs mt-1">Assinatura é obrigatória</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              <Eye className="mr-2 h-4 w-4" /> Visualizar Recibo
            </Button>
            <Button 
              type="button" 
              className="flex-1 bg-green-600 hover:bg-green-700" 
              onClick={handleExportPdf}
            >
              <FileDown className="mr-2 h-4 w-4" /> Exportar PDF
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
